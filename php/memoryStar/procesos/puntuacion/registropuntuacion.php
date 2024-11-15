<?php
require '../conexion/conexion.php';
require 'puntuacion.php';

class Registropuntuacion extends puntos {
    private $sqlinsert;
    private $sqlupdate;

    public function registrarpuntos(){
        $conexion = new conexion;
        
        // Insertamos en la tabla puntos
        $this->sqlinsert = "INSERT INTO puntos (usuario_id, puntos, diamantes, tiempo) 
            VALUES(:usuariop, :puntosp, :diamantesp, :tiempop)";
        
        $valores = [
            ':usuariop' => $this->getusuario(),
            ':puntosp' => $this->getpuntos(),
            ':diamantesp' => $this->getdiamantes(),
            ':tiempop' => $this->gettiempo()
        ];
        
        $conexion->ejecutarInsert($this->sqlinsert, $valores);
        
        // Actualizamos la tabla usuario
        $this->sqlupdate = "UPDATE usuario 
            SET puntosacumulados = puntosacumulados + :puntos,
                diamantes = diamantes + :diamantes
            WHERE id_usuario = :usuario_id 
            RETURNING *";
        
        $valoresUpdate = [
            ':puntos' => $this->getpuntos(),
            ':diamantes' => $this->getdiamantes(),
            ':usuario_id' => $this->getusuario()
        ];
        
        return $conexion->ejecutarInsert($this->sqlupdate, $valoresUpdate);
    }
}