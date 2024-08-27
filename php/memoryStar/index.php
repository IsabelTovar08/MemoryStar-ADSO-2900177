<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <title>MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
</head>
<body>
    <div class="container-xxl">
        <?php include('nabar.php'); ?>
        <div id="contenido">
            <img src="img/iconos/nuevoMemory.png" alt="logoMemory" height="400" class="logoInicio">
        </div>
        <div id="jugar">

            <img src="img/iconos/clic.png" alt="" width="50" class="centrar" id="centrar1">
            <img src="img/iconos/clic2.png" alt="" width="50" class="centrar" id="centrar2">
            <img src="img/iconos/play.png" alt="" class="play zoom" id="play">
            <img src="img/iconos/muñequito.png" alt="" class="play zoom" id="">

        </div>
        <p id="message"></p>
    </div>
    <?php include('audios.php') ?>
    <script src="bootstrap/js/bootstrap.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/perfil.js"></script>
    <script src="js/play.js"></script>
</body>
</html>