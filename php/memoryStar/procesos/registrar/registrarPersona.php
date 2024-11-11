<?php
header('Content-Type: application/json');

include('registrar.php');

$data = json_decode(file_get_contents('php://input'), true);

$nombre = $data['usuario'];
$email = $data['email'];
$clave = $data['password'];

$registro = new Registrar();
$registro->setNombreUsuario($nombre);
$registro->setEmailUsuario($email);
$registro->setClave($clave);

try {
    $registro->registrar();
    echo json_encode([
        'success' => true,
        'redirect' => 'registroExitoso.html'
    ]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
