<?php
session_start();
header('Content-Type: application/json');

include('login.php');

$data = json_decode(file_get_contents('php://input'), true);
$usuario = $data['usuario'];
$clave = $data['password'];

$sesion = new Sesion();
$sesion->setNombreUsuario($usuario);
$sesion->setClave($clave); 

$resultado = $sesion->session(); 

if ($resultado) { 
    $_SESSION['usuario'] = $usuario;  
    $_SESSION['id_usuario'] = $resultado['id_usuario']; 

    echo json_encode([
        'success' => true, 
        'mensaje' => 'Sesión iniciada correctamente', 
        'id_usuario' => $resultado['id_usuario'] 
    ]);
} 
?>

    