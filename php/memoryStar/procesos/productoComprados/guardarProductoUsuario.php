<?php
include('../conexion/conexion.php'); 

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['idUsuario'], $data['urlProducto'])) {
    $idUsuario = $data['idUsuario'];
    $urlProducto = $data['urlProducto'];

    $conexion = new conexion();

    $sql = "UPDATE usuario SET urlfotoperfil = :url_producto WHERE id_usuario = :id_usuario";
    $params = [
        ':url_producto' => $urlProducto,  
        ':id_usuario' => $idUsuario      
    ];

    if ($conexion->consulta($sql, $params)) {
        echo json_encode([
            "success" => true,
            "message" => "URL de foto de perfil actualizada correctamente."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Error al actualizar el producto."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Datos incompletos."
    ]);
}
?>
