<?php
include ('tematicaOrdenar.php');

header('Content-Type: application/json');

$tipoJuego = new tematicaOrdenar();
$resultados = $tipoJuego->obtenerDatosJuego();

echo json_encode($resultados, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES); 