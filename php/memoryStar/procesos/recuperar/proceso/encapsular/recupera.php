<?php
    class datosNuevaContrasena{
        private $correo;
        private $codigo;
        private $nuevaContrasena;
        private $usuario;

        public function setCodigo($codigo) {
            $this->codigo = $codigo;
        }
        public function getCodigo() {
            return $this->codigo;
        }
    
        public function setCorreo($correo) {
            $this->correo = $correo;
        }
        public function getCorreo() {
            return $this->correo;
        }
    
        public function setNuevaContrasena($nuevaContrasena) {
            $this->nuevaContrasena = $nuevaContrasena;
        }
        public function getNuevaContrasena() {
            return $this->nuevaContrasena;
        }

        // public function setUsuario($usuario) {
        //     $this->usuario = $usuario;
        // }
        // public function getUsuario() {
        //     return $this->usuario;
        // }
    }