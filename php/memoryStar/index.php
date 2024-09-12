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
    <!-- <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  /> -->
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
    </style>
</head>

<body>
    <!-- Modal -->
    <div class="modal fade" id="modalInicio" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content fondo">
                <div class="modal-body container-fluid">
                    <div class="contenInicio" id="">
                        <img id="" src="img/iconos/nuevoMemory.png" alt="Ejemplo de Imagen" class="logo imagen">
                        <div class="tarjeta">
                            <h1>¡Bienvenido a <br>
                                MemoryStar!</h1>
                            <h5> Para tener una mejor experiencia de juego, inicia sesión o regístrate, ¡Es gratis!</h5>
                            <div class="botones">
                                <a href="login.php"><button class="btn btn-primary">Iniciar Sesión</button></a>
                                <a href=""><button class="btn btn-primary">Registrarse</button></a>
                            </div>
                            <a href="index.php" data-bs-dismiss="modal">Continuar como invitado</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fuid">
        <?php include('nabar.php'); ?>

            <div class="animacion"   id ="loader" >
                 <span class="loader"></span>
            </div>






        <div id="contenedor">
            <!-- <div onclick="history.back()">atras</div> -->
            <div id="contenido">
                <img src="img/iconos/nuevoMemory.png" alt="logoMemory" class="logoInicio">
                <div id="jugar">
                    <img src="img/iconos/clic.png" alt="" width="50" class="centrar" id="centrar1">
                    <img src="img/iconos/clic2.png" alt="" width="50" class="centrar" id="centrar2">
                    <a href="animacionConf.php"><img src="img/iconos/play.png" alt="" class="play zoom" id="play"></a>
                </div>
            </div>
            <div class="robot">
                <div class="mensaje">
                    <button type="button" class="btn-close cerrarMensaje"></button>
                    <p>¡Hola! ¿En qué te puedo ayudar?</p>
                    <a href="">Jugar con amigos</a><br>
                    <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">¿Cómo jugar?</a><br>
                    <a href="login.php">Iniciar Sesión</a>
                </div>
                <img src="img/iconos/robotM.png" alt="" class="mostrarMensaje imagen">
                <img src="img/iconos/muñequitoAbajo.png" alt="" class=" " id="">
            </div>

        </div>
        <?php include('audios.php') ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>

        <script src="js/movimiento.js"></script>
        <script src="js/overlayModal.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/perfil.js"></script>
        <script src="js/mapa.js"></script>
        <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
        <script src="js/animacion.js"></script>
</body>

</html>