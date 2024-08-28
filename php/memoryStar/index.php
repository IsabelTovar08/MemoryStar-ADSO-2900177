<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <!-- <link rel="stylesheet" href="css/estilosPerfil.css"> -->
    <title>MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
</head>

<body>
    <div class="container-xxl">
        <?php include('nabar.php'); ?>
        <div id="contenido">
            <img src="img/iconos/nuevoMemory.png" alt="logoMemory" height="400" class="logoInicio">
        </div>
        <!-- <div class="" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off">
            <label class="btn-outline-success" for="btnradio1"> <img src="img/iconos/jugarSolo.png" alt=""></label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
            <label class="btn-outline-success" for="btnradio2"> <img src="img/iconos/jugarSolo.png" alt=""></label>


            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
            <label class="btn-outline-success" for="btnradio3"> <img src="img/iconos/jugarSolo.png" alt=""></label>
        </div> -->
        <div id="jugar">
            <img src="img/iconos/clic.png" alt="" width="50" class="centrar" id="centrar1">
            <img src="img/iconos/clic2.png" alt="" width="50" class="centrar" id="centrar2">
            <img src="img/iconos/play.png" alt="" class="play zoom" id="play">

            <!-- <button type="button" class="btn btn-primary position-relative">
  Profile
  <span class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
  </span>
</button> -->
        </div>


        <div class="robot">
            <div class="speech-bubble mensaje">
                <button type="button" class="btn-close cerrarMensaje"></button>
                <p>¡Hola! ¿En qué te puedo ayudar?.</p>
                <a href="">Jugar con amigos</a><br>
                <a href="">¿Cómo jugar?</a><br>
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
</body>

</html>