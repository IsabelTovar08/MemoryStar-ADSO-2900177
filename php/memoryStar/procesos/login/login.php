<?php
include('../conexion/conexion.php');
include('../usuario/usuario.php');

class sesion extends usuario {
    private $sqlSesion;

    public function session() {
        $conexion = new conexion();
        $this->sqlSesion = "SELECT * FROM usuario WHERE nombre_usuario = :nombre_usuario
         AND clave = :clave";

        $valores = [
            'nombre_usuario' => $this->getNombreUsuario(),
            'clave' => $this->getclave(),
        ];

        // Ejecutar la consulta
        $resultado = $conexion->login($this->sqlSesion, $valores);

        // Si la consulta fue exitosa y hay resultados
        if ($resultado && count($resultado) > 0) {
            // Retornamos los datos del usuario
            return $resultado[0]; // Devuelve el primer usuario encontrado (suponiendo que hay uno solo)
        }

        return false; // Usuario no encontrado
    }
}
