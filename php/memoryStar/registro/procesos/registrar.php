<?php 
include('../conexion/conexion.php');
include('usuario.php');

class Registrar extends Usuario {
    private $sqlInsertar;

    public function registrar() {
        $conexion = new Conexion();
  
       
        $fechaRegistro = date('Y-m-d H:i:s');

        
        $this->sqlInsertar = "INSERT INTO usuario(nombre_usuario, email, clave, fechar_registro)  
        VALUES (:nombre_usuario, :email, :clave, :fechar_registro);";

       
        $valores = [
            ':nombre_usuario' => $this->getNombreUsuario(),
            ':email' => $this->getEmailUsuario(),
            ':clave' => $this->getClave(),
            ':fechar_registro' => $fechaRegistro 
        ];

        
        $conexion->ejecutar($this->sqlInsertar, $valores);    
    }
}

