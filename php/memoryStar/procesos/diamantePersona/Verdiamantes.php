<?php
session_start();

if (isset($_SESSION['usuario'])) {
    $usuario = $_SESSION['usuario']; 
    
    // Conexión a la base de datos
    include('../conexion/conexion.php');
    $diamantesPersona = new conexion();

    try {
        $stmt = $diamantesPersona->conectar()->prepare("SELECT id_usuario, nombre_usuario, diamantes FROM usuario WHERE nombre_usuario = ?");
        $stmt->execute([$usuario]);

        $usuarioDatos = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuarioDatos) {
            echo json_encode([
                'success' => true,
                'id_usuario' => $usuarioDatos['id_usuario'],
                'nombre_usuario' => $usuarioDatos['nombre_usuario'],
                'diamantes' => $usuarioDatos['diamantes']
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Usuario no encontrado']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => $e->getMessage()]);
    }
} else {
    // Si no hay usuario en la sesión, se puede retornar un error
    echo json_encode(['error' => 'Usuario no autenticado']);
}
?>
