<?php 

include('consultaConfiguracion.php');

$data = json_decode(file_get_contents('php://input'), true);

// Extraer los datos enviados desde el JavaScript
$idJuego = $data['idJuego'];
$idTematica = $data['idTematica'];
$idDificultad = $data['idDificultad'];

// Crear una instancia de la clase y configurar los valores
$configuracion = new realizarConfiguracion();
$configuracion->setidJuego($idJuego);
$configuracion->setidTematica($idTematica);
$configuracion->setidDificultad($idDificultad);

// Ejecutar la configuración
$configuracion->configurar();

// Enviar una respuesta al cliente en formato JSON
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'Configuración aplicada correctamente'
]);
     