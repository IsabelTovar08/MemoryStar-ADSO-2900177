<?php
session_start(); 
include('../../procesos/conexion/conexion.php');
include('sala.php');

class Crear extends Sala {
    private $sqlInsert;

    public function crear() {
        if (!isset($_SESSION['id_usuario'])) {
            echo json_encode(['status' => 'error', 'message' => 'No hay usuario en sesión. Por favor, inicia sesión.']);
            return;
        }

        $conexion = new Conexion();
        $idConfiguracion = $conexion->obtenerUltimoIdConfiguracion();

        if ($idConfiguracion === null) {
            echo json_encode(['status' => 'error', 'message' => 'No se encontró ninguna configuración de juego.']);
            return;
        }

        $this->sqlInsert = "INSERT INTO salas(nombre_sala, capacidad_sala, fecha_creacion, id_configuracion_juego, id_creador, codigosala)
                            VALUES(:nombreSala, :capacidad, NOW(), :configuracion, :creador, :codigo)";

        $valores = [
            ':nombreSala' => $this->getNombreSala(),
            ':capacidad' => $this->getCapacidad(),
            ':configuracion' => $idConfiguracion,
            ':creador' => $_SESSION['id_usuario'],
            ':codigo' => $this->getcodigoSala()
        ];

        $resultado = $conexion->ejecutar($this->sqlInsert, $valores);

        if ($resultado) {
            
            echo json_encode([
                'status' => 'success',
                'message' => 'Sala creada correctamente.',
                'data' => [
                    'id_creador' => $_SESSION['id_usuario'],
                    'id_configuracion' => $idConfiguracion,
                    'nombre_sala' => $this->getNombreSala(),
                    'capacidad_sala' => $this->getCapacidad(),
                    'codigo_sala' => $this->getcodigoSala(),
                    'fecha_creacion' => date('Y-m-d H:i:s') 
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Hubo un error al crear la sala.']);
        }
    }
}
