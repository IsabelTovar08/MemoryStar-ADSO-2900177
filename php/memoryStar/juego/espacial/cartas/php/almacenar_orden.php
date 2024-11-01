<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos de la solicitud POST y guardarlos en la sesión
    $ordenDef = json_decode(file_get_contents("php://input"), true)['ordenDef'];
    $_SESSION['ordenDef'] = $ordenDef;
    echo json_encode(['status' => 'success']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retornar el valor guardado en la sesión
    echo json_encode(['ordenDef' => $_SESSION['ordenDef'] ?? null]);
}
