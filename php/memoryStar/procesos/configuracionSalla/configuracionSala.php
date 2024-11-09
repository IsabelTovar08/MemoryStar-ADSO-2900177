<?php
session_start(); 
include('../../procesos/conexion/conexion.php');
include('sala.php');

class Crear extends Sala {
    private $sqlInsert;
    public function crear() {
       
        if (isset($_SESSION['id_usuario'])) {
            echo "ID del id_usuario en sesión: " . $_SESSION['id_usuario'];
        } else {
            echo "No hay usuario en sesión. Por favor, inicia sesión.";
            return;
        }

    
        // $conexion = new Conexion();
        // $idConfiguracion = $conexion->obtenerUltimoIdConfiguracion(); 

        // if ($idConfiguracion === null) {
        //     echo "No se encontró ninguna configuración de juego.";
        //     return;
        // }

        // $this->sqlInsert = "INSERT INTO salas(nombre_sala, capacidad_sala, fecha_creacion, id_configuracion_juego, id_creador)
        //                     VALUES(:nombreSala, :capacidad, NOW(), :configuracion, :creador);"; 

        // $valores = [
        //     ':nombreSala' => $this->getNombreSala(), 
        //     ':capacidad' => $this->getCapacidad(),
        //     ':configuracion' => $idConfiguracion, 
        //     ':creador' => $_SESSION['id_usuario'],
        //     ':codigo' => $this->getcodigoSala()
        // ];

        // $conexion->ejecutar($this->sqlInsert, $valores);
        // header('Location:http://localhost/2024/jueves-/dasboard/sala.html');
        
    }
}

$crear = new Crear();
$crear->crear();
