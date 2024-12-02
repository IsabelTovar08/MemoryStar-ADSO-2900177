<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include('../conexion/conexion.php');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_usuario'], $data['diamantes'])) {
    echo json_encode(["success" => false, "error" => "Datos incompletos"]);
    exit;
}

$user_id = intval($data['id_usuario']);
$diamantes = intval($data['diamantes']);

try {
    $conexion = new conexion();

    $pdo = $conexion->conectar();

    if ($pdo === null) {
        echo json_encode(["success" => false, "error" => "Error al conectar a la base de datos"]);
        exit;
    }

    $query = "UPDATE usuario SET diamantes =:diamantes WHERE id_usuario = :user_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':diamantes', $diamantes, PDO::PARAM_INT);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

    if ($stmt->execute()) {
        $stmtDiamantes = $pdo->prepare("SELECT diamantes FROM usuario WHERE id_usuario = :user_id");
        $stmtDiamantes->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $stmtDiamantes->execute();
        $diamantesActualizados = $stmtDiamantes->fetch(PDO::FETCH_ASSOC);

        echo json_encode(["success" => true, "diamantes" => $diamantesActualizados['diamantes']]);
    } else {
        echo json_encode(["success" => false, "error" => "No se pudo actualizar los diamantes"]);
    }

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => "Error en la base de datos: " . $e->getMessage()]);
}
?>
