<?php


class Sala{
    private $nombreSala;
    private $capacidad;
    private $codigoSala;

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
     public function setcodigoSalaCapacidad($codigoSala){
        $this->codigoSala = $codigoSala;
    }
    public function getcodigoSala(){
        return $this->codigoSala;
    }
}

