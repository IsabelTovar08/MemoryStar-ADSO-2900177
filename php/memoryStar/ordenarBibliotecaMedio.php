<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estiloLibros.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/estiloTienda.css">
    <link rel="stylesheet" href="css/estiloTablaPuntuacion.css">
    <link rel="stylesheet" href="css/estiloSeguirJugando.css">
    <!-- <link rel="stylesheet" href="css/estilosPerfil.css"> -->
    <title>MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    </style>
</head>

<body style="background-image: url('img/secuLibro/fondoLibro.png');">
    <div class="container-fuid">

     <!-- modal -->
     <div class="modal fade" id="tablapuntuacionsolo" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content contenedorTsolo">
                <div class="tituloTsolo">Puntuación</div>
                <div class="contenedorTsoloInterior">
                    <div class="contenedor-estrellas">
                        <img src="img/tablas/Star.png" class="star" alt="">
                        <img src="img/tablas/Star.png" class="star" alt="">
                        <img src="img/tablas/Star.png" class="star" alt="">
                    </div>

                    <div id="puntosSecu1" class="puntaje-total">
                        0
                    </div>

                    <div class="contenedor-puntaje">

                        <div id="rubis">+0</div><img src="img/tablas/rubipuntaje.png" alt="" class="rubi-puntaje">
                    </div>

                    <div class="col-10 row contenedor-info">
                        <div class="col-6"><img src="..//img/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3" id="tiempo1">0</div>
                        <div class="col-3" id="puntosSecu2">0</div>
                    </div>

                </div>

                <div class="contenedor-botonTsolo">
                    <!-- <button class="botonTsolo">Jugar de nuevo</button> -->
                    <button class="botonTsolo" style="margin-left: 20px;" data-bs-dismiss="modal"
                        aria-label="Close">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- juego -->

        <div id="contenedor">
        <h1 class="textoArrastrar">Pon los objetos en su lugar</h1>
            <div class="contenedor-secu">
                
                <button id="verificarBtn">Verificar</button>
                <div class="tiempo" id="temp">TIEMPO: 0s</div>
                <!-- <div class="puntos" id="score">
                PUNTOS:
                </div> -->
                <div class="countdown-container">
                    <div class="countdown-bar" id="countdown-bar"></div>
                    <div class="countdown-text" id="countdown-text">10</div>
                </div>

                <div id="contenedor-secuInt">
                    <div class="contenedor-estante">
                        <img src="img/SecuLibro/estanteria.png" class="estanteImg">
                        <div class="contenedor-libros" id="lista">
                            <img src="img/secuLibro/librito1.png" alt="" class="libro" data-id="1">
                            <img src="img/secuLibro/librito2.png" alt="" class="libro" data-id="2">
                            <img src="img/secuLibro/librito3.png" alt="" class="libro" data-id="3">
                            <img src="img/secuLibro/librito4.png" alt="" class="libro" data-id="4">
                            <img src="img/secuLibro/librito5.png" alt="" class="libro" data-id="5">
                            <!-- <img src="img/secuLibro/librito6.png" alt="" class="libro" data-id="6"> 
                        <img src="img/secuLibro/librito7.png" alt="" class="libro" data-id="7"> 
                        <img src="img/secuLibro/librito8.png" alt="" class="libro" data-id="8"> 
                        <img src="img/secuLibro/librito9.png" alt="" class="libro" data-id="9">   -->

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <?php include('audios.php') ?>
    <script src="js/Sortable.min.js"></script>

    <script src="js/libros.js"></script>
    <script src="js/movimiento.js"></script>
    <script src="js/overlayModal.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/perfil.js"></script>
    <script src="js/mapa.js"></script>
    <script src="js/barra.js"></script>
    <script src="js/comprat.js"></script>
    <script src="js/fotosperfil.js"></script>


</body>

</html>