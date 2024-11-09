<?php
class configuracionJuego {
    private $idJuego;   
    private $idTematica;
    private $idDificultad;
    private $idModo;
    public function setidJuego($idJuego){
        $this->idJuego = $idJuego;
    }
    public function getidJuego(){
        return $this->idJuego; 
    }
    public function setidTematica($idTematica){
        $this->idTematica = $idTematica;
    }
    public function getidTematica(){
        return $this->idTematica;
    }
    public function setidDificultad($idDificultad){
        $this->idDificultad = $idDificultad;
    }
    public function getidDificultad(){
        return $this->idDificultad;
    }

    public function setidModo($idModo){
        $this->idModo = $idModo;
    }
    public function getidModo(){
       return  $this->idModo;
    }
}