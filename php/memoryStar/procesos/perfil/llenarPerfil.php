<?php
session_start(); 
include('../conexion/conexion.php');
include('persona/persona.php');

class LlenarPerfil extends persona {
    private $sqlInsert;
    private $sqlMostrar;

    public function llenarPerfil() {
        $conexion = new conexion();
        
        $id_usuario = $_SESSION['id_usuario'];
        // echo "ID de usuario de la sesión: " . $id_usuario;

        
        $this->sqlInsert = "UPDATE persona 
        SET nombre = :nombre, apellido = :apellido, telefono = :telefono
        WHERE id_usuario = :id_usuario";

        $valores = [
            ':nombre'=> $this->getNombre(),
            ':apellido'=> $this->getApellido(),
            ':telefono'=> $this->getNumero(),
            ':id_usuario' => $id_usuario
        ];
        $conexion->ejecutar($this->sqlInsert, $valores);


        $this->sqlMostrar = "SELECT * FROM persona WHERE id_usuario = :id_usuario";
        $valores = [':id_usuario' => $id_usuario];
        $resultado = $conexion->consulta($this->sqlMostrar, $valores);

        return $resultado;
    }
}


// $perfil = new LlenarPerfil();
// $perfil->llenarPerfil();


