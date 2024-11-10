<?php
include('../../conexion/conexion.php');

class TipoJuego {
    private $conexion;

    public function __construct() {
     
        $this->conexion = new conexion();
    }

    public function obtenerTiposJuego() {
        $sql = "SELECT * FROM tipoJuego";
        $resultados = $this->conexion->consulta($sql, []); 

        $tiposJuego = [];

        foreach ($resultados as $row) {
            if (isset($row['imagen'])) {  
                $datos_imagen = stream_get_contents($row['imagen']);
                $imagenBase64 = base64_encode($datos_imagen);
                
                $tiposJuego[] = [
                    'id_tipo_juego' => $row['id_tipo_juego'],
                    'nombre_tipo_juego' => htmlspecialchars($row['nombre_tipo_juego']),
                    'imagen' => 'data:image/gif;base64,' . $imagenBase64
                ];
            } else {
                $tiposJuego[] = [
                    'id_tipo_juego' => $row['id_tipo_juego'],
                    'nombre_tipo_juego' => htmlspecialchars($row['nombre_tipo_juego']),
                    'imagen' => null,
                    'error' => 'No se encontró la imagen.'
                ];
            }
        }

        return $tiposJuego;
    }
}
