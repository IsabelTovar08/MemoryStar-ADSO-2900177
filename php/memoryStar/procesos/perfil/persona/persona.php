<?php

class persona {
    private $nombre;
    private $apelldio;
    private $numeroTelefono;

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }
    public function getNombre(){
       return $this->nombre;
    }
    public function  setApellido($apelldio){
        $this->apelldio = $apelldio;
    }
    public function  getApellido(){
        return $this->apelldio;
    }
    public function  setNumero($numeroTelefono){
        $this->numeroTelefono = $numeroTelefono;
    }
    public function  getNumero(){
        return $this->numeroTelefono;
    }

    
}