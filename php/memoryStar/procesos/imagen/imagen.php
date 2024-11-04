<?php
// Verificar si se ha subido la imagen desde el formulario o usar una ruta de imagen fija
if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] == 0) {
    $datos = file_get_contents($_FILES['imagen']['tmp_name']); // Obtener contenido binario
    $nombre = 'Bookify';
} else {
    // Ruta a la imagen "Bookify.jpg" en el servidor
    $rutaImagen = '/ruta/del/servidor/Bookify.jpg';
    if (file_exists($rutaImagen)) {
        $datos = file_get_contents($rutaImagen);
        $nombre = 'Bookify';
    } else {
        die("No se encontró la imagen 'Bookify'.");
    }
}

// Conectar a PostgreSQL
try {
    $conexion = new PDO("pgsql:host=localhost;dbname=corredor", "postgres", "123456");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Actualizar solo el campo 'imagen' en el registro con id_tipo_juego = 1
    $sql = "UPDATE tematicaJuego SET imagen = :datos WHERE id_tematica = 6";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':datos', $datos, PDO::PARAM_LOB);

    if ($stmt->execute()) {
        echo "Imagen 'Bookify' guardada correctamente en el registro con id_tipo_juego = 1.";
    } else {
        echo "Error al guardar la imagen.";
    }
} catch (PDOException $e) {
    echo "Error en la conexión o en la consulta: " . $e->getMessage();
}
?>
