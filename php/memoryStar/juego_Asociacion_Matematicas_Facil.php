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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    </style>
</head>

<body style="background-image: url('img/fondoTematicas/fondoMate.jpg');">
    <div class="container-fuid">
        <?php include('nabar.php'); ?>
        <div id="contenedor">
            <div class="asociacion">
                <div class="col-12 row">
                    <h1 class="textoEleccion">Ordenar Elementos</h1>
                    <h6 style="text-align: center; color:#fff">Asocia las imágenes de la columna A con <br> correspondiente en la columna B.</h6>
                    <div class="col segundaColumna">
                    <div id="" class="asociar">
                            <div id="calculadora" class="dropzone">
                                <img src="img/cartasMatematicas/A1.png" alt="" id="calculadora" draggable="true" class="draggable">
                            </div>
                            <div id="regla" class="dropzone">
                                <img src="img/cartasMatematicas/B1.png" alt="" id="regla" draggable="true" class="draggable">
                            </div>
                            <div id="formula" class="dropzone">
                                <img src="img/cartasMatematicas/C1.png" alt="" id="formula" draggable="true" class="draggable">
                            </div>
                        </div>
                    </div>
                    <div class="col segundaColumna">
                        <div id="start-zone" class="asociar">
                            <img src="img/cartasMatematicas/A2.png" alt="" id="calculadora" class="asociados">
                            <img src="img/cartasMatematicas/B2.png" alt="" id="regla" class="asociados">
                            <img src="img/cartasMatematicas/C2.png" alt="" id="formula" class="asociados">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php include('audios.php') ?>
        <script src="js/contador.js"></script>
        <script src="js/ordenar.js"></script>
        <script src="js/movimiento.js"></script>
        <script src="js/overlayModal.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/perfil.js"></script>
        <script src="js/mapa.js"></script>
        <script src="js/comprat.js"></script>
        <script src="js/fotosperfil.js"></script>
</body>

</html>