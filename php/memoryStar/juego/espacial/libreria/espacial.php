<?php
// Clase para manejar los datos del juego
class GameData {
    public $diamantes;
    public $puntuacion;
    public $tiempo;

    public function __construct($diamantes, $puntuacion, $tiempo) {
        $this->diamantes = $diamantes;
        $this->puntuacion = $puntuacion;
        $this->tiempo = $tiempo;
    }

    // Método para guardar los datos en un archivo o base de datos
    public function guardar() {
        // Aquí puedes implementar la lógica para guardar los datos, 
        // como guardarlos en un archivo o en una base de datos
        // Por ejemplo, guardarlos en un archivo JSON
        $data = [
            'diamantes' => $this->diamantes,
            'puntuacion' => $this->puntuacion,
            'tiempo' => $this->tiempo,
        ];
        
        
        file_put_contents('datosJuego.json', json_encode($data));
        
    }
}

// Obtener los datos JSON enviados por JavaScript
$datosJSON = file_get_contents('php://input');
echo $datosJSON;
$datos = json_decode($datosJSON, true);

// Crear una instancia de GameData y guardar los datos
if ($datos) {
    $gameData = new GameData($datos['diamantes'], $datos['puntuacion'], $datos['tiempo']);
    $gameData->guardar();

    // Responder con éxito
    echo json_encode(['status' => 'success', 'message' => 'Datos guardados cddddorrectamente']);
} else {
    // Responder con error
    echo json_encode(['status' => 'error', 'message' => 'No se recibiedddron datos']);
}

