<?php
include('claseJuegos.php'); // Incluye la clase TipoJuego

// Establecer el tipo de contenido a JSON
header('Content-Type: application/json');

// Crea una instancia de la clase TipoJuego
$tipoJuego = new TipoJuego();

// Llama al método para obtener los tipos de juego
$resultados = $tipoJuego->obtenerTiposJuego();

// Devuelve los resultados como JSON
echo json_encode($resultados, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
?>
