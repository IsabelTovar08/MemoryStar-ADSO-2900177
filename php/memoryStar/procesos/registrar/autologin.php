<?php
include('../conexion/conexion.php');
include('../usuario/usuario.php');

class AutoLogin extends Usuario
{
    private $sqlLogin;

    public function loginn($nombreUsuario, $clave)
    {
        $conexion = new Conexion();

        $this->sqlLogin = "SELECT id_usuario, nombre_usuario, clave FROM usuario WHERE nombre_usuario = :nombre_usuario";

        $valores = [
            ':nombre_usuario' => $nombreUsuario
        ];

        $resultado = $conexion->consulta($this->sqlLogin, $valores);

        if ($resultado && count($resultado) > 0) {
            if (password_verify($clave, $resultado[0]['clave'])) {
                session_start();
                $_SESSION['nombre_usuario'] = $nombreUsuario;
                $_SESSION['email'] = $resultado[0]['email'];
                return true;
            }
        }

        return false;
    }
}