<?php 

include('../../procesos/conexion/conexion.php');

class Redireccion {
    private $sqlInsert;

    public function redirigir() {
        $conexion = new conexion();
        

        $this->sqlInsert = "SELECT 
                                tipojuego.nombre_tipo_juego AS nombreJuego,
                                tematicajuego.nombre_tematica AS tematicaJuego,
                                dificultad.nombre_dificultad AS nombreDificultad,
                                modojuego.id_modo_juego AS modoJuego

                            FROM 
                                configuracionjuego
                            FULL JOIN 
                                tipojuego ON configuracionjuego.id_tipo_juego = tipojuego.id_tipo_juego
                            FULL JOIN 
                                tematicajuego ON configuracionjuego.id_tematica = tematicajuego.id_tematica
                            FULL JOIN 
                                dificultad ON configuracionjuego.id_dificultad = dificultad.id_dificultad
                            FULL JOIN
                                modojuego ON configuracionjuego.id_modo_juego = modojuego.id_modo_juego
                            ORDER BY 
                                configuracionjuego.id_configuracion_juego DESC
                            LIMIT 1;";
        
        // Ejecutamos la consulta
        $resultado = $conexion->login($this->sqlInsert, []);
        
        // Configuramos la cabecera para JSON
        header('Content-Type: application/json');
        
        // Verificamos si hay resultado y lo devolvemos como JSON
        if ($resultado) {
            echo json_encode($resultado[0]); // Envía el primer y único resultado como JSON
        } else {
            echo json_encode([]); // Envía un JSON vacío si no hay resultados
        }
    }
}

// Ejecución del método para enviar el JSON
$redireccion = new Redireccion();
$redireccion->redirigir();
