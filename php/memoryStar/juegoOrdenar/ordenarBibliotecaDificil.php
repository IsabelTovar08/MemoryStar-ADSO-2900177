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
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    </style>
</head>

<body style="background-image: url('img/secuLibro/fondoLibro.png');">
    <div class="container-fuid">
        <?php include('nabar.php'); ?>
        <div id="contenedor">
            <div class="contenedor-secu">
                <h1 class="textoEleccion">Pon los objetos en su lugar</h1>

                <div id="contenedor-secuInt">
                    <div class="contenedor-estante">
                        <img src="img/SecuLibro/estanteria.png" class="estanteImg">
                        <div class="contenedor-libros" id="lista">
                        <img src="img/secuLibro/librito1.png" alt="" class="libro" data-id="1">
                        <img src="img/secuLibro/librito2.png" alt="" class="libro" data-id="2">
                        <img src="img/secuLibro/librito3.png" alt="" class="libro" data-id="3">
                        <img src="img/secuLibro/librito4.png" alt="" class="libro" data-id="4">
                        <img src="img/secuLibro/librito5.png" alt="" class="libro" data-id="5"> 
                        <img src="img/secuLibro/librito6.png" alt="" class="libro" data-id="6"> 
                        <!-- <img src="img/secuLibro/librito7.png" alt="" class="libro" data-id="7"> 
                        <img src="img/secuLibro/librito8.png" alt="" class="libro" data-id="8"> 
                        <img src="img/secuLibro/librito9.png" alt="" class="libro" data-id="9"> -->

                    </div>
                    </div>
                    


                </div>
                <button id="verificar1">Verificar</button>

            </div>
            <div id="resultado"></div>
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