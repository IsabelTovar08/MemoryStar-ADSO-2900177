<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego Matematicas Dificil </title>
    <link rel="stylesheet" href="../../css/estilosEncabezado.css">
    <link rel="stylesheet" href="../../css/estilosInicio.css">
    <link rel="stylesheet" href="../../css/estilosCartasDificil.css">
    <link rel="stylesheet" href="../../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../css/estilosAyuda.css">

</head>

<style>
    body {
    background-image: url('../../img/fondoTematicas/fondoMate.jpg');
    background-position: center; 
    background-repeat: no-repeat;
}

</style>
<body class="fondo">
    <?php include('../nabar2.php') ?>
   
    <div class="contenedor">
        <div class="carta"  data-id="signos">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/signos.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="7">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/7.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="7">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/7.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="formula">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/formula.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="formula">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/formula.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="cerebro">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/cerebro.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="reglas">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/reglas.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="calcu">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/calcu.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        
        <div class="carta" data-id="signos">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/signos.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>   
        <div class="carta" data-id="cerebro">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/cerebro.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="reglas">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/reglas.jpg" class="imagen">
            </div>
            <div class="cara frente">
                <img src="../../img/Cartalogorehecha.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="calcu">
            <div class="cara reverso">
                <img src="../../img/cartasMatematicas/calcu.jpg" class="imagen">
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