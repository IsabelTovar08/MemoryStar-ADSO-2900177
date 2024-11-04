<?php 
class Usuario{
    private $nombreUsuario;
     private $emailUsuario;
    private $clave;

    public function setNombreUsuario($nombreUsuario){
        $this->nombreUsuario=$nombreUsuario;
    }
    public function getNombreUsuario(){
        return $this->nombreUsuario;
    }
    public function setEmailUsuario($emailUsuario){
        $this->emailUsuario=$emailUsuario;
    }
    public function getEmailUsuario(){
        return $this->emailUsuario;
    }
    public function setclave($clave){
        $this->clave=$clave;
    }
    public function getclave(){
        return $this->clave;
    }
}