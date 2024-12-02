<?php
include('../conexion/conexion.php');

function obtenerUsuariosConProductos($id_usuario) {
    $conexion = new conexion();

    $sql = "SELECT t.url_producto, t.precio_producto, t.disponible, t.id_producto
            FROM productourls pu
            JOIN tienda t ON pu.id_tienda = t.id_tienda
            WHERE pu.id_usuario = :id_usuario";

    $resultado = $conexion->consulta($sql, [':id_usuario' => $id_usuario]);

    if ($resultado) {
        return $resultado; 
    } else {
        return []; 
    }
}

$input = json_decode(file_get_contents("php://input"), true);

if (isset($input['id_usuario'])) {
    $id_usuario = $input['id_usuario'];
    $usuariosProductos = obtenerUsuariosConProductos($id_usuario);

    header('Content-Type: application/json');
    echo json_encode([
        "success" => true,
        "data" => $usuariosProductos
    ]);
} else {
    header('Content-Type: application/json');
    echo json_encode([
        "success" => false,
        "message" => "El id_usuario no se proporcionó correctamente."
    ]);
}
?>


