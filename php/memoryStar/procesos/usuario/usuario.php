<?php 
class Usuario {
    private $nombreUsuario;
    private $emailUsuario;
    private $clave;

    public function setNombreUsuario($nombreUsuario) {
        $this->nombreUsuario = $nombreUsuario;
    }

    public function getNombreUsuario() {
        return $this->nombreUsuario;
    }

    public function setEmailUsuario($emailUsuario) {
        $this->emailUsuario = $emailUsuario;
    }

    public function getEmailUsuario() {
        return $this->emailUsuario;
    }

    // Modifica el setter de clave para encriptarla automáticamente
    public function setClave($clave) {
        // Encripta la clave usando password_hash antes de almacenarla
        $this->clave = password_hash($clave, PASSWORD_DEFAULT);
    }

    public function getClave() {
        return $this->clave;
    }
}
