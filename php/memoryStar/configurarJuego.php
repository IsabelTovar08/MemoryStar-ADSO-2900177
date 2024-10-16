<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="css/estilosInicio.css">
    <link rel="stylesheet" href="css/estilosAyuda.css">
    <link rel="stylesheet" href="css/estiloTienda.css">
    <title>JUGAR MemoryStart ¡Pon a prueba tu memoria!</title>
    <link rel="shortcut icon" href="img/iconos/segundoMemory.png">
    <link rel="stylesheet" href="css/ocultarOpciones.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Just+Me+Again+Down+Here&display=swap');
        body{
            background-image: url('img/fondos/fondoOpciones.jpeg');
        }
    </style>
</head>

<body>
    <div class="container-fuid">
    <?php include('nabar.php'); ?>
        <div id="contenedor">
            <div id="contenido">
                <a href="index.php"><img src="img/iconos/atrasN.png" alt="" width="50" class="atras" style="width: 8vh;"></a>
                <div class="bienvenido"><img src="img/iconos/logoBienvenido.png" alt="logoMemory" class="logoBienvenido"></div>
                <h1 class="animated-shadow">¿Preparado para la aventura?</h1>
                <h1 class="textoEleccion">Selecciona el modo de Juego</h1>
                <div class="contenedorOpciones">
                    <img src="img/iconos/jugarSolo.png" class="oJuegos zoom" alt="Imagen 1" id="jugarSolo">
                    <img src="img/iconos/modoVs.png" class="oJuegos zoom" alt="Imagen 2" id="jugarVs">
                    <img src="img/iconos/multijugador.png" class="oJuegos zoom" alt="Imagen 3" id="jugarMultijugador">
                </div>
                <div class="radio-inputs">
                  <label>
                      <span class="radio-tile">
                          <span class="radio-icon">
                              <img src="img/iconos/solo.png" alt="logoMemory" class="logoInicio">
                          </span>
                          <span class="radio-label">Fácil</span>
                      </span>
                  </label>
                  <label>
                      <span class="radio-tile">
                          <span class="radio-icon">
                              <img src="img/iconos/solo.png" alt="logoMemory" class="logoInicio">
                          </span>
                          <span class="radio-label">Intermedio</span>
                      </span>
                  </label>
                  <label>
                      <span class="radio-tile">
                          <span class="radio-icon">
                              <img src="img/iconos/solo.png" alt="logoMemory" class="logoInicio">
                          </span>
                          <span class="radio-label">Difícil</span>
                      </span>
                  </label>
                </div>
            </div>
            <div class="robot">
                <div class="contenido-mensaje">
                    <div class="mensaje">
                        <button type="button" class="btn-close cerrarMensaje"></button>
                        <div id="texto"></div>
                        <a href="">Jugar con amigos</a><br>
                        <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">¿Cómo jugar?</a><br>
                        <a href="login.php">Iniciar Sesión</a>
                    </div>
                </div>
                    
                <img src="img/iconos/vaca.png" alt="" class="mostrarMensaje imagen">
                <img src="img/iconos/muñequitoAbajo.png" alt="" class=" " id="">
            </div>

        </div>
        <?php include('audios.php') ?>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
        <script src="js/movimiento.js"></script>
        <script src="js/overlayModal.js"></script>
        <script src="bootstrap/js/bootstrap.js"></script>
        <script src="js/movimiento.js"></script>
        <script src="js/sonidos.js"></script>
        <script src="js/perfil.js"></script>
        <script src="js/play.js"></script>
        <script src="js/mapa.js"></script>
        <script src="js/visivilidadIconos.js"></script>
        <script src="js/comprat.js"></script>
        <script src="js/fotosperfil.js"></script>
</body>

</html>