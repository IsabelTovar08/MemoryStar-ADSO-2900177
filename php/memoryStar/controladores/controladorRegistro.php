<?php

include('conexion.php');
if (!empty($_POST["registro"])) {
    if (empty($_POST["nombre"]) or empty($_POST["apellido"]) or empty($_POST["email"]) or empty($_POST["usuario"]) or empty($_POST["contraseña"])) {
        echo 'uno de los campos está vacio ';
    } else {
       $nombre=$_POST["nombre"];
       $apellido=$_POST["apellido"];
       $email=$_POST["email"];
       $usuario=$_POST["usuario"];
       $contraseña=$_POST["contraseña"];

       $sql=$conexion->query(" INSERT INTO jugador(nombre,apellido,email,usuario,contraseña)values('$nombre', '$apellido','$email','$usuario','$contraseña') ");
       if ($sql==1) {
        echo "<script>alert('usuario registrado con exito');</script>";
       } else {
        echo "<script>alert('usuario no registrado ');</script>";
       }
       
    }
    
}
?>