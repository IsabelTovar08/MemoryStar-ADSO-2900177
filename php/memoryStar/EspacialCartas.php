    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>juego Cartas</title>
        <link rel="stylesheet" href="css/estilosEncabezado.css">
        <link rel="stylesheet" href="css/estilosInicio.css">
        <link rel="stylesheet" href="css/estilosCartas.css">
        <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
        <link rel="stylesheet" href="css/estilosAyuda.css">
        <link rel="stylesheet" href="css/animacion.css">
        <link rel="stylesheet" href="css/estiloTablaPuntuacion.css">
        <link rel="stylesheet" href="css/estiloSeguirJugando.css">

        <link rel="shortcut icon" href="img/iconos/segundoMemory.png">

    </head>

    <style>
        body {
            background-image: url('img/cartasAnimales/er.png');
        }

        @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
    </style>

    <body>





        <div class="container-fuid">
            <?php include('nabar2.php') ?>


            <div class="animacion" id="loader">
                <span class="loader"></span>
            </div>




            <div class="juegoCartas" id="juegoCartas">
                <div class="contenedorCabeza">
                    <h1 class="tituloCabeza">CARTAS</h1>
                    <img src="img/cartasAnimales/vg.png" class="movable" alt="Imagen 1">
                    <img src="img/cartasAnimales/luna.png" class="luna">
                    <div class="figuras">
                        <div class="figuras-arriba">
                            <div class="rectangulo">
                                <img src="img/imagenesCabeza/estrella.png" class="estrella">
                                <span class="numero1">67</span>
                            </div>
                            <div class="rombo">
                                <img src="img/imagenesCabeza/Polygon 1poligono.png" class="imgRombo" alt="">
                                <span class="numeroRombo">77</span>
                            </div>
                            <div class="rectangulo">
                                <span class="numero2">99</span>
                                <img src="img/imagenesCabeza/diamante.png" class="estrella">
                            </div>
                        </div>
                        <div class="figuras-abajo">
                            <div class="figura-abajo">
                                <img src="img/imagenesCabeza/bombillo.png">
                            </div>
                            <div class="figura-abajo">
                                <img src="img/imagenesCabeza/segundo diamante .png">
                            </div>
                        </div>
                    </div>

                    <div class="contenerdorImagen">

                        <div class="contenedorCartas">
                            <div class="carta" data-id="paloma">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/paloma.png
                                " class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>
                            <div class="carta" data-id="llamita">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/llamita.png
                                " class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>
                            <div class="carta" data-id="perro">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/perro.png" class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>


                            <div class="carta" data-id="pollo">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/pollo.png" class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>

                            <div class="carta" data-id="paloma">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/paloma.png
                            " class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>



                            <div class="carta" data-id="llamita">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/llamita.png
                            " class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>
                            <div class="carta" data-id="perro">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/perro.png" class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>
                            <div class="carta" data-id="pollo">
                                <div class="cara reverso">
                                    <img src="img/cartasAnimales/pollo.png" class="imagen">
                                </div>
                                <div class="cara frente">
                                    <img src="img/cartasAnimales/reverso.png" class="imagen" alt="Reverso">
                                </div>
                            </div>

                        </div>
                    </div>











                    <div id="mensaje1" class="mensaje" style="display: none;">
                        <p id="mensajeTexto1">primera pista amnigo </p>

                        fghjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkas
                        alkjsskjaskkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
                        sjdhfkahdjkhkjahskjahkjsdhakjdhsajdaskdhsakdha
                        akjshdakjhadkhj
                    </div>
                    <div id="mensaje2" class="mensaje" style="display: none;">
                        <p id="mensajeTexto2"> segunda pista</p>
                        <img src="img/iconos/mauro.png" alt="" class="imagen">
                    </div>
                    <div id="mensaje3" class="mensaje" style="display: none;">
                        <p id="mensajeTexto3">tercera pista </p>
                        <img src="img/iconos/mauro.png" alt="" class="imagen">
                    </div>
                    <div id="mensaje4" class="mensaje" style="display: none;">
                        <p id="mensajeTexto4">cuarta pista </p>
                        <img src="img/iconos/mauro.png" alt="" class="imagen">
                    </div>
                </div>





            </div>


        </div>

        <?php include('audios.php') ?>

        <script src="js/overlayModal.js"></script>
        <script src="js/cartas.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/animacion.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>

        <scrip src="js/animacion.js">
            </script>
            <script src="js/barra.js"></script>


    </body>

    </html>