<?php 

include('../../procesos/conexion/conexion.php');
include('configuracion.php');

class realizarConfiguracion extends configuracionJuego {

    private $sqlInsert;


    public function configurar(){
        $conexion = new conexion();
        $this->sqlInsert = "INSERT INTO configuracionJuego(id_tematica, id_dificultad,  id_tipo_juego, id_modo_juego) 
        VALUES (:tematica, :dificultad, :tipoJuego, :idModo);";


        $valores = [
        ':tipoJuego' => $this->getidJuego(),
        ':tematica' => $this->getidTematica(),
        ':dificultad' => $this->getidDificultad(),
        ':idModo' => $this->getidModo()
        ];

        $conexion->ejecutar($this->sqlInsert, $valores);
    }
};