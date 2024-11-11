<?php 

include('llenarPerfil.php');

// Recibir y decodificar los datos JSON del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

$nombrePersona = $data['nombrePersona'];
$apellidoPersona = $data['apellidoPersona'];
$numeroPersona = $data['numeroPersona'];

$configuracion = new LlenarPerfil();
$configuracion->setNombre($nombrePersona);
$configuracion->setApellido($apellidoPersona);
$configuracion->setNumero($numeroPersona);

// Actualizar y obtener los datos actualizados
$resultado = $configuracion->llenarPerfil();

header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'message' => 'Configuración aplicada correctamente',
    'data' => $resultado // Enviar los datos actualizados como JSON
]);
     