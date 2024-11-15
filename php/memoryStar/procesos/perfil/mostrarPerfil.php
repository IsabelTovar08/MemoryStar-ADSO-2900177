<?php
session_start();
include('../conexion/conexion.php');

class LlenarPerfil {
    private $sqlMostrar;

    public function llenarPerfil() {
        $conexion = new conexion();
        $id_usuario = $_SESSION['id_usuario'];
        $this->sqlMostrar = "SELECT * FROM persona WHERE id_usuario = :id_usuario";
        $valores = [':id_usuario' => $id_usuario];
        $resultado = $conexion->consulta($this->sqlMostrar, $valores);
        return $resultado;
    }
}

$perfil = new LlenarPerfil();
$dataP = $perfil->llenarPerfil();
echo json_encode($dataP);