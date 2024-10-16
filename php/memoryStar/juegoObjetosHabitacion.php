<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/pruebaSecu.css">
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
    </style>
</head>

<body style="background-image: url('img/juegoObjetos/fondoObjetosHabitacion.png');">
    <div class="container-fuid">
        <?php include('nabar.php'); ?>
        <div id="contenedor">
            <div class="contenedor-juego-objetos">
                <div class="contenedor-imagen">
                    <h1 class="textoEleccion">Pon los objetos en su lugar</h1>
                    <img src="img/juegoObjetos/sala.png" id= imagen-principal class="imagen-objeto">
                    <div id="droplibro" class="dropzone"></div>
                    <div id="dropzapatos" class="dropzone"></div>
                    <div id="dropcuadro" class="dropzone"></div>
                    <div id="droplampara" class="dropzone"></div>
                    <div id="dropcactus" class="dropzone"></div>
                    <div id="dropjarra" class="dropzone"></div>
                </div>

                <div id="objetos" class="contenedor-objetos">
                    <img src="img/juegoObjetos/libro.png" id="libro" class="arrastrable" data-destino="libro">
                    <img src="img/juegoObjetos/zapatos.png" id="zapatos" class="arrastrable" data-destino="zapatos">
                    <img src="img/juegoObjetos/cuadro.png" id="cuadro" class="arrastrable" data-destino="cuadro">
                    <img src="img/juegoObjetos/lampara.png" id="lampara" class="arrastrable" data-destino="lampara">
                    <img src="img/juegoObjetos/cactus.png" id="cactus" class="arrastrable" data-destino="cactus">
                    <img src="img/juegoObjetos/jarra.png" id="jarra" class="arrastrable" data-destino="jarra">
                </div>
            </div>
        </div>

    </div>
    <?php include('audios.php') ?>
    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>

    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/juegoObjetosHabitacion.js"></script>
    <script src="js/pruebaSecu.js"></script>
    <script src="js/movimiento.js"></script>
    <script src="js/overlayModal.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/perfil.js"></script>
    <script src="js/mapa.js"></script>
    <script src="js/barra.js"></script>
    <script src="js/comprat.js"></script>
    <script src="js/fotosperfil.js"></script>


</body>

</html>