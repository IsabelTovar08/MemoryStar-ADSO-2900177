<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego</title>
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosCartas.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
</head>
<body class="fondo">
    <?php include('nabar.php') ?>
    <div class="Titulo col-12"> Cartas</div>
    <div class="contenedor">
        <div class="carta"  data-id="aguacate">
            <div class="cara reverso">
                <img src="img/cartasFrutas/aguacate.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="bananos">
            <div class="cara reverso">
                <img src="img/cartasFrutas/bananos.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="cereza">
            <div class="cara reverso">
                <img src="img/cartasFrutas/cereza.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta"  data-id="manzana">
            <div class="cara reverso">
                <img src="img/cartasFrutas/manzana.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="central">
            <img src="img/cartasFrutas/logoMemory.png" class="imagen2">
        </div>
        <div class="carta" data-id="aguacate">
            <div class="cara reverso">
                <img src="img/cartasFrutas/aguacate.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>   
        <div class="carta" data-id="bananos">
            <div class="cara reverso">
                <img src="img/cartasFrutas/bananos.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="cereza">
            <div class="cara reverso">
                <img src="img/cartasFrutas/cereza.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
        <div class="carta" data-id="manzana">
            <div class="cara reverso">
                <img src="img/cartasFrutas/manzana.png" class="imagen">
            </div>
            <div class="cara frente">
                <img src="img/cartasFrutas/logo.png" class="imagen" alt="Reverso">
            </div>
        </div>
    </div>
   <?php include('audios.php') ?>
    <a href="index.php"><button class="btn btn-success">Salir</button></a>
    <a href="ordenar.php"><button class="btn btn-primary">Siguiente</button></a>
    <script src="js/cartas.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
</body>
</html>