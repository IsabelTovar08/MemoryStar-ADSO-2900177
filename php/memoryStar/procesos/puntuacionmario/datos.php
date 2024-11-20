<?php
require_once '../conexion/conexion.php';

header('Content-Type: application/json');
session_start();

// Verificar que existe el id de usuario en sesión
if (!isset($_SESSION['id_usuario'])) {
    echo json_encode(['error' => 'No hay usuario en sesión']);
    exit;
}

// Recibir datos JSON
$datos = json_decode(file_get_contents('php://input'), true);

// Inicializar array de datos en sesión si no existe
if (!isset($_SESSION['datos_archivos'])) {
    $_SESSION['datos_archivos'] = [];
}

// Guardar datos del archivo actual
$_SESSION['datos_archivos'][$datos['archivo']] = $datos;

// Verificar si ya tenemos datos de los tres archivos
if (count($_SESSION['datos_archivos']) === 3) {
    // Calcular totales
    $total_puntos = 0;
    $total_diamantes = 0;
    $total_tiempo = 0;
    
    foreach ($_SESSION['datos_archivos'] as $datos_archivo) {
        $total_puntos += $datos_archivo['puntos'];
        $total_diamantes += $datos_archivo['diamantes'];
        $total_tiempo += $datos_archivo['tiempo'];
    }
    
    try {
        $conexion = new conexion();
        
        // SQL incluyendo el id_usuario
        $sql = "INSERT INTO puntos ( id_usuario, puntos, diamantes, tiempo) 
                VALUES (:id_usuario, :puntos, :diamantes, :tiempo) 
                RETURNING idpuntos";
        
        // Array asociativo con los valores, incluyendo el id_usuario de la sesión
        $valores = [
            ':puntos' => $total_puntos,
            ':diamantes' => $total_diamantes,
            ':tiempo' => $total_tiempo,
            ':id_usuario' => $_SESSION['id_usuario']
        ];
        
        // Ejecutar la inserción
        $resultado = $conexion->ejecutarInsert($sql, $valores);
        
        if ($resultado) {
            // Limpiar datos de sesión de archivos (manteniendo la sesión del usuario)
            unset($_SESSION['datos_archivos']);
            
            echo json_encode([
                'success' => true,
                'mensaje' => 'Datos guardados correctamente',
                'idpuntos' => $resultado['idpuntos'],
                'totales' => [
                    'puntos' => $total_puntos,
                    'diamantes' => $total_diamantes,
                    'tiempo' => $total_tiempo,
                    'id_usuario' => $_SESSION['id_usuario']
                ]
            ]);
        } else {
            echo json_encode(['error' => 'Error al guardar los datos']);
        }
        
    } catch (Exception $e) {
        echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
    }
    
} else {
    // Todavía no tenemos todos los datos
    echo json_encode([
        'success' => true,
        'mensaje' => 'Datos recibidos',
        'archivos_pendientes' => 3 - count($_SESSION['datos_archivos'])
    ]);
}
