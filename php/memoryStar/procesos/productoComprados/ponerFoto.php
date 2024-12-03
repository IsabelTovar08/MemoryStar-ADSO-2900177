<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include('../conexion/conexion.php');

$data = json_decode(file_get_contents('php://input'), true);  

if (isset($data['idUsuario'])) {  
    $id_usuario = $data['idUsuario'];  

    $conexion = new conexion();
    $sql = "SELECT urlfotoperfil FROM usuario WHERE id_usuario = :id_usuario";
    $params = [':id_usuario' => $id_usuario];

    try {
        $resultado = $conexion->consulta($sql, $params);

        if ($resultado && isset($resultado[0]['urlfotoperfil'])) {
            $urlFotoperfil = str_replace('\\', '/', $resultado[0]['urlfotoperfil']);

            if (!empty($urlFotoperfil)) {
                echo json_encode(["success" => true, "urlfotoperfil" => $urlFotoperfil]);
            } else {
                echo json_encode(["success" => false, "message" => "La foto de perfil está vacía."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Usuario no encontrado o no tiene foto de perfil."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "message" => "Error en la consulta: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Datos incompletos."]);
}
?>
