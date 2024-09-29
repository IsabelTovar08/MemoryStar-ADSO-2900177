    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego Animales Facil </title>
    <link rel="stylesheet" href="css/estilosEncabezado.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosCartas.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/animacion.css">
    <link rel="stylesheet" href="css/estiloTablaPuntuacion.css">
    <link rel="stylesheet" href="css/estiloSeguirJugando.css">
  
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    </style>

</head>

<style>
    body{
        background-image: url('img/fondoTematicas/ani.gif');
    }

    .mensaje {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 10px;
    z-index: 1000;
    
}


</style>
<body>


 
   

<div class="container-fuid">
    <?php include('nabar2.php') ?>


             <div class="animacion"   id ="loader" >
                <span class="loader"></span>
            </div>

            


    <div class="juegoCartas" id ="juegoCartas">
        <div class="contenedorCabeza">
                <h1 class="tituloCabeza">CARTAS</h1>
                <div class="figuras">
                    <div class="figuras-arriba">
                        <div class="rectangulo">
                            <img src="img/imagenesCabeza/estrella.png" class="estrella">
                            <span class="numero1">67</span>
                        </div>
                        <div class="rombo">
                            <img src="img/imagenesCabeza/Polygon 1poligono.png"    class = "imgRombo" alt="">
                            <span class="numeroRombo">77</span>
                        </div>
                        <div class="rectangulo">
                            <span class="numero2">99</span>
                            <img src="img/imagenesCabeza/diamante.png" class="estrella">
                        </div>
                    </div>
                    <div class="figuras-abajo">
                        <div class="figura-abajo">
                            <img src="img/imagenesCabeza/bombillo.png" >
                        </div>
                        <div class="figura-abajo">
                            <img src="img/imagenesCabeza/segundo diamante .png">
                        </div>
                    </div>
                </div>
                <div class="contenedorCartas">
                        <div class="carta"  data-id="ave">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/ave.jpg
                                " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta" data-id="vaca">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/vaca.jpg
                                " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta"  data-id="koala">
                            <div class="cara reverso">
                                <img src="img/cartasAnimales/koala.jpg" class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                    
                    
                    <div class="carta"  data-id="leon">
                        <div class="cara reverso">
                            <img src="img/cartasAnimales/leon.jpg" class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>
                    <div class="central">
                        <img src="img/logoNuevo1.png" class="imagen2">
                    </div>
                    <div class="carta" data-id="ave">
                        <div class="cara reverso">
                            <img src="img/cartasAnimales/ave.jpg
                            " class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>   



                    <div class="carta" data-id="vaca">
                        <div class="cara reverso">
                            <img src="img/cartasAnimales/vaca.jpg
                            " class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>
                    <div class="carta" data-id="koala">
                        <div class="cara reverso">
                            <img src="img/cartasAnimales/koala.jpg" class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>
                    <div class="carta" data-id="leon">
                        <div class="cara reverso">
                            <img src="img/cartasAnimales/leon.jpg" class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>

                </div>

                <div id="mensaje1" class="mensaje" style="display: none;">
                    <p id="mensajeTexto1">primera pista amnigo </p>

                    <img src="img/iconos/mauro.png" alt="" class = "imagen" >
                </div>
                <div id="mensaje2" class="mensaje" style="display: none;">
                    <p id="mensajeTexto2">   segunda pista</p>
                    <img src="img/iconos/mauro.png" alt="" class = "imagen" >
                </div>
                <div id="mensaje3" class="mensaje" style="display: none;">
                    <p id="mensajeTexto3">tercera pista </p>
                    <img src="img/iconos/mauro.png" alt=""  class = "imagen">
                </div>
                <div id="mensaje4" class="mensaje" style="display: none;">
                    <p id="mensajeTexto4">cuarta pista </p>
                    <img src="img/iconos/mauro.png" alt="" class = "imagen">
                </div>
        </div>

    


           
    </div>

   
</div>

   <?php include('audios.php') ?>
    <a href="index.php"><button class="btn btn-success botonesCartas">Salir</button></a>
    <a href="animalesMedio.php"><button class="btn btn-primary  botonesCartas ">Siguiente</button></a>
    <script src="js/overlayModal.js"></script>
    <script src="js/cartas.js"></script>
    <script src="js/sonidos.js"></script>
    <script src="js/animacion.js"></script>
    <script src="bootstrap/js/bootstrap.js"></script>
   
    <scrip src="js/animacion.js"></script>
    <script src="js/barra.js"></script>
    
    
</body>
</html>

