<?php
header('Content-Type: application/json');

include('registrar.php');
include('AutoLogin.php');

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['usuario'];
$email = $data['email'];
$clave = $data['password'];

$registro = new Registrar();
$registro->setNombreUsuario($nombre);
$registro->setEmailUsuario($email);
$registro->setclave($clave);

try {
    $registro->registrar();

    $autoLogin = new AutoLogin();
    if ($autoLogin->loginn($nombre, $clave)) {
        echo json_encode([
            'success' => true,
            'redirect' => '../../pingpong.html'
        ]);
    } else { 
        echo json_encode([
            'error' => 'Registro exitoso pero hubo un problema al iniciar sesión'
        ]);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}