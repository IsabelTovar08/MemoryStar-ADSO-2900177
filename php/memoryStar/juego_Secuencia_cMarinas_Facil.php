<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosOrdenar.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/estiloTienda.css">
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

<body style="background-image: url('img/fondoTematicas/fondoMarinoMejor.jpeg');">
    <div class="container-fuid">
        <?php include('nabar.php'); ?>

        <div id="contenedor">
            <div class="contenido arrastrar">
                <h1 class="textoEleccion">Ordenar Elementos</h1>
                <div class="dropzones-container">
                    <div id="pezGlobo" class="dropzone"></div>
                    <div id="medusa" class="dropzone"></div>
                    <div id="tiburon" class="dropzone"></div>
                    <div id="cangrejo" class="dropzone"></div>

                </div>
                <div id="start-zone" class="start-zone">
                    <img src="img/criaturasMarinas/pez-globo.jpg" alt="" id="pezGlobo" draggable="true" class="draggable">
                    <img src="img/criaturasMarinas/medusa.jpg" alt="" id="medusa" draggable="true" class="draggable">
                    <img src="img/criaturasMarinas/tiburonDos.jpg" alt="" id="tiburon" draggable="true" class="draggable">
                    <img src="img/criaturasMarinas/cangrejo.jpg" alt="" id="cangrejo" draggable="true" class="draggable">

                </div>
                <!-- Zonas de destino específicas para cada elemento -->

            </div>


        </div>
        <?php include('audios.php') ?>
        <!-- <script src="js/play.js"></script> -->

        <script src="js/ordenar.js"></script>
        <script src="js/movimiento.js"></script>
        <script src="js/overlayModal.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/perfil.js"></script>
        <script src="js/mapa.js"></script>
</body>

</html>