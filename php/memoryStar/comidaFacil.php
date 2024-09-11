<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>juego comida Facil </title>
    <link rel="stylesheet" href="css/estilosEncabezado.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosCartas.css">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">

</head>

<style>
    body{
        background-image: url('img/fondoTematicas/fondoComida1.jpg');
    }
</style>
<body>
<div class="container-fuid">
    <?php include('nabar.php') ?>
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
                        <div class="carta"  data-id="dona">
                            <div class="cara reverso">
                                <img src="img/cartasComida/dona.jpg
                                " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta" data-id="hamburguesa">
                            <div class="cara reverso">
                                <img src="img/cartasComida/hamburguesa.jpg
                                " class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                        <div class="carta"  data-id="sandwich">
                            <div class="cara reverso">
                                <img src="img/cartasComida/sandwich.jpg" class="imagen">
                            </div>
                            <div class="cara frente">
                                <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                            </div>
                        </div>
                    
                    
                    <div class="carta"  data-id="pizza">
                        <div class="cara reverso">
                            <img src="img/cartasComida/pizza.jpg" class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>
                    <div class="central">
                        <img src="img/logoNuevo1.png" class="imagen2">
                    </div>
                    <div class="carta" data-id="dona">
                        <div class="cara reverso">
                            <img src="img/cartasComida/dona.jpg
                            " class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>   



                    <div class="carta" data-id="hamburguesa">
                        <div class="cara reverso">
                            <img src="img/cartasComida/hamburguesa.jpg
                            " class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>
                    <div class="carta" data-id="sandwich">
                        <div class="cara reverso">
                            <img src="img/cartasComida/sandwich.jpg" class="imagen">
                        </div>
                        <div class="cara frente">
                            <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                        </div>
                    </div>
                    <div class="carta" data-id="pizza">
                        <div class="cara reverso">
                            <img src="img/cartasComida/pizza.jpg" class="imagen">
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

    <script src="bootstrap/js/bootstrap.js"></script>
    
</body>
</html>