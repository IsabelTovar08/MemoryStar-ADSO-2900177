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
            <html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña - Memory Star</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap");
        
        body, html {
            margin: 0;
            padding: 0;
            font-family: "Space Grotesk", Arial, sans-serif;
            line-height: 1.6;
            background-color: #0C1445;
            color: #ffffff;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: linear-gradient(135deg, #1A237E, #0D47A1);
            border-radius: 16px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            border: 2px solid #1E88E5;
        }
        
        .email-header {
            background: rgba(30, 136, 229, 0.2);
            color: #B3E5FC;
            text-align: center;
            padding: 20px;
            border-bottom: 1px solid rgba(179, 229, 252, 0.2);
        }
        
        .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(179, 229, 252, 0.5);
        }
        
        .email-content {
            padding: 30px;
        }
        
        .verification-code {
            background-color: rgba(179, 229, 252, 0.1);
            border: 2px dashed #B3E5FC;
            text-align: center;
            padding: 20px;
            margin: 20px 0;
            border-radius: 12px;
            position: relative;
            overflow: hidden;
        }
        
        .verification-code::before {
            content: "✦";
            position: absolute;
            color: rgba(179, 229, 252, 0.3);
            font-size: 100px;
            top: -30px;
            left: -30px;
            z-index: 1;
        }
        
        .verification-code::after {
            content: "✦";
            position: absolute;
            color: rgba(179, 229, 252, 0.3);
            font-size: 100px;
            bottom: -30px;
            right: -30px;
            z-index: 1;
        }
        
        .verification-code .code {
            font-size: 32px;
            font-weight: 700;
            color: #B3E5FC;
            letter-spacing: 4px;
            position: relative;
            z-index: 2;
        }
        
        .email-footer {
            background-color: rgba(30, 136, 229, 0.1);
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #B3E5FC;
            border-top: 1px solid rgba(179, 229, 252, 0.2);
        }
        
        .email-footer a {
            color: #4FC3F7;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .email-footer a:hover {
            color: #81D4FA;
        }
        
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100%;
                margin: 0;
                border-radius: 0;
            }
            
            .email-content {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Recuperación de Contraseña</h1>
        </div>
        
        <div class="email-content">
            <p>¡Hola, querido usuario!</p>
            
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <strong>Memory Star</strong>. Usa el siguiente código para completar el proceso de recuperación:</p>
            
            <div class="verification-code">
                <div class="code">' . $codigo . '</div>
                <p>Este código es válido solo por 10 minutos.</p>
            </div>
            
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
        
        <div class="email-footer">
            <p>¡Nos encanta que formes parte de Memory Star!</p>
            <p><strong>El equipo de Memory Star</strong></p>
            <p>Si necesitas ayuda, contáctanos en <a href="mailto:soporte@memory-star.com">soporte@memory-star.com</a></p>
        </div>
    </div>
</body>
</html>
';
    }
}
$recuperacion = new CorreoRecuperacion();
$recuperacion->enviarCodigo();