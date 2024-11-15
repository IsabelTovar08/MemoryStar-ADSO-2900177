<?php
// Archivo de almacenamiento de datos
$archivo = 'datos.json';

// Verificar si es una solicitud POST para acumular datos
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos enviados desde el cuerpo de la solicitud
    $entrada = json_decode(file_get_contents('php://input'), true);

    // Leer datos actuales del archivo
    $datos = file_exists($archivo) ? json_decode(file_get_contents($archivo), true) : ['puntos' => 0, 'diamantes' => 0, 'tiempo' => 0];

    // Acumular los datos recibidos
    $datos['puntos'] += $entrada['puntos'];
    $datos['diamantes'] += $entrada['diamantes'];
    $datos['tiempo'] += $entrada['tiempo'];

    // Guardar datos actualizados en el archivo JSON
    file_put_contents($archivo, json_encode($datos));

    echo json_encode(['mensaje' => 'Datos acumulados correctamente']);
    exit;
}

// Si es una solicitud GET, devolver la suma acumulada
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $datos = file_exists($archivo) ? json_decode(file_get_contents($archivo), true) : ['puntos' => 0, 'diamantes' => 0, 'tiempo' => 0];
    echo json_encode($datos);
    exit;
}

// Si es una solicitud DELETE, limpiar el archivo de datos
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    file_put_contents($archivo, json_encode(['puntos' => 0, 'diamantes' => 0, 'tiempo' => 0]));
    echo json_encode(['mensaje' => 'Datos limpiados correctamente']);
    exit;
}
?>
