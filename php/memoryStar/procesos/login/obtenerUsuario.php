<?php
session_start();
if (isset($_SESSION['usuario'])) {
    $response = [
        'success' => true,
        'usuario' => $_SESSION['usuario'],
        'id_usuario' => $_SESSION['id_usuario']

    ];
    echo json_encode($response);
} else {
    echo json_encode(['success' => false, 'message' => 'Usuario no autenticado']);
}    