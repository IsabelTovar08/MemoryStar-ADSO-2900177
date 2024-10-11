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
        body{
            background-image: url('img/fondos/fondoOpciones.jpeg');
        }
    </style>
</head>

<body>
    <div class="container-fuid">
    <?php include('nabar.php'); ?>
        <div id="contenedor">
            <div id="contenido" style="width: 80vw;">
                <a href="index.php"><img src="img/iconos/atrasN.png" alt="" width="50" class="atras"></a>
                <div class="bienvenido"><img src="img/iconos/logoBienvenido.png" alt="logoMemory" class="logoBienvenido"></div>
                <h1 class="animated-shadow">¿Preparado para la aventura?</h1>
                <h1 class="textoEleccion">Selecciona el modo de Juego</h1>
                <div class="contenedorOpciones">
                    <img src="img/iconos/jugarSolo.png" class="oJuegos zoom" alt="Imagen 1" id="jugarSolo">
                    <img src="img/iconos/multijugador.png" class="oJuegos zoom" alt="Imagen 3" id="jugarMultijugador">
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="ordenar" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">¡Memorix! </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Observa un patrón por unos segundos, memorízalo y luego ordena los objetos en su lugar
                            correcto. Cada escenario es un reto único que pondrá a prueba tu memoria. ¡Desafía tu mente
                            y demuestra lo rápido que puedes recordar!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="espacial" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">¡Planetscape!</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Embárcate en una aventura espacial con dos desafíos únicos, ¡Explora
                            planetas, resuelve acertijos y encuentra tu camino de regreso a la Tierra!
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                        </div>
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