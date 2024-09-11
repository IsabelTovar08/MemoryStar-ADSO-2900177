<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/animacion.css">
    <!-- <link rel="stylesheet" href="css/estilosPerfil.css"> -->
    <title>MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
</head>

<body>

 
    





    <div class="container-fuid">
        <?php include('nabar.php'); ?>

            <div class="animacion"   id ="loader" >
                 <span class="loader"></span>
            </div>






        <div id="contenedor">
<<<<<<< HEAD
<!-- <div onclick="history.back()">atras</div> -->
=======


           




>>>>>>> 2e65ab524baf60044c6e4ff90d84808ef99132a6
            <div id="contenido">

                <img src="img/iconos/nuevoMemory.png" alt="logoMemory" class="logoInicio">
                <div id="jugar">
                    <img src="img/iconos/clic.png" alt="" width="50" class="centrar" id="centrar1">
                    <img src="img/iconos/clic2.png" alt="" width="50" class="centrar" id="centrar2">
                    <img src="img/iconos/play.png" alt="" class="play zoom" id="play">
                </div>
            </div>
            <div class="robot">
                <div class="speech-bubble mensaje">
                    <button type="button" class="btn-close cerrarMensaje"></button>
                    <p>¡Hola! ¿En qué te puedo ayudar?</p>
                    <a href="">Jugar con amigos</a><br>
                    <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">¿Cómo jugar?</a><br>
                    <a href="login.php">Iniciar Sesión</a>
                </div>
                <img src="img/iconos/robotM.png" alt="" class="mostrarMensaje" id="imagen">
                <img src="img/iconos/muñequitoAbajo.png" alt="" class=" " id="">
            </div>

        </div>
        <?php include('audios.php') ?>
        <script src="js/overlayModal.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/perfil.js"></script>
        <script src="js/play.js"></script>
        <script src="js/login.js"></script>
        <script src="js/mapa.js"></script>
        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
        <script src="js/animacion.js"></script>
</body>

</html>