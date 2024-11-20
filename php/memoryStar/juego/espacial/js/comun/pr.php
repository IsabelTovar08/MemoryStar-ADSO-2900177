<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Process received data
$response = [
    'mensaje' => 'Datos recibidos correctamente',
    'datos_recibidos' => $data
];

echo json_encode($response);


