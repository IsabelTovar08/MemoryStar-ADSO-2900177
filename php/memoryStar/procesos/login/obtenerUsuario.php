<?php
session_start();

// Verifica si el usuario ha iniciado sesión
if (isset($_SESSION['usuario'])) {
    // Retorna los datos del usuario en formato JSON
    $response = [
        'success' => true,
        'usuario' => $_SESSION['usuario']
    ];
    echo json_encode($response);
} else {
    // Si no hay sesión, retorna un mensaje de error
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
}