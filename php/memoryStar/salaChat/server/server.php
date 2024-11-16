<?php
session_start();


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
            case 'setUserName':
                $from->userName = $data['usuario'];
                $from->userId = $data['id_usuario'];
                echo "Usuario conectado: {$from->userName} (ID: {$from->userId})\n";
                $this->handleSetUserName($from, $data);
                break;
            case 'createRoom':
                $from->userName = $data['usuario'];
                $from->userId = $data['id_usuario'];
                echo "Usuario conectado: {$from->userName} (ID: {$from->userId})\n";
                $this->handleCreateRoom($from, $data);
                break;


            case 'joinRoom':
                $this->handleJoinRoom($from, $data);
                break;

            case 'chat':
                $this->handleChat($from, $data);
                break;
            case 'endChat':
                $this->handleEndChat($from);
                break;
            case 'startGame':
                $this->handleStartGame($from, $data);
                break;
            case 'updateScore':
                $this->handleUpdateScore($from, $data);
                break;
        }
    }

    private function handleSetUserName($conn, $data)
    {
        $userName = isset($conn->userName) ? $conn->userName : $data['userName'];
        $userId = isset($conn->userId) ? $conn->userId : 'ID Desconocido';

        echo "Nombre de usuario: $userName, ID de usuario: $userId\n";

        if (!isset($conn->roomCode)) {
            return;
        }

        $roomCode = $conn->roomCode;

        // Si no se ha inicializado el contador de usuarios para la sala, se establece en 0
        if (!isset($this->rooms[$roomCode]['userCount'])) {
            $this->rooms[$roomCode]['userCount'] = 0;
        }

        // Incrementa el contador de usuarios al agregar un nuevo usuario
        $this->rooms[$roomCode]['userCount']++;

        $isAdmin = $this->rooms[$roomCode]['host'] === $conn;
        $messageText = $isAdmin
            ? "{$userName} (Administrador) se ha unido al chat"
            : "{$userName} se ha unido al chat";

        $newConnection = [
            'type' => 'newConnection',
            'user' => $userName,
            'isAdmin' => $isAdmin,
            'message' => $messageText,
            'state' => 'Conectado',
            'score' => 0,
            'userCount' => $this->rooms[$roomCode]['userCount']  // Incluye el número de usuarios conectados
        ];

        $conn->send(json_encode([
            'type' => 'userData',
            'userName' => $userName,
            // 'userId' => $userId,
            'score' => 0,
        ]));
        // Emite el mensaje con el número de usuarios actualizados
        $this->broadcastToRoom($roomCode, $newConnection);

        // Guarda en el historial de la sala
        $this->rooms[$roomCode]['history'][] = $newConnection;

        echo "Usuarios conectados en la sala '{$roomCode}': " . $this->rooms[$roomCode]['userCount'] . "\n";
    }

    private function handleCreateRoom($conn, $data)
    {
        $userName = isset($data['usuario']) ? $data['usuario'] : 'Invitado';
        $userId = isset($data['id_usuario']) ? $data['id_usuario'] : 'ID Desconocido';
        $roomName = isset($data['roomName']) ? $data['roomName'] : 'Sala sin nombre';
        $roomCapacity = isset($data['roomCapacity']) ? (int) $data['roomCapacity'] : 10; // Capacidad predeterminada si no se proporciona

        echo "Nombre de usuario: $userName, ID de usuario: $userId\n";
        echo "Nombre de la sala: $roomName, Capacidad de la sala: $roomCapacity\n";

        $roomCode = $this->generateRoomCode();
        $this->rooms[$roomCode] = [
            'host' => $conn,
            'clients' => new \SplObjectStorage(),
            'history' => [],
            'name' => $roomName,            // Almacena el nombre de la sala
            'capacity' => $roomCapacity,     // Almacena la capacidad de la sala
            'scores' => [],
        ];

        $this->rooms[$roomCode]['clients']->attach($conn);
        $conn->roomCode = $roomCode;

        // Notificar al creador de la sala que es el host y enviarle el código de la sala, nombre y capacidad
        $conn->send(json_encode([
            'type' => 'roomCreated',
            'roomCode' => $roomCode,
            'isHost' => true,
            'user' => $userName,
            'roomName' => $roomName,
            'roomCapacity' => $roomCapacity
        ]));
        echo $roomName;
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


    private function handleStartGame($from, $data)
    {
        // Verificar que 'roomCode' esté presente en los datos
        if (!isset($data['roomCode'])) {
            echo "Error: 'roomCode' no encontrado\n";
            return; // Salir si no hay roomCode
        }
    
        $roomCode = $data['roomCode'];
    
        // Verificar si la sala existe
        if (!isset($this->rooms[$roomCode])) {
            return;
        }
    
        $roomData = $this->rooms[$roomCode];
    
        // Preparar la información que se va a enviar
        $gameData = [
            'type' => 'gameData',
            'roomName' => $roomData['name'],  // Nombre de la sala
            'roomCapacity' => $roomData['capacity'],  // Capacidad de la sala
            'scores' => [],  // Aquí puedes agregar los puntajes de los usuarios
            'users' => []  // Aquí puedes agregar la lista de usuarios
        ];
    
        // Recorrer los usuarios y obtener la información necesaria (ejemplo: nombre de usuario y puntaje)
        foreach ($roomData['clients'] as $userConn) {
            // Suponiendo que cada conexión tiene un campo 'user' que es el nombre de usuario
            $userName = isset($userConn->user) ? $userConn->user : 'Desconocido';
            $userScore = isset($this->rooms[$roomCode]['scores'][$userName]) ? $this->rooms[$roomCode]['scores'][$userName] : 0;
    
            // Añadir la información del usuario al arreglo
            $gameData['users'][] = [
                'user' => $userName,
                'score' => $userScore
            ];
    
            // Añadir los puntajes de cada usuario al arreglo de puntajes
            $gameData['scores'][] = [
                'user' => $userName,
                'score' => $userScore
            ];
        }
    
        // Enviar la información a todos los usuarios de la sala
        $this->broadcastToRoom($roomCode, $gameData);
    
        // Enviar el mensaje de inicio del juego a todos los usuarios
        $this->broadcastToRoom($roomCode, ['type' => 'gameStarted']);
    }
    





 private function handleUpdateScore($from, $data)
    {
        $roomCode = $from->roomCode;
        $userName = isset($from->userName) ? $from->userName : 'Usuario';

        if (!isset($this->rooms[$roomCode]) || !isset($this->rooms[$roomCode]['scores'][$userName])) {
            return;
        }

        // Actualizar la puntuación del usuario con la variable recibida desde el juego
        $newScore = isset($data['score']) ? (int)$data['score'] : 0;
        $this->rooms[$roomCode]['scores'][$userName] = $newScore;

        // Enviar la lista de puntuaciones actualizada a todos los jugadores de la sala
        $this->broadcastToRoom($roomCode, [
            'type' => 'scoreUpdate',
            'scores' => $this->rooms[$roomCode]['scores']
        ]);
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