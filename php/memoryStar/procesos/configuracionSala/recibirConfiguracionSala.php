<?php
include('configuracionSala.php');

$data = json_decode(file_get_contents('php://input'), true);

$capacidadSala = $data['capacidad'];
$nombreSala = $data['nombreSala'];
$codigoSala = $data['codigoSala'];

$configuracion = new Crear();
$configuracion->setNombreSala($nombreSala);
$configuracion->setCapacidad($capacidadSala);
$configuracion->setcodigoSala($codigoSala);

header('Content-Type: application/json');
$configuracion->crear();
