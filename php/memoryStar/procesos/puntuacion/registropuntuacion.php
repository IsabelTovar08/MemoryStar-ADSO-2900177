<?php
require '../conexion/conexion.php';
require 'puntuacion.php';

class Registropuntuacion extends puntos {
    private $sqlinsert;
    private $sqlupdate;
    
    public function registrarpuntos() {
        $conexion = new conexion;
        
        // Primero obtenemos el total de puntos actual del usuario
        $sqlTotal = "SELECT puntosacumulados FROM usuario WHERE id_usuario = :usuario_id";
        $stmtTotal = $conexion->conectar()->prepare($sqlTotal);
        $stmtTotal->execute([':usuario_id' => $this->getusuario()]);
        $puntosActuales = $stmtTotal->fetch(PDO::FETCH_ASSOC)['puntosacumulados'];
        
        // Sumamos los puntos nuevos al total
        $puntosTotal = $puntosActuales + $this->getpuntos();
        
        // Calculamos el nivel basado en el total
        $nivel = 0;
        if ($puntosTotal > 10000) {
            $nivel = 5;
        } elseif ($puntosTotal > 7000) {
            $nivel = 4;
        } elseif ($puntosTotal > 5000) {
            $nivel = 3;
        } elseif ($puntosTotal > 3000) {
            $nivel = 2;
        } elseif ($puntosTotal > 1000) {
            $nivel = 1;
        }
        
        // Insertamos en puntos
        $this->sqlinsert = "INSERT INTO puntos (usuario_id, puntos, diamantes, tiempo) 
            VALUES(:usuariop, :puntosp, :diamantesp, :tiempop)";
        
        $valores = [
            ':usuariop' => $this->getusuario(),
            ':puntosp' => $this->getpuntos(),
            ':diamantesp' => $this->getdiamantes(),
            ':tiempop' => $this->gettiempo()
        ];
        
        $conexion->ejecutarInsert($this->sqlinsert, $valores);
        
        // Actualizamos usuario con el nuevo total y nivel
        $this->sqlupdate = "UPDATE usuario 
            SET puntosacumulados = :total_puntos,
                diamantes = diamantes + :diamantes,
                nivel = :nivelp
            WHERE id_usuario = :usuario_id
            RETURNING *";
        
        $valoresUpdate = [
            ':total_puntos' => $puntosTotal,
            ':diamantes' => $this->getdiamantes(),
            ':usuario_id' => $this->getusuario(),
            ':nivelp' => $nivel
        ];
        
        return $conexion->ejecutarInsert($this->sqlupdate, $valoresUpdate);
    }
}