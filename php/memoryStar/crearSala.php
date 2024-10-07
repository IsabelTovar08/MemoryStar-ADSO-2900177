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
                <h1 class="game-title">Crear Sala</h1>
                <div class="col row">
                    <div class="col-4 sala">
                        <h1 class="textoEleccion">Elje tu avatar</h1>
                        <div id="carouselExampleIndicators" class="carousel slide carousel-container" data-bs-interval="false">
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
                        <script>
                            const carouselElement = document.querySelector('#carouselExampleIndicators');
                            carouselElement.addEventListener('slid.bs.carousel', function () {
                                // Obtener el índice del carousel-item activo
                                const activeIndex = [...carouselElement.querySelectorAll('.carousel-item')].findIndex(item => item.classList.contains('active'));

                                // Desmarcar todos los inputs
                                const inputs = carouselElement.querySelectorAll('input[type="radio"]');
                                inputs.forEach(input => input.checked = false);

                                // Activar el input correspondiente
                                if (inputs[activeIndex]) {
                                    inputs[activeIndex].checked = true;
                                }
                            });
                            function seleccionarImagen() {
                                // Seleccionar el input marcado
                                const seleccionada = document.querySelector('input[name="carousel"]:checked');

                                // Actualizar el contenido de 'resultado'
                                // document.getElementById('resultado').textContent = `Has seleccionado: ${seleccionada.value}`;

                                // Eliminar la clase 'seleccion' de cualquier item que la tenga
                                const previousSelectedItem = document.querySelector('.carousel-item.seleccion');
                                if (previousSelectedItem) {
                                    previousSelectedItem.classList.remove('seleccion');
                                }

                                // Seleccionar el item activo
                                const activeItem = document.querySelector('.carousel-item.active');

                                // Agregar la clase 'seleccion' al item activo
                                if (activeItem) {
                                    activeItem.classList.add('seleccion');
                                }
                                const bieen = document.getElementById('bien');
                                bieen.play();
                            }

                        </script>
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
                    <div class="col-7 sala">
                        <h1 class="textoEleccion">Elije el juego</h1>
                        <div class="tarjetas-container">
                            <div class="option juegoUno">
                                <input type="radio" name="tipoJuego" id="juegoEspacial" value="juegoEspacial">
                                <label class="tarjetaOpcion" for="juegoEspacial">
                                    <img src="img/gif/espacial.gif" alt="">
                                </label>
                                <div class="romboide">
                                    <h6>Planetscape </h6>
                                </div>
                            </div>
                            <div class="option">
                                <input type="radio" name="tipoJuego" id="juegoOrdenar" value="juegoOrdenar">
                                <label class="tarjetaOpcion" for="juegoOrdenar">
                                    <img src="img/gif/memorizar.gif" alt="">
                                </label>
                                <div class="romboide">
                                    <h6>Memorix</h6>
                                </div>
                            </div>
                        </div>
                        <div class="col row">
                            <div class="col">
                                <h1 class="textoEleccion">Elije la temática</h1>
                                <div class="tarjetas-container">
                                    <div class="option quimica">
                                        <input type="radio" name="juegoOrdenar" id="ordenarQuimica"
                                            value="ordenarQuimica">
                                        <label class="tarjetaOpcion" for="ordenarQuimica">
                                            <img src="img/iconos/quimica.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>QuimiLab</h6>
                                        </div>
                                    </div>
                                    <div class="option habitacion">
                                        <input type="radio" name="juegoOrdenar" id="ordenarHabitacion"
                                            value="ordenarHabitacion">
                                        <label class="tarjetaOpcion" for="ordenarHabitacion">
                                            <img src="img/iconos/habitacion.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>MagicRoom</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="tarjetas-container">
                                    <div class="option oficina">
                                        <input type="radio" name="juegoOrdenar" id="ordenarOficina"
                                            value="ordenarOficina">
                                        <label class="tarjetaOpcion" for="ordenarOficina">
                                            <img src="img/iconos/oficina.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>OfiMundo</h6>
                                        </div>
                                    </div>
                                    <div class="option biblioteca">
                                        <input type="radio" name="juegoOrdenar" id="ordenarBiblioteca"
                                            value="ordenarBiblioteca">
                                        <label class="tarjetaOpcion" for="ordenarBiblioteca">
                                            <img src="img/iconos/libros.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Bookify</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <h1 class="textoEleccion">Elije la dificultad</h1>
                                <div class="tarjetas-container">
                                    <div class="option facil">
                                        <input type="radio" name="nivel" id="nivelFacil" value="nivelFacil">
                                        <label class="tarjetaOpcion" for="nivelFacil">
                                            <img src="img/iconos/facil.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Básico</h6>
                                        </div>
                                    </div>
                                    <div class="option medio">
                                        <input type="radio" name="nivel" id="nivelMedio" value="nivelMedio">
                                        <label class="tarjetaOpcion" for="nivelMedio">
                                            <img src="img/iconos/medio (2).png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Desafiante</h6>
                                        </div>
                                    </div>
                                </div>
                                <div class="tarjetas-container">
                                    <div class="option dificil">
                                        <input type="radio" name="nivel" id="nivelDificil" value="nivelDificil">
                                        <label class="tarjetaOpcion" for="nivelDificil">
                                            <img src="img/iconos/dificill.png" alt="">
                                        </label>
                                        <div class="romboide">
                                            <h6>Pro</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
    <script src="js/play.js"></script>
    <script src="js/mapa.js"></script>
    <script src="js/visivilidadIconos.js"></script>
    </bodyb>

</html>