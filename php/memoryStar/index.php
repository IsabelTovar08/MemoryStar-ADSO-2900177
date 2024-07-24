<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosPerfil.css">
    <title>MemoryStart ¡Pon a prueba tu memoria!</title>
</head>
<body>
    <div class="container-xxl">
        <?php include('nabar.php'); ?>
        <img src="img/iconos/bienvenido.png" alt="logoMemory" width="500" height="300" class="imagenInicio">
        <div class="col-12 row apartadoOpcionesJuego">
            <div class="col-4"></div>
            <div class="col-5">
            <a href="juego.php"><img src="img/iconos/jugarSolo.png" alt="Jugar solo" class="opcionesJuego zoom"></a>
                <img src="img/iconos/multijugador.png" alt="Multijugador" class="opcionesJuego zoom">
                <img src="img/iconos/modoVs.png" alt="Vs" class="opcionesJuego zoom">
            </div>
            <div class="col-3"></div>
        <!-- <a href="juego.php" class="btn boton-jugar efectosIconos zoom" onclick="return false">Jugar</a> -->
    </div>
    <?php include('audios.php') ?>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/perfil.js"></script>
</body>
</html>