<?php
session_start();
header('Content-Type: application/json');

include('login.php');

$data = json_decode(file_get_contents('php://input'), true);
$usuario = $data['usuario'];
$clave = $data['password'];

$sesion = new sesion();
$sesion->setNombreUsuario($usuario);
$sesion->setclave($clave);

$resultado = $sesion->session(); 

if ($resultado) { 
    
    $_SESSION['usuario'] = $usuario; 
    $_SESSION['id_usuario'] = $resultado['id_usuario'];
     
    echo json_encode(['success' => true, 'mensaje' => 'Sesión iniciada correctamente']);
} else {
   
    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
}


  