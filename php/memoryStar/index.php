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
                <!-- <div class="col-12 row">
                    <div class="col-3"></div>
                    <div class="col-5">
                    <img src="img/iconos/segundoMemory.png" alt="logoMemory" class="segundoInicio">
                        <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
                        <div class="contenedorOpciones">
                            <img src="img/iconos/botonSecuencia.png" class="oJuegos zoom" alt="Imagen 1" id="juegoSecuencia">
                            <img src="img/iconos/botonCarta.png" class="oJuegos zoom" alt="Imagen 2" id="juegoCartas">
                            <img src="img/iconos/botonAsociacion.png" class="oJuegos zoom" alt="Imagen 3" id="juegoAsociacion">
                        </div>
                        <h1 class="textoEleccion">Elige la temática</h1>
                        <div id="juegos" class="contenedorOpciones">
                            <img src="img/iconos/matematicas.png" alt="Imagen 1" class="oJuegos zoom" id="juegoMatematicas">
                            <img src="img/iconos/animales.png" alt="Imagen 2" class="oJuegos zoom" id="juegoAnimales">
                            <img src="img/iconos/comida.png" alt="Imagen 3" class="oJuegos zoom" id="juegoComida">
                            <img src="img/iconos/paises.png" alt="Imagen 4" class="oJuegos zoom" id="juegoPaises">
                            <img src="img/iconos/tecnologia.png" alt="Imagen 5" class="oJuegos zoom" id="juegoTecnologia">
                        </div>
                    </div>
                    <div class="col-3">
                        <h1 class="textoEleccion">Elige el nivel</h1>
                        <div class=" nivel">
                            <div><img src="img/iconos/facil.png" class="oJuegos zoom" alt="Imagen 1" id="nivelFacil"></div>
                            <div><img src="img/iconos/intermedio.png" class="oJuegos zoom" alt="Imagen 2" id="nivelMedio"></div>
                            <div><img src="img/iconos/dificil.png" class="oJuegos zoom" alt="Imagen 3" id="nivelDificil"></div>
                        </div>
                    </div>
                </div> -->
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
                <p>¡Hola! ¿En qué te puedo ayudar?</p>
                <a href="">Jugar con amigos</a><br>
                <a href=""  data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">¿Cómo jugar?</a><br>
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