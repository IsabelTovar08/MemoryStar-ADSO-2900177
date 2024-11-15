<?php
session_start();
require '../conexion/conexion.php';

header('Content-Type: application/json');

$conexion = new conexion();
$sql = "SELECT puntosacumulados, diamantes FROM usuario WHERE id_usuario = :id";
$valores = [':id' => $_SESSION['id_usuario']];

$resultado = $conexion->consulta($sql, $valores);

if ($resultado) {
    echo json_encode([
        'success' => true,
        'datos' => $resultado[0]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'mensaje' => 'No se encontraron datos'
    ]);
}