<?php
header('Content-Type: application/json');
require_once '../../../conexion/conexion.php';
require_once '../encapsular/recupera.php';

class NuevaContrasena
{
    private $conexion;
    private $conectar;
    public $usuario;
    private $mensajes;
    private $nueva_contrasena;

    public function __construct()
    {


        $this->conexion = new Conexion();
        $this->conectar = $this->conexion->conectar();
        $this->mensajes = json_decode(file_get_contents('php://input'), true);

        $recuperacion = new datosNuevaContrasena();
        $recuperacion->setNuevaContrasena($this->mensajes['contrasena'] ?? '');
        $this->nueva_contrasena = $recuperacion->getNuevaContrasena();
        $this->usuario = $this->mensajes['usuario'] ?? null;

        // Opcional: Verifica si los valores se han recibido correctamente
        // var_dump($this->nueva_contrasena, $this->usuario);
    }

    public function actualizar()
    {
        if (!$this->usuario) {
            $this->respuesta('error', 'No se pudo validar el código.');
        }

        $this->actualizarContrasena();
        $this->eliminarCodigo();
        $this->respuesta('success', 'Contraseña actualizada exitosamente.');
    }

    private function actualizarContrasena()
    {
        $encriptar_contrasena = password_hash($this->nueva_contrasena, PASSWORD_DEFAULT);
        $sql = "UPDATE usuario SET clave = :nueva WHERE id_usuario = :id_usuario";
        $actualizar = $this->conectar->prepare($sql);
        $actualizar->execute(['nueva' => $encriptar_contrasena, 'id_usuario' => $this->usuario]);
    }

    private function eliminarCodigo()
    {
        $sql = "DELETE FROM recuperar_contrasena WHERE id_usuario = :id_usuario";
        $consulta = $this->conectar->prepare($sql);
        $consulta->bindParam(':id_usuario', $this->usuario);
        $consulta->execute();
    }

    private function respuesta($status, $message)
    {
        echo json_encode(['status' => $status, 'message' => $message]);
        exit;
    }
}
$nueva = new NuevaContrasena();
$nueva->actualizar();