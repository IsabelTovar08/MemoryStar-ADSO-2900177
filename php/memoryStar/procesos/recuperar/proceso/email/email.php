<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
require '../../vendor/autoload.php';
require '../../../conexion/conexion.php';
include '../encapsular/recupera.php';


class CorreoRecuperacion
{
    private $conexion;
    private $conectar;
    public $mensajes;
    // public $recuperacion;

    public function __construct()
    {
        $this->conexion = new Conexion();
        $this->conectar = $this->conexion->conectar();
        $this->mensajes = json_decode(file_get_contents('php://input'), true);

        // var_dump($this->mensajes);  // Verifica el contenido del JSON
        // exit; 
    }

    public function enviarCodigo()
    {
        $recuperacion = new datosNuevaContrasena();
        $recuperacion->setCorreo($this->mensajes['emailRecuperar'] ?? '');
        $correo = $recuperacion->getCorreo();

        if (empty($correo)) {
            echo json_encode([
                'status' => 'error',
                'message' => 'No se ha proporcionado un correo electrónico válido.'
            ]);
            exit;
        }

        $usuario = $this->consultarUsuario($correo);

        if ($usuario) {
            // Generamos y guardamos el código
            $codigo = strval(rand(100000, 999999));
            $this->insertarCodigo($usuario['id_usuario'], $codigo);

            // Enviamos el correo
            $resultadoEnvio = $this->enviarCorreo($correo, $codigo);

            // Verificamos si el envío del correo fue exitoso
            if ($resultadoEnvio['status'] === 'success') {
                echo json_encode([
                    'status' => 'success',
                    'codigo_usuario_existe' => true,
                    'message' => 'Código enviado correctamente a su correo.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'codigo_usuario_existe' => true,
                    'message' => 'Error al enviar el correo. Por favor, intente nuevamente.'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'codigo_usuario_existe' => false,
                'message' => 'El correo electrónico no está registrado en el sistema.'
            ]);
        }
        exit;
    }

    private function consultarUsuario($correo)
    {
        $sql = "SELECT id_usuario FROM usuario WHERE email = :correo";
        $valores = ['correo' => $correo];
        $resultados = $this->conexion->login($sql, $valores);

        if (count($resultados) > 0) {
            return $resultados[0]; // Devuelve el primer usuario encontrado
        } else {
            return false;
        }
    }


    private function insertarCodigo($id_usuario, $codigo)
    {
        $query = "INSERT INTO recuperar_contrasena (id_usuario, codigo) VALUES (:id_usuario, :codigo)";
        $stmt = $this->conectar->prepare($query);
        $stmt->execute(['id_usuario' => $id_usuario, 'codigo' => $codigo]);
    }

    private function enviarCorreo($correo, $codigo)
    {
        $mail = new PHPMailer(true);

        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'maria08i.tovar@gmail.com';
            $mail->Password = 'cpliopjrhjmyclsf';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            $mail->setFrom('maria08i.tovar@gmail.com', 'MemoryStar');
            $mail->addAddress($correo);

            $mail->isHTML(true);
            $mail->Subject = mb_convert_encoding('Recuperar contraseña', 'UTF-8', 'auto');
            $mail->Body = $this->generarCuerpoCorreo($codigo);
            $mail->AltBody = 'Este es el mensaje en texto plano para clientes de correo que no soportan HTML';

            $mail->send();

            return ['status' => 'success', 'message' => 'Correo enviado correctamente.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Error al enviar el correo: ' . $mail->ErrorInfo];
        }
    }

    private function generarCuerpoCorreo($codigo)
    {
        return '
            <html>
            <meta charset="UTF-8">
            <head>
                <title>Recuperación de Contraseña</title>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .contenedor { padding: 20px; background-color: #f9f9f9; border: 1px solid #ccc; }
                    h1 { color: #4CAF50; }
                    p { font-size: 16px; }
                    .codigo { font-size: 20px; font-weight: bold; color: #FF6347; }
                    .footer { font-size: 12px; color: #888; }
                </style>
            </head>
            <body>
                <div class="contenedor">
                    <h1>Recuperación de Contraseña</h1>
                    <p>Hola,</p>
                    <p>Recibimos una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, ignora este correo.</p>
                    <p>A continuación te proporcionamos el código de recuperación:</p>
                    <p class="codigo">' . $codigo . '</p>
                    <p>Este código es válido solo por 10 minutos. Si no lo usas dentro de este tiempo, tendrás que solicitar uno nuevo.</p>
                    <p class="footer">Gracias por usar nuestro servicio.</p>
                </div>
            </body>
            </html>';
    }
}
$recuperacion = new CorreoRecuperacion();
$recuperacion->enviarCodigo();