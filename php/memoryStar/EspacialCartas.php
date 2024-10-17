<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego Cartas</title>
    <link rel="stylesheet" href="css/estilosEncabezado.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosCartas.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/animacion.css">
    <link rel="stylesheet" href="css/estiloTablaPuntuacion.css">
    <link rel="stylesheet" href="css/estiloSeguirJugando.css">

    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">

</head>

<style>
    body {
        background-image: url('img/cartasAnimales/er.png');
    }

    @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
</style>

<body>
    <!-- Modal -->
<!-- Modal -->
<div class="modal fade" id="modalUno" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="modalBody">
                "¡Bienvenido, explorador! Tu misión es encontrar las cartas que contienen pistas esenciales para
                ensamblar una nave espacial. Cada pareja de cartas que encuentres te acercará a tu objetivo."
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Omitir</button>
                <button type="button" class="btn btn-primary" id="nextButton">Siguiente</button>
            </div>
        </div>
    </div>
</div>

<!-- CSS para la animación -->
<style>
    .fade-in {
        opacity: 0;
        animation: fadeIn 0.5s forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }

    .fade-out {
        opacity: 1;
        animation: fadeOut 0.5s forwards;
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }
</style>

<script>
    // Contenidos de los modales
    const modalContents = [
        "¡Bienvenido, explorador! Tu misión es encontrar las cartas que contienen pistas esenciales para ensamblar una nave espacial. Cada pareja de cartas que encuentres te acercará a tu objetivo.",
        "Comienza volteando las cartas para buscar parejas. Cuando encuentres una pareja, recibirás una pista que te mostrará el orden correcto para ensamblar la nave espacial. ¡Mantente atento a los detalles!",
        "Una vez que hayas encontrado todas las parejas, serás transportado a la siguiente escena. Aquí deberás buscar las partes de la nave que corresponden a las pistas que has recogido."
    ];

    let currentModalIndex = 0; // Índice del contenido actual del modal
    const modalBody = document.getElementById('modalBody');
    const nextButton = document.getElementById('nextButton');

    nextButton.addEventListener('click', function() {
        // Aplicar la animación de desvanecimiento
        modalBody.classList.add('fade-out');

        // Esperar a que la animación termine antes de cambiar el contenido
        setTimeout(() => {
            currentModalIndex++; // Aumenta el índice del modal actual
            
            if (currentModalIndex < modalContents.length) {
                // Cambia el contenido del modal si hay más contenido
                modalBody.innerHTML = modalContents[currentModalIndex];

                // Aplicar la animación de aparición
                modalBody.classList.remove('fade-out');
                modalBody.classList.add('fade-in');

                // Si es el último contenido, cambia el texto del botón a "Finalizar"
                if (currentModalIndex === modalContents.length - 1) {
                    nextButton.textContent = 'Finalizar';
                }
            } else {
                // Si no hay más contenido, cierra el modal
                const modal = bootstrap.Modal.getInstance(modalBody.closest('.modal'));
                modal.hide(); // Cierra el modal sin contenido vacío
            }

            // Eliminar la clase de animación de aparición después de un tiempo
            setTimeout(() => {
                modalBody.classList.remove('fade-in');
            }, 500); // Tiempo igual a la duración de la animación
        }, 500); // Tiempo igual a la duración de la animación de desvanecimiento
    });
</script>

    <div class="container-fuid">
        <?php include('nabar.php') ?>


        <div class="animacion" id="loader">
            <span class="loader"></span>
        </div>




        <div class="juegoCartas" id="juegoCartas">
            <div class="contenedorCabeza">
                <h1 class="tituloCabeza">CARTAS</h1>
                <img src="img/cartasAnimales/vg.png" class="movable" alt="Imagen 1">
                <img src="img/cartasAnimales/luna.png" class="luna">
                <div class="figuras">
                    <div class="figuras-arriba">
                        <div class="rectangulo">
                            <img src="img/imagenesCabeza/estrella.png" class="estrella">
                            <span class="numero1">67</span>
                        </div>
                        <div class="rombo">
                            <img src="img/imagenesCabeza/Polygon 1poligono.png" class="imgRombo" alt="">
                            <span class="numeroRombo">77</span>
                        </div>
                        <div class="rectangulo">
                            <span class="numero2">99</span>
                            <img src="img/imagenesCabeza/diamante.png" class="estrella">
                        </div>
                    </div>
                    <div class="figuras-abajo">
                        <div class="figura-abajo">
                            <img src="img/imagenesCabeza/bombillo.png">
                        </div>
                        <div class="figura-abajo">
                            <img src="img/imagenesCabeza/segundo diamante .png">
                        </div>
                    </div>
                </div>

                <div class="contenerdorImagen">

                    <div class="contenedorCartas">
                        <div class="carta" data-id="paloma">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/paloma.png
                                " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta" data-id="llamita">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/llamita.png
                                " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta" data-id="perro">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/perro.png" class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>


                        <div class="carta" data-id="pollo">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/pollo.png" class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>

                        <div class="carta" data-id="paloma">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/paloma.png
                            " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>



                        <div class="carta" data-id="llamita">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/llamita.png
                            " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta" data-id="perro">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/perro.png" class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta" data-id="pollo">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/pollo.png" class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                            </div>
                        </div>

                    </div>
                </div>









<style>
    .mensajePistas{
        border: 2px solid #000;
        position: absolute;
        margin-top: 15%;
        background-color: cadetblue;
        width: 60vh;
        height: 20vh;
        padding: 2%;
        border-radius: 2vh;
        box-shadow: 0 0 45px #4827;
        animation: rebote 0.5s;

    }
</style>

                <div id="mensaje1" class="mensajePistas" style="display: none;">
                    PRIMERA PIEZA A ENSAMBLAR
                    <p id="mensajeTexto1"></p>

                </div>
                <div id="mensaje2" class="mensajePistas" style="display: none;">
                    SEGUNDA PIEZA A ENSAMBLAR
                    <p id="mensajeTexto2"> </p>
                   
                </div>
                <div id="mensaje3" class="mensajePistas" style="display: none;">
                TERCERA PIEZA A ENSAMBLAR
                    <p id="mensajeTexto3"> </p>
                </div>
                <div id="mensaje4" class="mensajePistas" style="display: none;">
                CUARTAA PIEZA A ENSAMBLAR
                    <p id="mensajeTexto4"></p>
                </div>
                <div id="mensaje10" class="mensajePistas" style="display: none;">
                PASASTE A LA SEGUNDA RONDA
                    <p id="mensajeTexto4"></p>
                </div>
            </div>





        </div>


    </div>

    <?php include('audios.php') ?>

    <script src="js/overlayModal.js"></script>
    <script src="js/cartas.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/animacion.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>

    <scrip src="js/animacion.js">
        </script>
        <script src="js/barra.js"></script>

        <script>
            document.addEventListener('DOMContentLoaded', function () {
                var myModal = new bootstrap.Modal(document.getElementById('modalUno'));
                myModal.show();
            });
        </script>
</body>

</html>