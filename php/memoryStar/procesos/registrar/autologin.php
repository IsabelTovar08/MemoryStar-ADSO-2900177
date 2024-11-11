<?php
// include('../conexion/conexion.php');
// include('../usuario/usuario.php');

class AutoLogin extends Usuario
{
    private $sqlLogin;

    public function loginn($nombreUsuario, $clave)
    {
        $conexion = new Conexion();

        $this->sqlLogin = "SELECT id_usuario, nombre_usuario FROM usuario WHERE nombre_usuario = :nombre_usuario
         AND clave = :clave";

        $valores = [
            ':nombre_usuario' => $nombreUsuario,
            ':clave' => $clave
        ];

        $resultado = $conexion->consulta($this->sqlLogin, $valores);

        if ($resultado && count($resultado) > 0) {
            // Iniciar sesión
            session_start();
            $_SESSION['nombre_usuario'] = $nombreUsuario;
            $_SESSION['email'] = $resultado[0]['email'];
            return true;
        }
 
        return false;
    }
}