<?php
class datosUsuario {
    private $nombreUsuario;
    private $clave;
    public function __construct($nombreUsuario,$clave){
        $this->nombreUsuario = $nombreUsuario;
        $this->clave = $clave;
    }
    public function setNombreUsuario(){
        $this->nombreUsuario;
    }
    public function getNombreUsuario(){
        return $this->nombreUsuario;
    }
    public function setClave(){
        $this->clave;
    }
    public function getClave(){
        return $this->clave;
    }
}