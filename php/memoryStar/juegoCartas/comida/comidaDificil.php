<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego Comida Dificil </title>
    <link rel="stylesheet" href="../../css/estilosEncabezado.css">
    <link rel="stylesheet" href="../../css/estilosInicio.css">
    <link rel="stylesheet" href="../../css/estilosCartasDificil.css">
    <link rel="stylesheet" href="../../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../css/estilosAyuda.css">

</head>

<style>
    body {
    background-image: url('../../img/fondoTematicas/fondoComida1.jpg');
    background-position: center; 
    background-repeat: no-repeat;
}

</style>
<body class="fondo">
    <?php include('../nabar2.php') ?>
   
    <div class="contenedor">
        <div class="carta"  data-id="dona">
            <div class="cara reverso">
                <img src="../../img/cartasComida/dona.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="pizza">
            <div class="cara reverso">
                <img src="../../img/cartasComida/pizza.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="pizza">
            <div class="cara reverso">
                <img src="../../img/cartasComida/pizza.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="hamburguesa">
            <div class="cara reverso">
                <img src="../../img/cartasComida/hamburguesa.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="helado">
            <div class="cara reverso">
                <img src="../../img/cartasComida/helado.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="leche">
            <div class="cara reverso">
                <img src="../../img/cartasComida/leche.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="sandwich">
            <div class="cara reverso">
                <img src="../../img/cartasComida/sandwich.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="sandwich">
            <div class="cara reverso">
                <img src="../../img/cartasComida/sandwich.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
       
        <div class="carta" data-id="dona">
            <div class="cara reverso">
                <img src="../../img/cartasComida/dona.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>   
        <div class="carta" data-id="hamburguesa">
            <div class="cara reverso">
                <img src="../../img/cartasComida/hamburguesa.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="helado">
            <div class="cara reverso">
                <img src="../../img/cartasComida/helado.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="leche">
            <div class="cara reverso">
                <img src="../../img/cartasComida/leche.jpg" class="imagen">
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
    <script src="../../js/overlayModal.js"></script>
</body>
</html>