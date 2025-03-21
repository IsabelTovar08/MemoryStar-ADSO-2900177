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
    protected $salas = [];  // Almacena las salas: ['codigoSala' => ['anfitrion' => conn, 'clients' => [], 'historial' => []]]
    private $ultimoOrdenCorrecto;
    public function __construct()
    {
        $this->clients = new \SplObjectStorage();
        $this->ultimoOrdenCorrecto = null;
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
            case 'manejoUnion':
                $from->userName = $data['usuario'];
                $this->manejoUnionUsuarios($from, $data);
                break;
            case 'crearSala':
                $this->crearSala($from, $data);
                break;
            case 'unirseSala':
                $this->unirseSala($from, $data);
                break;
            case 'chat':
                $this->manejoChat($from, $data);
                break;
            case 'finalizar':
                $this->finalizarJuego($from);
                break;
            case 'iniciarjuego':
                $this->iniciarJuego($from, $data);
                break;
            case 'ordenCorrecto':
                $dataToSend = [
                    'type' => 'ordenCorrectoR',
                    'codigoSala' => $data['codigoSala'],
                    'orden' => $data['orden']
                ];
                $this->ultimoOrdenCorrecto = $data['orden'];
                echo "Orden correcto almacenado: " . json_encode($this->ultimoOrdenCorrecto) . "\n";
                $this->broadcastToRoom($data['codigoSala'], $dataToSend, $from);
                break;
            case 'obtenerOrdenCorrecto':
                if ($this->ultimoOrdenCorrecto !== null) {
                    $from->send(json_encode([
                        'type' => 'ordenCorrectoR',
                        'orden' => $this->ultimoOrdenCorrecto
                    ]));
                } else {
                    $from->send(json_encode([
                        'type' => 'error',
                        'message' => 'No hay un orden correcto disponible aún.'
                    ]));
                }
                echo "Orden correcto recibido: " . json_encode($this->ultimoOrdenCorrecto) . "\n";
                $this->ultimoOrdenCorrecto = null;
            case 'actualizarJugadoresEnviar':
                $codigoSala = $data['codigoSala']; // Asegúrate de enviar este dato desde el cliente si es necesario.

                if (isset($this->salas[$codigoSala])) {
                    // Preparar el mensaje para los jugadores
                    $dataToSend = [
                        'type' => 'actualizarJugadoresRecibir',
                        'codigoSala' => $codigoSala,
                        'players' => $data['players']
                    ];

                    // Enviar a todos los clientes de la sala
                    $this->broadcastToRoom($codigoSala, $dataToSend, $from);
                }
                break;

            case 'puntajeRonda':
                $this->actualizarEstadisticas($from, $data);
                break;
            case 'puntajeFinal':
                $this->actualizarEstadisticaFinal($from, $data);
                break;
            case 'ordenEnviado':
                $codigoSala = $data['codigoSala'];
                $usuario = $data['usuario'];

                if (isset($this->salas[$codigoSala])) {
                    // Marcar al usuario como "ronda terminada"
                    $this->salas[$codigoSala]['finalizados'][] = $usuario;

                    // Verificar si todos los jugadores han terminado
                    $totalJugadores = count($this->salas[$codigoSala]['clients']);
                    $jugadoresFinalizados = count($this->salas[$codigoSala]['finalizados']);

                    if ($jugadoresFinalizados === $totalJugadores) {
                        // Notificar al administrador que todos han terminado
                        $dataToSend = [
                            'type' => 'todosFinalizados',
                            'codigoSala' => $codigoSala
                        ];
                        $this->broadcastToRoom($codigoSala, $dataToSend, null);

                        // Reiniciar el estado de "finalizados"
                        $this->salas[$codigoSala]['finalizados'] = [];
                    }
                }
                break;
            case 'reconectarSala':
                $this->reconectarSala($from, $data);
                break;
            case 'cerrarModal':
                $codigoSala = $data['codigoSala'] ?? 'default';

                if (isset($this->salas[$codigoSala])) {
                    foreach ($this->salas[$codigoSala] as $client) {
                        $dataToSend = [
                            'type' => 'cerrarModal',
                        ];

                        // Enviar a todos los clientes de la sala
                        $this->broadcastToRoom($codigoSala, $dataToSend);
                    }
                    echo "Modal cerrado en la sala {$codigoSala}\n";
                }
                break;
        }
    }

    public function onClose(ConnectionInterface $conn)
    {
        // Verificar si la conexión tiene asociada una sala
        if (!isset($conn->codigoSala) || !isset($this->salas[$conn->codigoSala])) {
            echo "Conexión cerrada, pero no pertenece a ninguna sala.\n";
            return;
        }

        $codigoSala = $conn->codigoSala;
        $sala = &$this->salas[$codigoSala];
        $userId = $conn->idUsuario ?? null;
        $userName = $conn->userName ?? 'Un usuario';

        // Remover el cliente de la lista de clientes
        if (isset($sala['clients']) && $sala['clients'] instanceof \SplObjectStorage) {
            $sala['clients']->detach($conn);
        }
        if (isset($conn->userName) && isset($conn->idUsuario)) {
            $this->salas[$codigoSala]['usuarios'] = array_filter(
                $sala['usuarios'],
                function ($usuario) use ($conn) {
                    return $usuario['usuario'] !== $conn->userName || $usuario['id_usuario'] !== $conn->idUsuario;
                }
            );

            // Reindexar la lista de usuarios
            $this->salas[$codigoSala]['usuarios'] = array_values($this->salas[$codigoSala]['usuarios']);
        }
        // Remover el usuario del historial
        if ($userId !== null && isset($sala['historial'])) {
            $sala['historial'] = array_filter(
                $sala['historial'],
                fn($player) => $player['idUsuario'] !== $userId
            );

            // Reindexar el historial después de la eliminación
            $sala['historial'] = array_values($sala['historial']);
        }
        $this->salas[$codigoSala]['historial'] = array_filter(
            $sala['historial'],
            function ($entry) use ($conn) {
                return !isset($entry['usuario']) || $entry['usuario'] !== $conn->userName;
            }
        );
        // Disminuir el contador de usuarios si existe
        if (isset($sala['contadorUsuarios'])) {
            $sala['contadorUsuarios']--;
        }

        // Notificar a los demás jugadores
        $this->broadcastToRoom($codigoSala, [
            'type' => 'disconnection',
            'user' => $userName,
            'message' => "{$userName} ha abandonado la sala.",
            'contadorUsuarios' => $sala['contadorUsuarios'] ?? 0
        ]);

        // Guardar el historial actualizado en un archivo
        file_put_contents(
            'historial_sala_' . $codigoSala . '.json',
            json_encode($sala['historial'], JSON_PRETTY_PRINT)
        );

        // Si la sala queda vacía, eliminarla
        if ($sala['contadorUsuarios'] <= 0) {
            unset($this->salas[$codigoSala]);
            echo "La sala {$codigoSala} ha sido eliminada por falta de usuarios.\n";
        }

        echo "Conexión cerrada para {$userName} en la sala {$codigoSala}.\n";
    }




    public function onError(ConnectionInterface $conn, \Exception $e): void
    {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }

    private function manejoUnionUsuarios($conn, $data)
    {
        $userName = isset($data['usuario']) ? $data['usuario'] : 'Invitado';
        $userId = isset($data['id_usuario']) ? $data['id_usuario'] : 'ID Desconocido';

        if (!isset($conn->codigoSala)) {
            return;
        }
        $codigoSala = $conn->codigoSala;

        if (!isset($this->salas[$codigoSala]['contadorUsuarios'])) {
            $this->salas[$codigoSala]['contadorUsuarios'] = 0;
        }


        $usuario = [
            'usuario' => $userName,
            'id_usuario' => $userId,
            'score' => 0,
            'time' => 0,
            'isAdmin' => ($this->salas[$codigoSala]['anfitrion'] === $conn)
        ];

        $this->salas[$codigoSala]['contadorUsuarios']++;
        $this->salas[$codigoSala]['usuarios'][] = $usuario; // Agregar al usuario a la lista de usuarios

        $messageText = $usuario['isAdmin']
            ? "{$userName} (Administrador) se ha unido al chat"
            : "{$userName} se ha unido al chat";

        $newConnection = [
            'type' => 'newConnection',
            'usuario' => $userName,
            'isAdmin' => $usuario['isAdmin'],
            'message' => $messageText,
            'estado' => 'Conectado',
            'contadorUsuarios' => $this->salas[$codigoSala]['contadorUsuarios'],
            'idUsuario' => $userId
        ];

        $this->broadcastToRoom($codigoSala, $newConnection);
        $this->salas[$codigoSala]['historial'][] = $newConnection;
        // Guardar el historial en un archivo JSON
        // file_put_contents('historial_sala' . $codigoSala . '.json', json_encode($this->salas[$codigoSala]['historial']));
    }


    private function crearSala($conn, $data)
    {
        $userName = isset($data['usuario']) ? $data['usuario'] : 'Invitado';
        $userId = isset($data['id_usuario']) ? $data['id_usuario'] : 'ID Desconocido';
        $nombreSala = isset($data['nombreSala']) ? $data['nombreSala'] : 'Sala sin nombre';
        $tematica = isset($data['tematica']) ? $data['tematica'] : 'Predeterminada';
        $dificultad = isset($data['dificultad']) ? $data['dificultad'] : 'Predeterminado';


        echo "Nombre de usuario: $userName, ID de usuario: $userId\n";
        echo "Nombre de la sala: $nombreSala, \n";


        $codigoSala = $this->generarCodigoSala();
        $this->salas[$codigoSala] = [
            'anfitrion' => $conn,
            'clients' => new \SplObjectStorage(),
            'historial' => [],
            'nombre' => $nombreSala,
            'tematica' => $tematica,
            'dificultad' => $dificultad
        ];

        $this->salas[$codigoSala]['clients']->attach($conn);
        $conn->codigoSala = $codigoSala;

        // Notificar al creador de la sala que es el anfitrion y enviarle el código de la sala, nombre y capacidad
        $conn->send(json_encode([
            'type' => 'salaCreada',
            'codigoSala' => $codigoSala,
            'esAnfitrion' => true,
            'usuario' => $userName,
            'nombreSala' => $nombreSala,
            'tematica' => $tematica,
            'dificultad' => $dificultad,
            'id_usuario' => $userId

        ]));
        echo $nombreSala;
        $ruta = $data['rutaJuego'];
        $enviarRuta = [
            'type' => 'recibirRuta',
            'rutaJuego' => $ruta
        ];
        $this->broadcastToRoom($codigoSala, $enviarRuta, $conn);
    }




    public function unirseSala($conn, $data)
    {
        $codigoSala = $data['codigoSala'];
        $userId = $data['id_usuario'] ?? 'ID Desconocido';

        if (!isset($this->salas[$codigoSala])) {
            $conn->send(json_encode([
                'type' => 'error',
                'message' => 'La sala no existe'
            ]));
            return;
        }

        // Verificar si el usuario ya está en la sala
        foreach ($this->salas[$codigoSala]['usuarios'] as $usuario) {
            if (isset($usuario['id_usuario']) && $usuario['id_usuario'] === $userId) {
                $conn->send(json_encode([
                    'type' => 'error',
                    'message' => 'El usuario ya se encuentra en la sala.'
                ]));
                return;
            }
        }

        // Adjuntar la conexión al cliente
        $this->salas[$codigoSala]['clients']->attach($conn);
        $conn->codigoSala = $codigoSala;

        // Enviar historial de la sala al usuario
        $conn->send(json_encode([
            'type' => 'historial',
            'historial' => $this->salas[$codigoSala]['historial']
        ]));

        // Agregar el usuario a la lista de usuarios
        $this->salas[$codigoSala]['usuarios'][] = [
            'usuario' => $data['userName'] ?? 'Usuario desconocido',
            'id_usuario' => $userId
        ];

        // Notificar que se unió exitosamente
        $conn->send(json_encode([
            'type' => 'unionExitosa',
            'codigoSala' => $codigoSala,
            'esAnfitrion' => false,
            'nombreSala' => $this->salas[$codigoSala]['nombre'],
            'tematica' => $this->salas[$codigoSala]['tematica'],
            'dificultad' => $this->salas[$codigoSala]['dificultad']
        ]));
    }

    private function iniciarJuego($from, $data)
    {
        if (!isset($from->codigoSala)) {
            $from->send(json_encode([
                'type' => 'error',
                'message' => 'No estás en ninguna sala para iniciar el juego'
            ]));
            return;
        }

        $codigoSala = $from->codigoSala;

        if (!isset($this->salas[$codigoSala])) {
            $from->send(json_encode([
                'type' => 'error',
                'message' => 'La sala no existe'
            ]));
            return;
        }

        if ($this->salas[$codigoSala]['anfitrion'] !== $from) {
            $from->send(json_encode([
                'type' => 'error',
                'message' => 'Solo el anfitrión puede iniciar el juego'
            ]));
            return;
        }
        var_dump($this->salas[$codigoSala]['historial']);

        // Recolecta los jugadores del historial
        $players = [];
        foreach ($this->salas[$codigoSala]['historial'] as $usuario) {
            if (isset($usuario['usuario']) && isset($usuario['idUsuario'])) {
                $players[] = [
                    'usuario' => $usuario['usuario'],
                    'idUsuario' => $usuario['idUsuario'],
                    'score' => 0,
                    'time' => 0,
                    'isAdmin' => $usuario['isAdmin'],

                ];
            }
        }
        // var_dump($usuario['isAdmin']);
        $sala = $this->salas[$codigoSala]['historial'];

        $mensajeIniciarJuego = [
            'type' => 'startGame',
            'ruta' => $data['rutaJuego'],
            'players' => $players,
            // 'idUsuario' => $data['idUsuario'],

            'gameData' => [
                'codigoSala' => $codigoSala,
                'settings' => [
                    'nombre' => $this->salas[$codigoSala]['nombre']
                ]
            ]
        ];

        $this->broadcastToRoom($codigoSala, $mensajeIniciarJuego);
        echo "El juego ha comenzado en la sala '{$codigoSala}'\n";
    }

    private function actualizarEstadisticas($from, $data)
    {
        // Validar datos de entrada
        if (!isset($data['codigoSala']) || !isset($data['player'])) {
            echo "Datos incompletos proporcionados.";
            return;
        }

        $codigoSala = $data['codigoSala'];
        $player = $data['player']; // Trabajar directamente con el jugador

        if (!isset($this->salas[$codigoSala])) {
            echo "La sala no existe: $codigoSala";
            return;
        }

        // Inicializar historial si no existe
        if (!isset($this->salas[$codigoSala]['historial'])) {
            $this->salas[$codigoSala]['historial'] = [];
        }
        $historial = &$this->salas[$codigoSala]['historial'];

        $idUsuario = $player['idUsuario'];
        $score = $player['score'];
        $time = $player['time'];
        $existe = false;

        // Actualizar historial
        foreach ($historial as &$historialPlayer) {
            if ($historialPlayer['idUsuario'] === $idUsuario) {
                // Sumar el nuevo puntaje al existente
                $historialPlayer['score'] += $score;
                $historialPlayer['time'] = $time; // Actualizar el tiempo con el más reciente
                $existe = true;
                break;
            }
        }

        // Si no existe el usuario, agregarlo al historial
        if (!$existe) {
            $historial[] = [
                'idUsuario' => $idUsuario,
                'score' => $score,
                'time' => $time,
            ];
        }

        // Verificar historial actualizado
        var_dump($this->salas[$codigoSala]['historial']);

        // Difundir estadísticas
        $this->broadcastToRoom($codigoSala, [
            'type' => 'actualizarEstadisticas',
            'players' => $this->salas[$codigoSala]['historial']
        ]);

        // Guardar historial en archivo
        file_put_contents('historial_sala_' . $codigoSala . '.json', json_encode($this->salas[$codigoSala]['historial'], JSON_PRETTY_PRINT));
    }
    private function actualizarEstadisticaFinal($from, $data){
        if (!isset($data['codigoSala']) || !isset($data['player'])) {
            echo "Datos incompletos proporcionados.";
            return;
        }

        $codigoSala = $data['codigoSala'];
        $player = $data['player']; // Trabajar directamente con el jugador

        if (!isset($this->salas[$codigoSala])) {
            echo "La sala no existe: $codigoSala";
            return;
        }

        // Inicializar historial si no existe
        if (!isset($this->salas[$codigoSala]['historial'])) {
            $this->salas[$codigoSala]['historial'] = [];
        }
        $historial = &$this->salas[$codigoSala]['historial'];

        $idUsuario = $player['idUsuario'];
        $score = $player['score'];
        $time = $player['time'];
        $existe = false;

        // Actualizar historial
        foreach ($historial as &$historialPlayer) {
            if ($historialPlayer['idUsuario'] === $idUsuario) {
                // Sumar el nuevo puntaje al existente
                $historialPlayer['score'] = $score;
                $historialPlayer['time'] = $time; // Actualizar el tiempo con el más reciente
                $existe = true;
                break;
            }
        }

        // Si no existe el usuario, agregarlo al historial
        if (!$existe) {
            $historial[] = [
                'idUsuario' => $idUsuario,
                'score' => $score,
                'time' => $time,
            ];
        }

        // Verificar historial actualizado
        var_dump($this->salas[$codigoSala]['historial']);

        // Difundir estadísticas
        $this->broadcastToRoom($codigoSala, [
            'type' => 'actualizarEstadisticaFinal',
            'players' => $this->salas[$codigoSala]['historial']
        ]);
    }
    private function manejoChat($from, $data)
    {
        $userName = isset($data['from']) ? $data['from'] : 'Invitado';
        $userId = isset($data['id_usuario']) ? $data['id_usuario'] : 'ID Desconocido';
        if (!isset($from->codigoSala)) {
            return;
        }

        $message = [
            'type' => 'chat',
            'message' => $data['message'],
            'from' => $userName
        ];

        $this->broadcastToRoom($from->codigoSala, $message, $from);
    }

    private function reconectarSala(ConnectionInterface $from, array $data)
    {
        $codigoSala = $data['codigoSala'];
        $players = $data['players'];

        // Si la sala no existe, la crea
        if (!isset($this->salas[$codigoSala])) {
            $this->salas[$codigoSala] = [];
            $this->salas[$codigoSala]['historial'] = [];  // Inicializa historial si no existe
            $this->salas[$codigoSala]['clients'] = [];    // Inicializa clientes si no existe
        }

        // Reconecta a los jugadores y los agrega al historial
        foreach ($players as $player) {
            $userId = $player['idUsuario'];
            $usuario = $player['usuario'];
            $score = $player['score'];
            $time = $player['time'];

            // Verificar si el jugador ya está en el historial de la sala
            $existeUsuario = false;
            foreach ($this->salas[$codigoSala]['historial'] as $historialPlayer) {
                if ($historialPlayer['idUsuario'] === $userId) {
                    $existeUsuario = true;
                    break;
                }
            }

            // Si el jugador no está en el historial, agregarlo
            if (!$existeUsuario) {
                $this->salas[$codigoSala]['historial'][] = [
                    'idUsuario' => $userId,
                    'usuario' => $usuario,
                    'score' => $score,
                    'time' => $time
                ];
            }

            // Verificar si el jugador ya está conectado
            if (isset($this->salas[$codigoSala]['clients'])) {
                // Si ya está en la sala, primero lo desconectamos antes de reconectar
                foreach ($this->salas[$codigoSala]['clients'] as $client) {
                    if ($client->userId === $userId) {
                        // Eliminar la conexión anterior
                        $this->salas[$codigoSala]['clients']->detach($client);
                        echo "Jugador {$usuario} previamente desconectado.\n";
                        break;
                    }
                }
            }

            // Reconectar el jugador actual (agregar la conexión en 'clients')
            if (!isset($this->salas[$codigoSala]['clients']) || !$this->salas[$codigoSala]['clients'] instanceof \SplObjectStorage) {
                $this->salas[$codigoSala]['clients'] = new \SplObjectStorage();
            }

            // Asociar la conexión con la sala
            $from->codigoSala = $codigoSala;
            $this->salas[$codigoSala]['clients']->attach($from);

            echo "Jugador {$usuario} reconectado a la sala {$codigoSala}\n";
        }

        // Notificar a todos los jugadores en la sala sobre la reconexión y el historial
        $this->broadcastToRoom($codigoSala, ['type' => 'historial'], $from);
    }


    // Función para hacer broadcasting a todos los jugadores de la sala



    private function finalizarJuego($from)
    {
        if (!isset($from->codigoSala) || $from !== $this->salas[$from->codigoSala]['anfitrion']) {
            return;
        }

        $this->broadcastToRoom($from->codigoSala, ['type' => 'chatEnded']);

        // Cerrar conexiones de todos los clientes en la sala
        foreach ($this->salas[$from->codigoSala]['clients'] as $client) {
            $client->close();
        }

        // Eliminar la sala
        unset($this->salas[$from->codigoSala]);
    }

    private function broadcastToRoom($codigoSala, $data, $except = null)
    {
        if (!isset($this->salas[$codigoSala])) {
            return;
        }

        foreach ($this->salas[$codigoSala]['clients'] as $client) {
            if ($except !== $client) {
                $client->send(json_encode($data));
            }
        }
    }



    private function generarCodigoSala()
    {
        do {
            $code = strtoupper(substr(md5(uniqid()), 0, 6));
        } while (isset($this->salas[$code]));

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