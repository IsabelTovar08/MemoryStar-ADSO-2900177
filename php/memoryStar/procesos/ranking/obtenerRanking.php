<?php
require '../conexion/conexion.php';

class ObtenerRanking
{
    private $sql;

    public function obtenerR(){
        $conexion = new conexion();

        // Definir la consulta
        $this->sql = "SELECT nombre_usuario, fechar_registro, diamantes, puntosacumulados, nivel FROM usuario ORDER BY puntosacumulados DESC";

        // Ejecutar la consulta y obtener los resultados
        $resultados = $conexion->consulta($this->sql, []);

        // Convertir el resultado en JSON
        if ($resultados) {
            // Devuelve los datos en formato JSON
            echo json_encode([
                "status" => "success",
                "data" => $resultados
            ]);
        } else {
            // En caso de no encontrar datos, devuelve un mensaje de error
            echo json_encode([
                "status" => "error",
                "message" => "No se encontraron datos."
            ]);
        }
    }
}

$ranking = new ObtenerRanking();
$ranking->obtenerR();