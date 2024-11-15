// Selecciona el contenedor 'fluid'
var container = document.getElementById("fluid");

// Si el modal se genera dinámicamente, agrégalo dentro de 'fluid'
var modalHTML = `
    <!-- nab  -->
<nav class="nav flex-column apartado-iconos">
<img id="desplegarOpciones" src="img/iconos/opcionesN.png" alt="desplegarOpciones" class="iconos efectosIconos">
    <img id="controlMusica" src="img/iconos/musicaApagada.png" alt="Reproducir" class="iconos efectosIconos">
    <img src="img/iconos/copaN.png" alt="Histórico" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#hisorico">
    <img src="img/iconos/ajustesN.png" alt="Ajustes" class="iconos efectosIconos" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    <!-- <div class=""> -->
    <div class="collapse" id="collapseExample" style="width: 500%;">
        <div class="card card-body color">
            <div class="col-12 row">
                <div class="col-5">Música</div>
                <div class="col-6"><input type="range" class="secondary" id="volumenMusica" min="0" max="1" step="0.1" value="1"></div>
            </div>
            <div class="col-12 row">
                <div class="col-5">Sonido</div>
                <div class="col-6"><input type="range" id="volumenSonido" min="0" max="1" step="0.1" value="1"></div>
            </div>
            <button id="botonSilencio" class="btn btn-primary">Silenciar</button>
        </div>
    </div>
    <!-- </div> -->
    <img src="img/iconos/ayudaN.png" alt="Ayuda" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">
</nav>
<div class="apartado-derecho">
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <span class="nombre"></span>
        </li>
        <li class="nav-item usuario">
            <img src="img/iconos/usuario.png" id="profileImage2" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="offcanvas" data-bs-target="#perfil" aria-controls="offcanvasRight">
        </li>
    </ul>
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/posicion.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#Mapa">
        </li>
    </ul>
    <!-- <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/qr.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#escanerRapido">
        </li>
    </ul> -->
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/tiendaN.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal-tienda">
        </li>
    </ul>
</div>

<div class="modal fade" id="hisorico" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg card moveer">
        <div class="modal-content coloor">
            <div class="tithe titulo">
                <h1 class="fs-5" id="exampleModalLabel">Histórico</h1>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            
            <div class="historio-modo">
                <div class="historico-solo">solo</div>
                <div class="historico-multi">multi</div>
            </div>
                
            <div class="modal-body tam">
                <table class="Tabla-cuerpo">
                    <thead>
                        <tr class="encabezado-header">
                            <th>Últimas partidas</th>
                            <th>Diamantes</th>
                            <th>Puntos</th>
                            <th>Tiempo</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Las filas se añadirán aquí dinámicamente -->
                    </tbody>
                </table>
            </div>
            <div>
                <button type="button" class="btn" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>




<!-- Modal ayuda -->
<div class="modal fade" id="exampleModal-ayuda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog princ">
    <div class="modal-content sec">
      <div class="modal-header">
        <h5 class="modal-title titulo-ayuda" id="exampleModalLabel">¿Como Jugar?</h5>
        <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal" aria-label="Close">
        
      </div>
      <div class="modal-body bod">
        <div class="texto">
            Aqui puedes obtener informacion de como jugar
        </div>
        <div class="contenedor-imgAyuda">
            <img src="img/iconos/planetScape.png" alt="cartas" id="goToModal2" class="imgAyuda btn">
            <img src="img/iconos/Memorix.png" alt="secuencia" id="goToModal3" class="imgAyuda btn">
                    


        </div>

      </div>
      
    </div>
  </div>
</div>





<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">

                <h1 class="titulo-ayuda">¿Cómo Jugar?</h1>


                <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal" aria-label="Close">



            </div>
            <div class="modal-body">
                <div class="texto">
                    Aquí puedes encontrar ayuda sobre cómo jugar nuestros modos de juego. <br>
                    Selecciona el modo en el cual necesitas ayuda.
                </div>


                <div class="contenedor-imgAyuda">

                    


                    

                </div>

            </div>

        </div>
    </div>
</div>

<!-- Modal ayuda CARTAS 2 -->
<div class="modal fade" id="exampleModal-ayuda2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog card moover coloor">
        <div class="modal-content coloor">
            <div class="modal-header">


                <h1 class=" titulo-ayuda">¿Cómo Jugar Cartas?</h1>

            </div>
            <div class="modal-body">

                <div class="texto">
                    1. Se te presentará un tablero con varias cartas boca abajo. <br>
                    2. Elige dos cartas para voltear. Si coinciden, se quedan boca arriba; si no, se vuelven a voltear. <br>
                    3. Intenta recordar la ubicación de las cartas a medida que juegas. <br>
                    4. Sigue volteando cartas hasta encontrar todas las parejas. <br>
                    5. El juego puede tener un límite de tiempo o un número máximo de intentos. <br>
                    6. Encuentra todas las parejas de cartas en el menor tiempo o con la menor cantidad de intentos posible.
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <img src="img/ayuda/ayudaCarta.png" class="imgAyuda2">
                </div>

            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir1">Atras</div>

        </div>
    </div>
</div>

<!-- Modal ayuda SECUENCIA 3 -->
<div class="modal fade" id="exampleModal-ayuda3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
    <div class="modal-dialog  card moover">
        <div class="modal-content coloor">
            <div class="modal-header">

                <h1 class=" titulo-ayuda">¿Cómo Jugar Secuencia?</h1>

            </div>
            <div class="modal-body">
                <div class="texto">
                    1. Memoriza la secuencia: Observa una secuencia de objetos que aparecerá por unos segundos.<br>
                    2. Reordena la secuencia: Después de desaparecer, la secuencia volverá desordenada. Reordénala correctamente.<br>
                    3. Tiempo límite: Tienes un tiempo limitado para completar el reordenamiento.<br>
                    4. Puntos: Ganas puntos por ordenar correctamente y más si lo haces rápido.<br>
                </div>

                <div class="d-flex justify-content-center align-items-center">
                    <img src="img/ayuda/ayudaSecu.png" class="imgAyuda2">
                </div>
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir2">Atras</div>
        </div>
    </div>
</div>

<!-- Modal ayuda ASOCIACION 4 -->
<div class="modal fade" id="exampleModal-ayuda4" tabindex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
    <div class="modal-dialog card moover">
        <div class="modal-content coloor">
            <div class="modal-header">


                <h1 class=" titulo-ayuda">¿Cómo Jugar Asociación?</h1>


            </div>
            <div class="modal-body">
                <div class="texto">
                    Visualiza las imágenes: Se mostrarán 2 columnas, la izquierda con imágenes principales y la derecha con imágenes asociadas. <br>
                    Asocia las imágenes: Haz coincidir cada imagen de la izquierda con la relacionada en la derecha. <br>
                    Tiempo límite: Tienes tiempo limitado para hacer todas las asociaciones. <br>
                    Puntos: Ganas puntos por cada asociación correcta, más si lo haces rápido. <br>
                    Niveles: Las asociaciones serán más difíciles conforme avances. <br>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <img src="img/ayuda/ayudaAsociar.png" class="imgAyuda2">
                </div>
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir3">Atras</div>
        </div>
    </div>
</div>


<div class="offcanvas offcanvas-end" tabindex="-1" id="editarPerfil" aria-labelledby="offcanvasRightLabel">
<div class="cardDos">
        <div class="card__img"><svg xmlns="http://www.w3.org/2000/svg" width="100%">
                <rect fill="#ffffff" width="540" height="450"></rect>
                <defs>
                    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
                        <stop offset="0" stop-color="#ffffff"></stop>
                        <stop offset="1" stop-color="#FC726E"></stop>
                    </linearGradient>
                    <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
                        <g fill-opacity="0.5">
                            <polygon fill="#444" points="90 150 0 300 180 300"></polygon>
                            <polygon points="90 150 180 0 0 0"></polygon>
                            <polygon fill="#AAA" points="270 150 360 0 180 0"></polygon>
                            <polygon fill="#DDD" points="450 150 360 300 540 300"></polygon>
                            <polygon fill="#999" points="450 150 540 0 360 0"></polygon>
                            <polygon points="630 150 540 300 720 300"></polygon>
                            <polygon fill="#DDD" points="630 150 720 0 540 0"></polygon>
                            <polygon fill="#444" points="810 150 720 300 900 300"></polygon>
                            <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
                            <polygon fill="#DDD" points="990 150 900 300 1080 300"></polygon>
                            <polygon fill="#444" points="990 150 1080 0 900 0"></polygon>
                            <polygon fill="#DDD" points="90 450 0 600 180 600"></polygon>
                            <polygon points="90 450 180 300 0 300"></polygon>
                            <polygon fill="#666" points="270 450 180 600 360 600"></polygon>
                            <polygon fill="#AAA" points="270 450 360 300 180 300"></polygon>
                            <polygon fill="#DDD" points="450 450 360 600 540 600"></polygon>
                            <polygon fill="#999" points="450 450 540 300 360 300"></polygon>
                            <polygon fill="#999" points="630 450 540 600 720 600"></polygon>
                            <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
                            <polygon points="810 450 720 600 900 600"></polygon>
                            <polygon fill="#DDD" points="810 450 900 300 720 300"></polygon>
                            <polygon fill="#AAA" points="990 450 900 600 1080 600"></polygon>
                            <polygon fill="#444" points="990 450 1080 300 900 300"></polygon>
                            <polygon fill="#222" points="90 750 0 900 180 900"></polygon>
                            <polygon points="270 750 180 900 360 900"></polygon>
                            <polygon fill="#DDD" points="270 750 360 600 180 600"></polygon>
                            <polygon points="450 750 540 600 360 600"></polygon>
                            <polygon points="630 750 540 900 720 900"></polygon>
                            <polygon fill="#444" points="630 750 720 600 540 600"></polygon>
                            <polygon fill="#AAA" points="810 750 720 900 900 900"></polygon>
                            <polygon fill="#666" points="810 750 900 600 720 600"></polygon>
                            <polygon fill="#999" points="990 750 900 900 1080 900"></polygon>
                            <polygon fill="#999" points="180 0 90 150 270 150"></polygon>
                            <polygon fill="#444" points="360 0 270 150 450 150"></polygon>
                            <polygon fill="#FFF" points="540 0 450 150 630 150"></polygon>
                            <polygon points="900 0 810 150 990 150"></polygon>
                            <polygon fill="#222" points="0 300 -90 450 90 450"></polygon>
                            <polygon fill="#FFF" points="0 300 90 150 -90 150"></polygon>
                            <polygon fill="#FFF" points="180 300 90 450 270 450"></polygon>
                            <polygon fill="#666" points="180 300 270 150 90 150"></polygon>
                            <polygon fill="#222" points="360 300 270 450 450 450"></polygon>
                            <polygon fill="#FFF" points="360 300 450 150 270 150"></polygon>
                            <polygon fill="#444" points="540 300 450 450 630 450"></polygon>
                            <polygon fill="#222" points="540 300 630 150 450 150"></polygon>
                            <polygon fill="#AAA" points="720 300 630 450 810 450"></polygon>
                            <polygon fill="#666" points="720 300 810 150 630 150"></polygon>
                            <polygon fill="#FFF" points="900 300 810 450 990 450"></polygon>
                            <polygon fill="#999" points="900 300 990 150 810 150"></polygon>
                            <polygon points="0 600 -90 750 90 750"></polygon>
                            <polygon fill="#666" points="0 600 90 450 -90 450"></polygon>
                            <polygon fill="#AAA" points="180 600 90 750 270 750"></polygon>
                            <polygon fill="#444" points="180 600 270 450 90 450"></polygon>
                            <polygon fill="#444" points="360 600 270 750 450 750"></polygon>
                            <polygon fill="#999" points="360 600 450 450 270 450"></polygon>
                            <polygon fill="#666" points="540 600 630 450 450 450"></polygon>
                            <polygon fill="#222" points="720 600 630 750 810 750"></polygon>
                            <polygon fill="#FFF" points="900 600 810 750 990 750"></polygon>
                            <polygon fill="#222" points="900 600 990 450 810 450"></polygon>
                            <polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon>
                            <polygon fill="#444" points="180 900 270 750 90 750"></polygon>
                            <polygon fill="#FFF" points="360 900 450 750 270 750"></polygon>
                            <polygon fill="#AAA" points="540 900 630 750 450 750"></polygon>
                            <polygon fill="#FFF" points="720 900 810 750 630 750"></polygon>
                            <polygon fill="#222" points="900 900 990 750 810 750"></polygon>
                            <polygon fill="#222" points="1080 300 990 450 1170 450"></polygon>
                            <polygon fill="#FFF" points="1080 300 1170 150 990 150"></polygon>
                            <polygon points="1080 600 990 750 1170 750"></polygon>
                            <polygon fill="#666" points="1080 600 1170 450 990 450"></polygon>
                            <polygon fill="#DDD" points="1080 900 1170 750 990 750"></polygon>
                        </g>
                    </pattern>
                </defs>
                <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
                <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
            </svg></div>
        <div class="card__avatar fotoPerfil">
            <img id="profileImage" src="#" alt="Foto de perfil">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">
        </div>
        <button class="position-relative translate-middle badge rounded-pill bg-success cosita" onclick="document.getElementById('fileInput').click();">
            <img src="img/iconos/camera.png" alt="" class="position-absolute" width="25">
        </button>
        <div class="card__title usuarioPerfill"></div>
        <div class="card__subtitle">Web Deveent</div>
    </div>
    <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
          <form id="profileForm" novalidate>
            <h1>Editar Perfil</h1>
            <div class="mb-3">
                <label for="txtNombreP" class="form-label">Nombre</label>
                <input type="text" class="form-control labelPerfil" id="txtNombreP" name="txtNombre" required>
            </div>
            <div class="mb-3">
                <label for="txtApellidoP" class="form-label">Apellido</label>
                <input type="text" class="form-control labelPerfil" id="txtApellidoP" name="txtApellido" required>
            </div>
            <div class="mb-3">
                <label for="txtTelefonoP" class="form-label">Teléfono</label>
                <input type="number" class="form-control labelPerfil" id="txtTelefonoP" name="txtTelefono" required>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
        </form>

    </div>
</div>
<!-- Modal Perfil-->
<div class="offcanvas offcanvas-end" tabindex="-1" id="perfil" aria-labelledby="offcanvasRightLabel">
    <div class="cardDos">
        <div class="card__img">
            <img src="img/fondos/perfil3.jpg" id="profileImage2" alt="">
        </div>
        <div class="card__avatar fotoPerfil">
            <img src="#" id="profileImage2" alt="Foto de perfil">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">
        </div>
        <div class="card__title usuarioPerfill"></div>
        <div class="card__subtitle">Web Development</div>
    </div>
    <div class="offcanvas-body">
        <div class="cardDos">
            <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">1.565 Puntos</h5>
        </div>
        <div class="rangosObtenidos">
            <img src="modales/modales/img/rangos/rangoBloqueadoo.png" alt="" width="50">
            <img src="modales/modales/img/rangos/rangoBloqueadoo.png" alt="" width="50">
            <img src="modales/modales/img/rangos/rangoBloqueadoo.png" alt="" width="50">
            <img src="modales/modales/img/rangos/rangoBloqueadoo.png" alt="" width="50">
            <img src="modales/modales/img/rangos/rangoBloqueadoo.png" alt="" width="50">
        </div>
        <br>
        <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">Tus iconos de perfil:</h5>
        <br>
        <div class="modal-profile-items row"></div>
        <br>

        <div class="col-12 row">
            <div class="col-6">
                <label for="nombrePrf" class="form-label">Nombre</label>
                <div id="nombrePrf" class="form-control labelPerfil"></div>
            </div>
            <div class="col-6">
                <label for="apellidoPrf" class="form-label">Apellido</label>
                <div id="apellidoPrf" class="form-control labelPerfil"></div>
            </div>
        </div>
        
        <div class="mb-3">
            <label for="correoPrf" class="form-label">Email</label>
            <div id="correoPrf" class="form-control labelPerfil">Email@ejemplo.com</div>
        </div>

        <div class="col-12 row">
            <div class="col-6">
                <label for="numeroTelef" class="form-label">Teléfono</label>
                <div id="numeroTelef" class="form-control labelPerfil"></div>
            </div>
        </div>
        <br>
        
        <button onclick="cerrarSesion()" class="btn cancelar">
            <div>Cerrar Sesión</div>
        </button>
        
        <!-- Nuevo botón para editar perfil en lugar de eliminar cuenta -->
        <button class="btn" data-bs-toggle="offcanvas" data-bs-target="#editarPerfil" aria-controls="offcanvasBottom">
            <div>Editar Perfil</div>
        </button>
    </div>
</div>

<!-- Modal -->
<div class="modal fade " id="escanerRapido" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog card moveer">
        <div class="modal-content coloor ">
            <div class="modal-header">
                <h1 class="modal-title" id="staticBackdropLabel">Unirse a una sala</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                ...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn cancelar" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Understood</button>
            </div>
        </div>
    </div>
</div>






























<!-- Modal  mapa-->
<div class="modal fade" id="Mapa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg card moveer">
        <div class="modal-content color-mapa">
            <div class="tithe titulo">
                <h1 class="fs-5" id="exampleModalLabel">MAPA DE RECOMPENSAS</h1>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body">
                <table class="tabla-historial-global">
                <thead>
                    <tr>
                        <th>Posición</th>
                        <th>Nombre de Usuario</th>
                        <th>Puntaje Total</th>
                        <th>Mejor Puntaje</th>
                        <th>Nivel Alcanzado</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    <td>1</td>
                        <td>EstrellaGaláctica</td>
                        <td>5000</td>
                        <td>300</td>
                        <td>25</td>
                        <td>2024-11-11</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>LuzNebulosa</td>
                        <td>4800</td>
                        <td>290</td>
                        <td>23</td>
                        <td>2024-11-10</td>
                    </tr>
      
                </tbody>
                </table>
                <form onsubmit="return operaciones()">
                    <label for="txtnumero1" class="tituloMapa">Ingresa tu puntuación:</label>
                    <input type="number" id="txtnumero1"  oninput="validity.valid || (value='');">
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <div class="">
                <button type="button" class="btn" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
    


<!-- Modal tienda -->
<div class="modal fade" id="exampleModal-tienda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog card moveer">
    <div class="modal-content fondo-tienda">
      <div class="modal-header">
        <div class="col-12 row">
          <div class="col-10">
            <h1 class="fs-5 titulo-tienda">Tienda memoryStar</h1>
          </div>
          <div class="col-2">
            <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-tienda" data-bs-dismiss="modal" aria-label="Close">
          </div>
        </div>
      </div>
      <div class="modal-body texto">
        Compra artículos especiales para mejorar tu experiencia en el juego. <br><br>
        <div class="wooden-sign">
          <p class="sign-text2">Iconos de perfil</p>
          <div class="wooden-sign2">
            <div class="number-item3">
              <span class="number">diamantes: 500</span>
              <div class="diamond"></div>
            </div>
          </div>
        </div>
        <hr class="division">
        <div class="store-items row"></div>
      </div>
    </div>
  </div>
  <!-- Contenedor de alerta -->
  <div id="custom-alert" class="custom-alert" style="display:none;">
    <span id="alert-message"></span>
    <button id="close-alert" class="btn-close">X</button>
    </div>
</div>

<!-- Modal compra -->
<div class="modal fade" id="exampleModal-comprar1" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content fondo-tienda">
      <div class="modal-body texto">
        ¿Deseas usar tus diamantes para comprar este ítem?
      </div>
      <div alt="salir" class="btn atras-tienda" id="salir4">Cancelar</div>
      <div alt="salir" class="btn atras-comprar" id="compra1">Comprar</div>
    </div>
  </div>
</div>

 
<!-- Modal Colección -->
<div class="modal fade" id="exampleModal-coleccion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog card moveer">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                <div class="col-12 row">
                    <div class="col-10">
                        <h1 class="fs-5 titulo-tienda">Colección</h1>
                    </div>
                    <div class="col-2">
                    <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-tienda" data-bs-dismiss="modal" aria-label="Close">
                    </div>

                </div>
            </div>
            <div class="modal-body">
                <div id="coleccion-items">
                    <!-- Los artículos comprados se mostrarán aquí -->
                </div>
            </div>
        </div>
    </div>
</div>



<div class="modal fade" id="seguirJugando" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content">

            <div class="modal-body">
                <h1 class="modal-title" id="exampleModalLabel">¿Deseas seguir<br>jugando?</h1>
                <div class="contenedor-SeguirJugando">

                    <div>
                        Usa 10 <img src="img/tablas/rubipuntaje.png" class="rubi-seguir"> para tener otra oportunidad
                    </div>
                    <div id="regresiva" class="mt-3">
                        5s
                    </div>

                </div>

                <div class="contenedor-botonSeguir">
                    <div class="col-6">
                        <button type="button" class=" botonSeguir">Comprar</button>
                    </div>
                    <div class="col-6">
                        <button type="button" class=" botonSeguir" data-bs-dismiss="modal" aria-label="Close">Salir</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--Tabla Multijugador-->



<div class="modal fade" id="tablaMulti" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body">
                <h1 class="modal-title">Tabla Puntuacion</h1>

                <div class="contenedor-tablaMulti">
                    <div>
                        <img src="img/tablas/segundo.png" class="medalla" alt="">
                        <img src="img/tablas/primero.png" class="medalla" alt="">
                        <img src="img/tablas/tercero.png" class="medalla" alt="">
                    </div>

                    <div class="contenedor-user">
                        <img src="img/tablas/usergrande.png" class="foto-user">
                        <img src="img/tablas/usergrande.png" class="foto-user">
                        <img src="img/tablas/usergrande.png" class="foto-user">
                    </div>

                    <div class="contenedor-userPunto">
                        <div class="userPunto">usuario <br> 998 <br>00:00</div>
                        <div class="userPunto">usuario <br> 999<br>00:00</div>
                        <div class="userPunto">usuario <br> 997<br>00:00</div>
                    </div>

                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">4.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">5.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">6.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">7.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">8.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">9.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">10.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>


                </div>

                <div class="contenedor-botonSeguir1">
                    <div class="col-6">
                        <button type="button" class=" botonSeguir">Continuar</button>
                    </div>
                    <div class="col-6">
                        <button type="button" class=" botonSeguir" data-bs-dismiss="modal" aria-label="Close">Salir</button>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<!--Tabla solo-->

<div class="modal fade" id="tablapuntuacionsolo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
        <div class="modal-content contenedorTsolo">
            <div class="tituloTsolo">Puntuación</div>
            <div class="contenedorTsoloInterior">
                <div class="contenedor-estrellas">
                    <img src="img/tablas/Star.png" class="star" alt="">
                    <img src="img/tablas/Star.png" class="star" alt="">
                    <img src="img/tablas/Star.png" class="star" alt="">
                </div>

                <div class="puntaje-total">
                    100
                </div>

                <div class="contenedor-puntaje">
                    <div>+15</div><img src="img/tablas/starpuntaje.png" alt="" class="estrella-puntaje">
                    <div style="margin-left: 50px;">+15</div><img src="img/tablas/rubipuntaje.png" alt="" class="rubi-puntaje">
                </div>

                <div class="col-10 row contenedor-info">
                    <div class="col-6"><img src="..//img/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                    <div class="col-3">00:00</div>
                    <div class="col-3">9999</div>
                </div>

            </div>

            <div class="contenedor-botonTsolo">
                <button class="botonTsolo">Jugar de nuevo</button>
                <button class="botonTsolo" style="margin-left: 20px;" data-bs-dismiss="modal" aria-label="Close">Salir</button>
            </div>
        </div>
    </div>
</div>

`;

// Añadir el modal dentro del contenedor 'fluid'
container.insertAdjacentHTML("afterbegin", modalHTML); // O 'beforeend' según lo que necesites
