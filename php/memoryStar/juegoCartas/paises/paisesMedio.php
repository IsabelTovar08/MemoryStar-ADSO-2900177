<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego Paises Medio </title>
    <link rel="stylesheet" href="../../css/estilosEncabezado.css">
    <link rel="stylesheet" href="../../css/estilosInicio.css">
    <link rel="stylesheet" href="../../css/estilosCartas.css">
    <link rel="stylesheet" href="../../bootstrap/css/bootstrap.css">

</head>

<style>
    body {
    background-image: url('../../img/fondoTematicas/fondoPaises.jpg');
    background-position: center; 
    background-repeat: no-repeat;
}

</style>
<body class="fondo">
    <?php include('../nabar2.php') ?>

    <div class="contenedor">
        <div class="carta"  data-id="alem">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/alem.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="bra">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/bra.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="coll">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/coll.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="espa">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/espa.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="central">
            <img src="../../img/logoNuevo1.png" class="imagen2">
        </div>
        <div class="carta" data-id="alem">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/alem.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>   
        <div class="carta" data-id="bra">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/bra.jpg
                " class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="coll">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/coll.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="espa">
            <div class="cara reverso">
                <img src="../../img/cartasPaises/espa.jpg" class="imagen">
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