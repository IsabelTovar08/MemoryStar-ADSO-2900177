<?php

$inputJSON = file_get_contents('php://input');
$datos = json_decode($inputJSON, true);

if (isset($datos['juego'], $datos['tematica'], $datos['nivel'])) {
  
    $juego = (string) $datos['juego'];
    $tematica = (string) $datos['tematica'];
    $nivel = (string) $datos['nivel'];

    $urlRedireccion = $juego . $tematica . $nivel . ".html";

    echo json_encode([
        "success" => true,
        "redireccion" => $urlRedireccion,
    ]);
} else {
    // Si faltan datos, devolver un error
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos en la solicitud.",
    ]);
}
