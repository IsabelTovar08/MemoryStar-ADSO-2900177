<?php
include('../conexion/conexion.php');

$conexion = new conexion();
$input = json_decode(file_get_contents('php://input'), true);

if (!empty($input['id_usuario']) && !empty($input['id_tienda'])) {
    $sql = "INSERT INTO productourls (id_usuario, id_tienda) VALUES (:id_usuario, :id_tienda)";
    $resultado = $conexion->ejecutar($sql, [
        ':id_usuario' => $input['id_usuario'],
        ':id_tienda' => $input['id_tienda']
    ]);
    echo json_encode(["success" => $resultado]);
}
?>
