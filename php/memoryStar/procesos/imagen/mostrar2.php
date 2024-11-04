<?php
try {
    $conexion = new PDO("pgsql:host=localhost;dbname=corredor", "postgres", "123456");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM tipoJuego";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    // Crear un array para almacenar los resultados
    $resultados = [];

    // Recorrer todas las filas devueltas
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (isset($row['imagen'])) {
            // Convertir el recurso a cadena usando stream_get_contents
            $datos_imagen = stream_get_contents($row['imagen']);

            // Codificar la imagen en Base64
            $imagenBase64 = base64_encode($datos_imagen);
            
            // Agregar la información al array
            $resultados[] = [
                'nombre_tipo_juego' => htmlspecialchars($row['nombre_tipo_juego']),
                'imagen' => 'data:image/gif;base64,' . $imagenBase64
            ];
        } else {
            // Agregar mensaje de error si no se encuentra la imagen
            $resultados[] = [
                'nombre_tipo_juego' => htmlspecialchars($row['nombre_tipo_juego']),
                'imagen' => null,
                'error' => 'No se encontró la imagen.'
            ];
        }
    }

    // Establecer el tipo de contenido a JSON
    header('Content-Type: application/json');
    // Convertir el array a JSON y mostrarlo
    echo json_encode($resultados, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    
} catch (PDOException $e) {
    // En caso de error, devolver un JSON con el mensaje de error
    echo json_encode(['error' => 'Error en la base de datos: ' . $e->getMessage()]);
} catch (Exception $e) {
    // En caso de error general, devolver un JSON con el mensaje de error
    echo json_encode(['error' => 'Error general: ' . $e->getMessage()]);
}
?>
