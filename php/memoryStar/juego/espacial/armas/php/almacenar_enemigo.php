<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recibir los datos de la solicitud POST y guardarlos en la sesión
    $boss = json_decode(file_get_contents("php://input"), true)['boss'];
    $_SESSION['boss'] = $boss;
    echo json_encode(['status' => 'success']);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Retornar el valor guardado en la sesión
    echo json_encode(['boss' => $_SESSION['boss'] ?? null]);
}