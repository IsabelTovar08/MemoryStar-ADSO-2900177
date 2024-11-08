<?php
include ('tematicaEspacial.php');

header('Content-Type: application/json');


$tipoJuego = new tematicaEspacial();


$resultados = $tipoJuego->obtenertematicaEspacial();

echo json_encode($resultados, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

