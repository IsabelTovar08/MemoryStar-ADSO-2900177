<?php
include('../conexion/conexion.php');
include('../usuario/usuario.php');

class Registrar extends Usuario {
    private $sqlInsertarUsuario;
    private $sqlInsertarPersona;
    
    public function registrar() {
        $conexion = new conexion();
        
       
        $fechaRegistro = date('Y-m-d H:i:s');
        
        $this->sqlInsertarUsuario = "INSERT INTO usuario(nombre_usuario, email, clave, fechar_registro) 
                                    VALUES (:nombre_usuario, :email, :clave, :fechar_registro)
                                    RETURNING id_usuario";
        
        $valoresUsuario = [
            ':nombre_usuario' => $this->getNombreUsuario(),
            ':email' => $this->getEmailUsuario(),
            ':clave' => $this->getClave(),
            ':fechar_registro' => $fechaRegistro 
        ];
        
        
        $resultado = $conexion->ejecutarInsert($this->sqlInsertarUsuario, $valoresUsuario);
        $ultimoIdUsuario = $resultado['id_usuario'];
        
        
        $this->sqlInsertarPersona = "INSERT INTO persona(id_usuario) VALUES (:id_usuario)";
        
        $valoresPersona = [
            ':id_usuario' => $ultimoIdUsuario
        ];
        
        return $conexion->ejecutar($this->sqlInsertarPersona, $valoresPersona);
    }
    
}