

<?php 

include('configuarcionSala.php');

$data = json_decode(file_get_contents('php://input'), true);

// Extraer los datos enviados desde el JavaScript
$capacidadSala = $data['capacidadSala'];
$nombreSala = $data['nombreSala'];
$codigoSala = $data['codigoSala'];


// Crear una instancia de la clase y configurar los valores
$configuracion = new Crear();
$configuracion->setNombreSala($idJuego);
$configuracion->setCapacidad($idTematica);
$configuracion->setcodigoSalaCapacidad($codigoSala);

// Ejecutar la configuración
$configuracion->crear();

// Enviar una respuesta al cliente en formato JSON
header('Content-Type: application/json');
echo json_encode([ 
    'status' => 'success',
    'message' => 'Configuración aplicada correctamente'
]);
     