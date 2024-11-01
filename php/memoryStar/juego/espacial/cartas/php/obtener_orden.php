<?php
session_start();

if (isset($_SESSION['ordenDef'])) {
    echo json_encode(['success' => true, 'orden' => $_SESSION['ordenDef']]);
} else {
    // Si no hay datos en sesión, intentar leer del archivo
    if (file_exists('orden.txt')) {
        $orden = json_decode(file_get_contents('orden.txt'));
        echo json_encode(['success' => true, 'orden' => $orden]);
    } else {
        echo json_encode(['success' => false, 'error' => 'No order found']);
    }
}
