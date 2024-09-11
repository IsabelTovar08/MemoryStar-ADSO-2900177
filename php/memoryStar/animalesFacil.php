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
    <link rel="stylesheet" href="css/estilosTablaPuntuacion.css">
    <link rel="stylesheet" href="estilosSeguirJugando.css">
  
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">

</head>

<style>
    body{
        background-image: url('img/fondoTematicas/fondoAnimal.jpeg');
    }
</style>
<body>


 
   

<div class="container-fuid">
    <?php include('nabar.php') ?>


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
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <scrip src="js/animacion.js"></script>
    <script src="js/barra.js"></script>
    
    
</body>
</html>