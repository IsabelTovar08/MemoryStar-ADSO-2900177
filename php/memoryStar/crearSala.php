<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/estiloTienda.css">
    <title>JUGAR MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link rel="stylesheet" href="css/ocultarOpciones.css">
</head>

<body style="background-image: url('img/fondos/rosa2.png');">
    <div class="container-fuid">
        <?php include('nabar.php'); ?>
        <div class="control" style="width:5px; bottom: 0; position: absolute;">
            <img src="img/fondos/controles.png" alt="" style="width:30vh;">
        </div> 
        <div id="contenedor">
            <div id="contenido" style="width: 80vw;">
            <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" class="atras"></a>
                <h1 class="game-title">Crear Sala</h1>
                <div class="col row">
                    <div class="col-4 sala">
                        <h1 class="textoEleccion">Elje tu avatar</h1>
                        <div id="carouselExampleIndicators" class="carousel slide carousel-container"
                            data-bs-interval="false">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner carousel-images">
                                <div class="carousel-item active">
                                    <img src="img/gif/esqueleto.gif" class="d-block w-100" alt="..." style="padding:5%">
                                    <input type="radio" id="img1" name="carousel" value="Imagen 1" checked>
                                </div>
                                <div class="carousel-item">
                                    <img src="img/gif/calabaza.gif" class="d-block w-100" alt="...">
                                    <input type="radio" id="img2" name="carousel" value="Imagen 2">
                                </div>
                                <div class="carousel-item">
                                    <img src="img/gif/hongo.gif" class="d-block w-100" alt="..." style="padding:19%;">
                                    <input type="radio" id="img3" name="carousel" value="Imagen 3">
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div class="button-container">
                            <div class="btn-accept"></div>
                        </div>
                        <div class="boton-avatar ">
                            <button class="btn" onclick="seleccionarImagen()">Seleccionar</button>
                        </div>
                        <!-- <div class="seleccion-resultado" id="resultado"></div> -->
                        <div class="tarjetas-container confiSala">
                            <div class="option capacidad">
                                <input type="number" min="1" max="25" oninput="validity.valid||(value='');">
                                <div class="romboide">
                                    <h6>Capacidad máxima</h6>
                                </div>
                            </div>
                        </div>
                        <div class="tarjetas-container confiSala">
                            <div class="option nombreSala">
                                <input type="text" pattern="[A-Za-z\s]+" maxlength="30"
                                    oninput="validity.valid||(value='');"
                                    title="Solo se permiten letras, máximo 30 caracteres">
                                <div class="romboide">
                                    <h6>Nombre de sala</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-7 sala" id="juegoSala">
                     

                    </div>
                </div>
            </div>
            <div class="modal fade" id="nave" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">¡Planetscape!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                            Busca parejas de cartas para recuperar las piezas de tu nave perdida; y en el modo Memorize &
                            Escape, memoriza el orden correcto para ensamblar un arma y derrotar al enemigo. ¡Explora
                            planetas, resuelve acertijos y encuentra tu camino de regreso a la Tierra!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="arma" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">¡Planetscape!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Memoriza el orden correcto para ensamblar un arma y derrotar al enemigo.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <?php include('audios.php') ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="js/movimiento.js"></script>
    <script src="js/overlayModal.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/movimiento.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/perfil.js"></script>
    <script src="js/mapa.js"></script>
    <script src="js/visivilidadIconos.js"></script>
</body>

</html>