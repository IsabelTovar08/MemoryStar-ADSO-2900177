<?php
include('../conexion/conexion.php');
include('../usuario/usuario.php');
class Sesion extends Usuario {
    private $sqlSesion;
    private $clavePlana; // Nueva propiedad para almacenar la clave sin hash

    // Sobrescribe el método setClave del padre
    public function setClave($clave) {
        $this->clavePlana = $clave; // Guarda la clave sin hash
    }

    // Sobrescribe el método getClave del padre
    public function getClave() {
        return $this->clavePlana; // Retorna la clave sin hash
    }

    public function session() {
        $conexion = new Conexion();
        
        $this->sqlSesion = "SELECT * FROM usuario WHERE nombre_usuario = :nombre_usuario";
        
        $valores = [
            'nombre_usuario' => $this->getNombreUsuario()
        ];
        
        $resultado = $conexion->consulta($this->sqlSesion, $valores);
        
        if ($resultado && count($resultado) > 0) {
            $usuarioDB = $resultado[0];
            // Ahora compara la clave plana con el hash de la base de datos
            if (password_verify($this->getClave(), $usuarioDB['clave'])) {
                return $usuarioDB;
            }
        }
        
        return false;
    }
}