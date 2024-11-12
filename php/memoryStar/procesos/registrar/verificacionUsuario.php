<?php
// verificarUsuario.php
header('Content-Type: application/json');
include('../conexion/conexion.php');

$data = json_decode(file_get_contents('php://input'), true);
$tipo = $data['tipo']; // 'usuario' o 'email'
$valor = $data['valor'];

$conexion = new conexion();

try {
    if ($tipo === 'usuario') {
        $sql = "SELECT COUNT(*) as count FROM usuario WHERE nombre_usuario = :valor";
    } else {
        $sql = "SELECT COUNT(*) as count FROM usuario WHERE email = :valor";
    }
    
    $valores = [':valor' => $valor];
    $resultado = $conexion->consulta($sql, $valores);
    
    echo json_encode([
        'exists' => $resultado[0]['count'] > 0
    ]);
} catch (Exception $e) {
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}