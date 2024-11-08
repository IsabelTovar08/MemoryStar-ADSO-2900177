<?php
include('../../../../procesos/conexion/conexion.php');

class tematicaOrdenar {
    private $conexion;

    public function __construct() {
        $this->conexion = new conexion();
    }

    public function obtenerDatosJuego() {
        try {
            $response = [
                'tematicas' => [],
                'dificultades' => []
            ];

            // Consulta y procesa temáticas
            $sqlTematicas = "SELECT * FROM tematicaJuego WHERE id_tematica IN (3, 4, 5, 6)";
            $stmtTematicas = $this->conexion->conectar()->prepare($sqlTematicas);
            $stmtTematicas->execute();
            $tematicas = $stmtTematicas->fetchAll(PDO::FETCH_ASSOC);
            
            // Procesar imágenes de las temáticas
            foreach ($tematicas as $tematica) {
                if (isset($tematica['imagen']) && $tematica['imagen'] !== null) {
                    $datos_imagen = stream_get_contents($tematica['imagen']);
                    $imagenBase64 = base64_encode($datos_imagen);
                    $tematica['imagen'] = 'data:image/png;base64,' . $imagenBase64;
                } else {
                    $tematica['imagen'] = null;
                    $tematica['error'] = 'No se encontró la imagen.';
                }
                $response['tematicas'][] = $tematica;
            }

            // Consulta y procesa dificultades
            $sqlDificultades = "SELECT * FROM dificultad";
            $stmtDificultades = $this->conexion->conectar()->prepare($sqlDificultades);
            $stmtDificultades->execute();
            $dificultades = $stmtDificultades->fetchAll(PDO::FETCH_ASSOC);

            // Procesar imágenes de las dificultades
            foreach ($dificultades as $dificultad) {
                if (isset($dificultad['imagen']) && $dificultad['imagen'] !== null) {
                    $datos_imagen = stream_get_contents($dificultad['imagen']);
                    $imagenBase64 = base64_encode($datos_imagen);
                    $dificultad['imagen'] = 'data:image/png;base64,' . $imagenBase64;
                } else {
                    $dificultad['imagen'] = null;
                    $dificultad['error'] = 'No se encontró la imagen.';
                }
                $response['dificultades'][] = $dificultad;
            }

            return $response;

        } catch(PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}