<?php
header('Content-Type: application/json');

require_once '../../../conexion/conexion.php';
require_once '../encapsular/recupera.php';

class ValidarCodigo {
    public $conexion;
    public $conectar;
    private $codigo;
    private $mensajes;
    public $usuario;

    public function __construct() {
        $this->conexion = new Conexion();
        $this->conectar = $this->conexion->conectar();
        $this->mensajes = json_decode(file_get_contents('php://input'), true);

        $recuperacion = new datosNuevaContrasena();
        $recuperacion->setCodigo($this->mensajes['codigo'] ?? '');
        $this->codigo = $recuperacion->getCodigo();
    }

    public function validar() {
        if (empty($this->codigo)) {
            $this->respuesta('error', 'No se ha proporcionado un código válido.', 'null');
        }

        // Obtener el id_usuario desde el código proporcionado
        $usuario = $this->consultarCodigo();
        if ($usuario) {
            $this->usuario = $usuario;
            return $this->consultarValidezCodigo($usuario);
        } else {
            $this->respuesta('error', 'Código de recuperación incorrecto.', $usuario);
        }
    }

    private function consultarCodigo() {
        $sql = "SELECT id_usuario FROM recuperar_contrasena WHERE codigo = :codigo";
        $valores = ['codigo' => $this->codigo];
        $resultados = $this->conexion->login($sql, $valores);

        return count($resultados) > 0 ? $resultados[0]['id_usuario'] : false;
    }

    private function consultarValidezCodigo($usuario) {
        $sql = "SELECT EXTRACT(EPOCH FROM (NOW() - created_at)) / 60 AS minutos_transcurridos 
                FROM recuperar_contrasena WHERE codigo = :codigo";
        $valores = ['codigo' => $this->codigo];
        $resultados = $this->conexion->login($sql, $valores);

        if (!empty($resultados) && $resultados[0]['minutos_transcurridos'] <= 10) {
            $this->respuesta('success', 'Código correcto.', $usuario);
        } else {
            $this->respuesta('error', 'El código de recuperación ha expirado. Solicita uno nuevo.', $usuario );
        }
    }

    private function respuesta($status, $message, $user) {
        echo json_encode(['status' => $status, 'message' => $message, 'user' => $user]);
        exit;
    }
    public function getUsuario() {
        return $this->usuario;
    }
}

$validar = new ValidarCodigo();
$validar->validar();