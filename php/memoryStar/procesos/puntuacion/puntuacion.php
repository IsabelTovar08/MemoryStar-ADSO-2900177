<?php 


class puntos{
    private $idusuario;
    private $puntos;
    private $diamantes;
    private $tiempo;

    public function setusuario($idusuario){
        $this->idusuario = $idusuario;
    }
    public function getusuario(){
       return $this->idusuario;
    }

    public function setpuntos($puntos){
        $this->puntos = $puntos;
    }
    public function getpuntos(){
       return $this->puntos;
    }

    public function setdiamantes($diamantes){
        $this->diamantes = $diamantes;
    }
    public function getdiamantes(){
       return $this->diamantes;
    }
    public function settiempo($tiempo){
        $this->tiempo = $tiempo;
    }
    public function gettiempo(){
       return $this->tiempo;
    }
}