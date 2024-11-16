<?php

use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

require __DIR__ . '/vendor/autoload.php';

class Chat implements MessageComponentInterface
{
    protected $clients;
    protected $rooms = [];  // Almacena las salas: ['roomCode' => ['host' => conn, 'clients' => [], 'history' => []]]
    
    public function __construct()
    {
        $this->clients = new \SplObjectStorage();
    }

    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $data = json_decode($msg, true);

        switch ($data['type']) {
            case 'createRoom':
                $this->handleCreateRoom($from, $data);
                break;
            case 'joinRoom':
                $this->handleJoinRoom($from, $data);
                break;
            case 'setUserName':
                $this->handleSetUserName($from, $data);
                break;
            case 'chat':
                $this->handleChat($from, $data);
                break;
            case 'endChat':
                $this->handleEndChat($from);
                break;
        }
    }

    private function handleCreateRoom($conn, $data)
    {
        $roomCode = $this->generateRoomCode();
        $this->rooms[$roomCode] = [
            'host' => $conn,
            'clients' => new \SplObjectStorage(),
            'history' => []
        ];
        
        $this->rooms[$roomCode]['clients']->attach($conn);
        $conn->roomCode = $roomCode;
        
        // Notificar al creador que es el host y enviarle el código de la sala
        $conn->send(json_encode([
            'type' => 'roomCreated',
            'roomCode' => $roomCode,
            'isHost' => true
        ]));
    }

    private function handleJoinRoom($conn, $data)
    {
        $roomCode = $data['roomCode'];
        
        if (!isset($this->rooms[$roomCode])) {
            $conn->send(json_encode([
                'type' => 'error',
                'message' => 'La sala no existe'
            ]));
            return;
        }
        $this->rooms[$roomCode]['clients']->attach($conn);
        $conn->roomCode = $roomCode;

        // Enviar historial de la sala al nuevo usuario
        $conn->send(json_encode([
            'type' => 'history',
            'history' => $this->rooms[$roomCode]['history']
        ]));

        // Notificar que se unió exitosamente
        $conn->send(json_encode([
            'type' => 'roomJoined',
            'roomCode' => $roomCode,
            'isHost' => false
        ]));
    }

    private function handleSetUserName($conn, $data)
    {
        if (!isset($conn->roomCode)) {
            return;
        }
    
        $roomCode = $conn->roomCode;
        $conn->userName = $data['userName'];
        
        $isAdmin = $this->rooms[$roomCode]['host'] === $conn;
        $messageText = $isAdmin 
            ? "{$conn->userName} (Administrador) se ha unido al chat" 
            : "{$conn->userName} se ha unido al chat";
        
        $newConnection = [
            'type' => 'newConnection',
            'user' => $conn->userName,
            'isAdmin' => $isAdmin,
            'message' => $messageText,
            'state' => 'Conectado'
        ];
        
        $this->broadcastToRoom($roomCode, $newConnection);
        // Guarda en el historial de la sala
        $this->rooms[$roomCode]['history'][] = $newConnection;
    }    

    private function handleChat($from, $data)
    {
        if (!isset($from->roomCode)) {
            return;
        }

        $message = [
            'type' => 'chat',
            'message' => $data['message'],
            'from' => isset($from->userName) ? $from->userName : 'Usuario'
        ];

        $this->broadcastToRoom($from->roomCode, $message, $from);
    }

    private function handleEndChat($from)
    {
        if (!isset($from->roomCode) || $from !== $this->rooms[$from->roomCode]['host']) {
            return;
        }

        $this->broadcastToRoom($from->roomCode, ['type' => 'chatEnded']);
        
        // Cerrar conexiones de todos los clientes en la sala
        foreach ($this->rooms[$from->roomCode]['clients'] as $client) {
            $client->close();
        }
        
        // Eliminar la sala
        unset($this->rooms[$from->roomCode]);
    }

    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        
        if (isset($conn->roomCode) && isset($this->rooms[$conn->roomCode])) {
            $room = $this->rooms[$conn->roomCode];
            $room['clients']->detach($conn);
            
            // Si era el host, cerrar la sala
            if ($conn === $room['host']) {
                $this->broadcastToRoom($conn->roomCode, ['type' => 'chatEnded']);
                unset($this->rooms[$conn->roomCode]);
            } else {
                // Notificar a los demás usuarios de la sala
                $userName = isset($conn->userName) ? $conn->userName : 'Un usuario';
                $this->broadcastToRoom($conn->roomCode, [
                    'type' => 'disconnection',
                    'user' => $userName,
                    'message' => "$userName ha abandonado el chat"
                ]);
            }
        }
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    private function broadcastToRoom($roomCode, $data, $except = null)
    {
        if (!isset($this->rooms[$roomCode])) {
            return;
        }

        foreach ($this->rooms[$roomCode]['clients'] as $client) {
            if ($except !== $client) {
                $client->send(json_encode($data));
            }
        }
    }

    private function generateRoomCode()
    {
        do {
            $code = strtoupper(substr(md5(uniqid()), 0, 6));
        } while (isset($this->rooms[$code]));
        
        return $code;
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Chat()
        )
    ),
    8080
);

$server->run();