<?php 

require '../conexion/conexion.php';

try {
    // Instanciar la clase de conexión
    $conexion = new conexion();
    $conn = $conexion->conectar();

    if (!$conn) {
        echo json_encode([
            'success' => false,
            'message' => 'No se pudo conectar a la base de datos.'
        ]);
        exit;
    }

    // Crear la consulta para obtener el último registro
    $query = "SELECT puntos, diamantes, tiempo FROM puntos ORDER BY idpuntos DESC LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    // Obtener los resultados
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Devolver los datos en formato JSON
        echo json_encode([
            'success' => true,
            'data' => $result
        ]);
    } else {
        // Si no hay registros, devolver un mensaje apropiado
        echo json_encode([
            'success' => false,
            'message' => 'No se encontraron registros en la tabla puntos.'
        ]);
    }
} catch (PDOException $e) {
    // Manejar errores de la base de datos
    echo json_encode([
        'success' => false,
        'message' => 'Error al consultar la base de datos: ' . $e->getMessage()
    ]);
}
?>
