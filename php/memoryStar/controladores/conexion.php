<?php

$conexion = new mysqli("localhost", "root", "", "juego", "3306");
$conexion->set_charset("utf8");

// Verificar si la conexión fue exitosa
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
} else {
    
}

?>
