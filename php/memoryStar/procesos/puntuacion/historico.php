<?php
session_start();
require '../conexion/conexion.php';

header('Content-Type: application/json');

if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(["error" => "Usuario no autenticado"]);
    exit();
}

$conexion = new Conexion();
$usuario_id = $_SESSION['id_usuario'];

try {
    $sql = "SELECT CONCAT('Partida ', ROW_NUMBER() OVER (ORDER BY idpuntos DESC)) AS partida,
                   tiempo, puntos, diamantes
            FROM puntos 
            WHERE usuario_id = :id 
            ORDER BY idpuntos DESC";
    
    $valores = [':id' => $usuario_id];
    $resultado = $conexion->consulta($sql, $valores);

    echo json_encode($resultado);
    
} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la consulta de base de datos"]);
}
?>
