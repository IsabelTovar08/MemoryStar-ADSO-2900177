<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego Animales Dificil </title>
    <link rel="stylesheet" href="../../css/estilosEncabezado.css">
    <link rel="stylesheet" href="../../css/estilosInicio.css">
    <link rel="stylesheet" href="../../css/estilosCartasDificil.css">
    <link rel="stylesheet" href="../../bootstrap/css/bootstrap.css">
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">

</head>

<style>
    body {
    background-image: url('../../img/fondoTematicas/f8e210a7-7519-4734-9a5a-797baf30869e.jpeg');
    background-position: center; 
    background-repeat: no-repeat;
}

</style>
<body class="fondo">
    <?php include('../nabar2.php') ?>

    <div class="contenedor">
        <div class="carta"  data-id="ave">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/ave.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="vaca">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/vaca.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="koala">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/koala.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="leon">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/leon.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="tiburon">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/tiburon.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="tiburon">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/tiburon.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="zorro">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/zorro.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="zorro">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/zorro.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="ave">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/ave.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>   
        <div class="carta" data-id="vaca">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/vaca.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="koala">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/koala.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="leon">
            <div class="cara reverso">
                <img src="../../img/cartasAnimales/leon.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
    </div>
   <?php include('../audios2.php') ?>
    <a href="index.php"><button class="btn btn-success">Salir</button></a>
    <a href="ordenar.php"><button class="btn btn-primary">Siguiente</button></a>
    <script src="../../js/cartas.js"></script>
    <script src="../../js/sonidos.js"></script>
    <script src="../../bootstrap/js/bootstrap.js"></script>
</body>
</html>