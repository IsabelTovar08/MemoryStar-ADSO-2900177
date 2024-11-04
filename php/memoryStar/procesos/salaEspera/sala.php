<?php
class Sala{
    private $nombreSala;
    private $capacidad;

    public function setNombreSala($nombreSala){
        $this->nombreSala = $nombreSala;
    }
    public function getNombreSala(){
        return $this->nombreSala;
    }
    public function setCapacidad($capacidad){
        $this->capacidad = $capacidad;
    }
    public function getCapacidad(){
        return $this->capacidad;
    }
}

