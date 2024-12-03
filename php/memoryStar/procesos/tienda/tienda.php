<?php
include ('../conexion/conexion.php');
$tiendaData = new conexion();
try {
    $stmt =$tiendaData->conectar()->query("SELECT id_tienda, url_producto, precio_producto, disponible FROM tienda");
    
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($productos);
} catch (PDOException $e) {
    // Si hay algún error con la consulta, lo mostramos
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
