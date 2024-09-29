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
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');

        body {
            background-image: url('img/fondos/fondoSala.jpeg');
        }
    </style>
</head>
<style>
    #contenido {
        background-color: #d4e8ff6b;
        width: 80vw;
        padding: 2%;
        border-radius: 10px;
    }

    .radio-tile {
        width: 6vw;
        height: auto;
    }

    .play {
        margin-left: 105%;
    }

    .textoEleccion {
        font-size: 2vh;
    }

    /* From Uiverse.io by andrew-demchenk0 */
    .container {
        --input-focus: #2d8cf0;
        --input-out-of-focus: #ccc;
        --bg-color: #fff;
        --bg-color-alt: #666;
        --main-color: #323232;
        position: relative;
        cursor: pointer;
        width: 3.3vh;
        padding: 0;
        display: flex;
        float: left;
    }

    label .container {
        margin-bottom: 100vh;

        padding: 0;
    }

    .container input {
        position: absolute;
        opacity: 0;
    }

    .checkmark {
        width: 3.3vh;
        height: 3.3vh;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        border: 2px solid var(--main-color);
        border-radius: 50%;
        box-shadow: 4px 4px var(--main-color);
        background-color: var(--input-out-of-focus);
        transition: all 0.3s;
    }

    .container input:checked~.checkmark {
        background-color: var(--input-focus);
    }

    .checkmark:after {
        content: "";
        width: 1vh;
        height: 2vh;
        position: absolute;
        top: 0.2vh;
        left: 1vh;
        display: none;
        border: solid var(--bg-color);
        border-width: 0 2.5px 2.5px 0;
        transform: rotate(45deg);
    }

    .container input:checked~.checkmark:after {
        display: block;
    }

    .imgAvatar {
        width: 4vw;
        height: 4vw;

    }
</style>

<body>
    <div class="container-fuid">
        <?php include('nabar.php'); ?>
        <div class="linea linea-superior">
            <div class="circulo circulo-superior"></div>
        </div>
        <div class="linea linea-inferior">
            <div class="circulo circulo-inferior"></div>
        </div>
        <div id="contenedor">
            <div id="contenido">
                <h1 class="game-title">CREAR SALA</h1>
                <a href="configurarJuego.php"><img src="img/iconos/atrasN.png" alt="" width="50" class="atras"
                        style="width: 8vh;"></a>
                <h1 class="animated-shadow" style="font-size:2vh;">¿Preparado para la aventura?</h1>
                <div class="col row">
                    <div class="confi col row">
                        <h3>Avatar</h3>
                        <div class="col">
                            <label class="container">
                                <input type="radio" id="img1" name="carousel" value="Imagen 1" checked>
                                <div class="checkmark"></div>
                            </label>
                            <img src="img/iconos/perfil2.png" class="imgAvatar" alt="...">
                        </div>
                        <div class="col">
                            <label class="container">
                                <input type="radio" id="img1" name="carousel" value="Imagen 2">
                                <div class="checkmark"></div>
                            </label>
                            <img src="img/iconos/perfil3.png" class="imgAvatar" alt="...">
                        </div>
                        <div class="col">
                            <label class="container">
                                <input type="radio" id="img1" name="carousel" value="Imagen 3">
                                <div class="checkmark"></div>
                            </label>
                            <img src="img/iconos/perfil5.png" class="imgAvatar" alt="...">
                        </div>
                        <div class="col">
                            <label class="container">
                                <input type="radio" id="img1" name="carousel" value="Imagen 4">
                                <div class="checkmark"></div>
                            </label>
                            <img src="img/iconos/perfil6.png" class="imgAvatar" alt="...">
                        </div>
                        <div class="col">
                            <label class="container">
                                <input type="radio" id="img1" name="carousel" value="Imagen 5">
                                <div class="checkmark"></div>
                            </label>
                            <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                        </div>
                        <button class="boton-seleccion" onclick="seleccionarImagen()">Seleccionar Imagen</button>
                        <div class="seleccion-resultado" id="resultado"></div>

                        <script>
                            function seleccionarImagen() {
                                const seleccionada = document.querySelector('input[name="carousel"]:checked');
                                document.getElementById('resultado').textContent = `Has seleccionado: ${seleccionada.value}`;
                            }
                        </script>

                        <div class="row">
                            <div class="col">
                                <div class="opcio">Tu nombre
                                    <input type="text">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <h5>Configuración Sala</h5>
                            <div class="col">
                                <div class="opcio">Nombre de <br> la Sala
                                    <input type="text">
                                </div>
                            </div>
                            <div class="col">
                                <div class="opcio">Cantidad Jugadores
                                    <input type="number">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="confi col row">
                        <div class="col row">
                            <div class="row contenedorOpciones">
                                <h1 class="textoEleccion">¿Qué quieres jugar?</h1>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="dos" value="Imagen 2" checked>
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="dos" value="Imagen 2">
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row ">
                            <div class="radio-inputsNuevo">
                            <div style="width:100%">
                                <h1 class="textoEleccion">Temática</h1>
                            </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="tres" value="Imagen 2" checked>
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="tres" value="Imagen 2">
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="tres" value="Imagen 2">
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="tres" value="Imagen 2">
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                            </div>
                            <div class="radio-inputsNuevo">
                            <div style="width:100%">
                                <h1 class="textoEleccion">Nivel</h1>
                            </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="cuatro" value="Imagen 2" checked>
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="cuatro" value="Imagen 2">
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                                <div id="juegoSecuenciaNuevo">
                                    <div class="contenInput">
                                        <label class="container">
                                            <input type="radio" id="img1" name="cuatro" value="Imagen 2">
                                            <div class="checkmark"></div>
                                        </label>
                                        <img src="img/iconos/vaca.png" class="imgAvatar" alt="...">
                                        <div class="texto-label">Ordenar Elementos</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>

                <!-- <div class="confi col">
                        <div id="contenidou"></div>


                    </div> -->

            </div>

        </div>
        <!-- <img src="img/iconos/play.png" alt="" class="play zoom" id="procesarJuegoCartas"> -->

        <!-- <div class="robot">
                <div class="contenido-mensaje">
                    <div class="mensaje">
                        <button type="button" class="btn-close cerrarMensaje"></button>
                        <div id="texto"></div>
                        <a href="">Jugar con amigos</a><br>
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">¿Cómo jugar?</a><br>
                        <a href="login.php">Iniciar Sesión</a>
                    </div>
                </div>
                    
                <img src="img/iconos/vaca.png" alt="" class="mostrarMensaje imagen">
                <img src="img/iconos/muñequitoAbajo.png" alt="" class=" " id="">
            </div> -->

    </div>
    <?php include('audios.php') ?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
    <script src="js/movimiento.js"></script>
    <script src="js/overlayModal.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/movimiento.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/perfil.js"></script>
    <script src="js/play.js"></script>
    <script src="js/mapa.js"></script>
    <script src="js/visivilidadIconos.js"></script>
</body>

</html>