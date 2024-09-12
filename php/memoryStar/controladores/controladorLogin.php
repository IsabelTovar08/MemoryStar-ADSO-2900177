<?php
session_start();
include('conexion.php');
if (!empty($_POST["btningresar"])) {
    if (empty($_POST["usuario"]) and empty($_POST["contraseña"])) {
        echo 'Por favor ingrese su correo y contraseña';
    } else {
        $usuario= $_POST["usuario"];
        $contraseña = $_POST["contraseña"]; 
        $sql=$conexion-> query(" select * from jugador where usuario='$usuario' and contraseña='$contraseña'");
        if ($datos=$sql->fetch_object()) {
            $_SESSION["id"]=$datos->id;
            $_SESSION["nombre"]=$datos->nombre;
            $_SESSION["usuario"]=$datos->usuario;
            
            header("location:pingpong.php");
        } else {
            echo "<script>alert('Usuario no existe ');</script>";
        }
        
    }
    
}


?>