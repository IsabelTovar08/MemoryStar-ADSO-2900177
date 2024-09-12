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

<body style="background-image: url('img/fondoTematicas/tecno.gif');">
    <div class="container-fuid">
    <style>
            .dropzones-container {
                display: flex;
                width: 60vw;
                height: auto;
            }

            .start-zone {
                width: 55vw;
                height: auto;
            }
        </style>
        <?php include('nabar.php'); ?>
        <div id="contenedor">
            <div class="contenido arrastrar">
                <h1 class="textoEleccion">Ordenar Elementos</h1>
                <div class="dropzones-container">
                    <div id="mouse" class="dropzone"></div>
                    <div id="celular" class="dropzone"></div>
                    <div id="disco" class="dropzone"></div>
                    <div id="computador" class="dropzone"></div>
                    <div id="cpu" class="dropzone"></div>
                    <div id="auriculares" class="dropzone"></div>
                </div>
                <div id="start-zone" class="start-zone">
                    <img src="img/cartasTecnologia/mause.jpg" alt="" id="mouse" draggable="true" class="draggable">
                    <img src="img/cartasTecnologia/cel.jpg" alt="" id="celular" draggable="true" class="draggable">
                    <img src="img/cartasTecnologia/disco.jpg" alt="" id="disco" draggable="true" class="draggable">
                    <img src="img/cartasTecnologia/compu.jpg" alt="" id="computador" draggable="true" class="draggable">
                    <img src="img/cartasTecnologia/cpu.jpg" alt="" id="cpu" draggable="true" class="draggable">
                    <img src="img/cartasTecnologia/auri.jpg" alt="" id="auriculares" draggable="true" class="draggable">
                </div>
            </div>
        </div>
        <?php include('audios.php') ?>
        <script>
                let intervalo;
                let tiempoRestante = 10; 
                function iniciarContador() {
                        intervalo = setInterval(() => {
                            tiempoRestante--;
                            
                            console.log(`Tiempo restante: ${tiempoRestante} segundos`);

                            if (tiempoRestante <= 0) {
                                clearInterval(intervalo);
                          
                                var myModal = new bootstrap.Modal(document.getElementById('seguirJugando'));
                                myModal.show();
                            
                               
                                setTimeout(function() {
                                    myModal.hide();
                               
                                    myModal._element.addEventListener('hidden.bs.modal', function () {
                                        var modal2 = new bootstrap.Modal(document.getElementById('tablapuntuacionsolo'));
                                        modal2.show();
                                    }, {once: true}); 
                                }, 3000); 
                            }
                        }, 1000);
                    }


                    iniciarContador();
            </script>
        <!-- <script src="js/play.js"></script> -->
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