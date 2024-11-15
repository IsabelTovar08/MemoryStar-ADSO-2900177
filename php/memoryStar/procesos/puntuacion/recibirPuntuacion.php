<?php
session_start();

require 'registropuntuacion.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Verifica si se recibieron datos
if ($data) {
    $puntajeTotal = $data['puntajeTotal'];
    $tiempoPromedio = $data['tiempoPromedio'];
    $totalRubis = $data['totalRubis'];

    $usuarioId = isset($_SESSION['id_usuario']) ? $_SESSION['id_usuario'] : null;



    $registrar = new Registropuntuacion();
    $registrar->setpuntos($puntajeTotal);
    $registrar->settiempo($tiempoPromedio); 
    $registrar->setdiamantes($totalRubis);
    $registrar->setusuario($usuarioId);
    $registrar->registrarpuntos();
    
    // Guarda los valores en variables si necesitas procesarlos
    
    // Responde con un único JSON que incluye todos los datos
    echo json_encode([
        'success' => true,
        'mensaje' => 'Datos recibidos correctamente',
        'datos' => [
            'puntajeTotal' => $puntajeTotal,
            'tiempoPromedio' => $tiempoPromedio,
            'totalRubis' => $totalRubis,
            'usuairo' => $usuarioId
        ]
    ]);
} else {
    // En caso de error, envía una respuesta de error
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'mensaje' => 'No se recibieron datos válidos'
    ]);
}