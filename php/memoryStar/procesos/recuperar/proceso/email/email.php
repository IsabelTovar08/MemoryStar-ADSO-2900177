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
        $resultados = $this->conexion->consulta($sql, $valores);

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
            $mail->Subject = mb_convert_encoding('Recuperar cuenta', 'UTF-8', 'auto');
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
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f9f9f9;
                        margin: 0;
                        padding: 0;
                        color: #000 !important;
                    }
                    .email-container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        padding: 20px;
                        border-radius: 8px;
                        border: 2px solid #000;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        color: #4CAF50;
                    }
                    .content {
                        text-align: left;
                        line-height: 1.6;
                    }
                    .code {
                        font-size: 24px;
                        font-weight: bold;
                        color: #4CAF50;
                        text-align: center;
                        padding: 10px;
                        border-radius: 5px;
                        background-color: #f2f2f2;
                        display: inline-block;
                        margin: 20px auto;
                    }
                    .footer {
                        text-align: center;
                        color: #777;
                        font-size: 12px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="contenedor">
                    <h1 class="header">Recuperación de Contraseña</h1>
                    <p>¡Hola, querido usuario!</p>
                    <p>¿Listo para volver a desafiar tu memoria?</p>
                    <div class="content">
                        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>Memory Star</strong>. Usa el siguiente código para completar el proceso de recuperación:</p>
                        <div class="code">' . $codigo . '</div>
                        <p>Este código es válido solo por 10 minutos. Si no solicitaste este cambio, puedes ignorar este correo.</p>
                    </div>
                    <div class="footer">
                        <p>¡Nos encanta que formes parte de Memory Star!</p>
                        <p><strong>El equipo de Memory Star</strong></p>
                        <p><small>Si necesitas ayuda, no dudes en contactarnos en <a href="mailto:soporte@memory-star.com">soporte@memory-star.com</a></small></p>
                    </div>
                </div>
            </body>
            </html>';
    }
}
$recuperacion = new CorreoRecuperacion();
$recuperacion->enviarCodigo();