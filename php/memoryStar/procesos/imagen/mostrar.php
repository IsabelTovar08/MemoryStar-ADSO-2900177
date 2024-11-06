<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$id = 1;

try {
    $conexion = new PDO("pgsql:host=localhost;dbname=corredor", "postgres", "123456");
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Primero verificamos si la conexión funciona
    echo "Conexión exitosa<br>";
    
    $sql = "SELECT imagen FROM tipoJuego WHERE id_tipo_juego = :id";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Verificamos si tenemos datos
    var_dump($row);
    
    if ($row && !empty($row['imagen'])) {
        // Verificamos el tamaño de los datos
        echo "Tamaño de la imagen: " . strlen($row['imagen']) . " bytes<br>";
        
        // Intentamos mostrar los primeros bytes para ver qué tipo de datos tenemos
        echo "Primeros bytes: " . bin2hex(substr($row['imagen'], 0, 10)) . "<br>";
        
        header("Content-Type: image/gif");
        echo $row['imagen'];
    } else {
        echo "No se encontraron datos de imagen";
    }
    
} catch (PDOException $e) {
    echo "Error en la conexión o en la consulta: " . $e->getMessage();
}
?>