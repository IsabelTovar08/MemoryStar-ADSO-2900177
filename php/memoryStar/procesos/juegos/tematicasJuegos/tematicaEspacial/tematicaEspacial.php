
<?php
include('../../../../procesos/conexion/conexion.php');

class tematicaEspacial {
    private $conexion;

    public function __construct() {
     
        $this->conexion = new conexion();
    }

    public function obtenertematicaEspacial() {
        $sql = "SELECT * FROM tematicaJuego WHERE id_tematica = 1 OR id_tematica = 2";
        $resultados = $this->conexion->login($sql, []); 

        $tematicaEspacial = [];

        foreach ($resultados as $row) {
            if (isset($row['imagen'])) {  
                $datos_imagen = stream_get_contents($row['imagen']);
                $imagenBase64 = base64_encode($datos_imagen);
                
                $tematicaEspacial[] = [
                    'id_tematica' => $row['id_tematica'],
                    'nombre_tematica' => htmlspecialchars($row['nombre_tematica']),
                    'imagen' => 'data:image/png;base64,' . $imagenBase64
                ];
            } else {
                $tematicaEspacial[] = [
                    'id_tematica' => $row['id_tematica'],
                    'nombre_tematica' => htmlspecialchars($row['nombre_tematica']),
                    'imagen' => null,
                    'error' => 'No se encontró la imagen.'
                ];
            }
        }

        return $tematicaEspacial;
    }
}
