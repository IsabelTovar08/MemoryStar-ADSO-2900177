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

<body style="background-image: url('img/fondoTematicas/fondoMate.jpg');">
    <div class="container-fuid">
        <?php include('nabar.php'); ?>

        <div id="contenedor">
            <div class="contenido arrastrar">
                <h1 class="textoEleccion">Ordenar Elementos</h1>
                <div class="dropzones-container">
                    <div id="calculadora" class="dropzone"></div>
                    <div id="regla" class="dropzone"></div>
                    <div id="formula" class="dropzone"></div>
                    <div id="signos" class="dropzone"></div>

                </div>
                <div id="start-zone" class="start-zone">
                    <img src="img/cartasMatematicas/calcu.jpg" alt="" id="calculadora" draggable="true" class="draggable">
                    <img src="img/cartasMatematicas/reglas.jpg" alt="" id="regla" draggable="true" class="draggable">
                    <img src="img/cartasMatematicas/formula.jpg" alt="" id="formula" draggable="true" class="draggable">
                    <img src="img/cartasMatematicas/signos.jpg" alt="" id="signos" draggable="true" class="draggable">

                </div>
                <!-- Zonas de destino específicas para cada elemento -->

            </div>


        </div>
        <?php include('audios.php') ?>
        <!-- <script src="js/play.js"></script> -->
       ¿ <script src="js/contador.js"></script>
        <script src="js/ordenar.js"></script>
        <script src="js/movimiento.js"></script>
        <script src="js/overlayModal.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/perfil.js"></script>
        <script src="js/mapa.js"></script>
        <script src="js/barra.js"></script>
</body>

</html>