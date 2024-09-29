<!-- nab  -->
<nav class="nav flex-column apartado-iconos">
    <img id="controlMusica" src="img/iconos/sonido-apagadoo.png" alt="Reproducir" class="iconos efectosIconos">
    <img src="img/iconos/ajustes.png" alt="Ajustes" class="iconos efectosIconos" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
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
    <img src="img/iconos/ayuda.png" alt="Ayuda" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">
</nav>
<div class="apartado-derecho">
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <span class="nombre">Usuario</span>
        </li>
        <li class="nav-item usuario">
            <img src="img/iconos/usuario.png" alt="user" class="iconos efectosIconos" data-bs-toggle="offcanvas" data-bs-target="#perfil" aria-controls="offcanvasRight">
        </li>
    </ul>
    
</div>



<!-- Modal ayuda -->
<div class="modal fade" id="exampleModal-ayuda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog card moover coloor">
        <div class="modal-content coloor">
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

                    <img src="img/iconos/botonCarta.png" alt="cartas" id="goToModal2" class="imgAyuda btn">


                    <img src="img/iconos/botonSecuencia.png" alt="secuencia" id="goToModal3" class="imgAyuda btn">


                    <img src="img/iconos/botonAsociacion.png" alt="asociacion" id="goToModal4" class="imgAyuda btn">

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



<!-- Modal Perfil-->
<div class="offcanvas offcanvas-end" tabindex="-1" id="perfil" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">Usuario</h5>
        <h5 class="offcanvas-title" id="offcanvasRightLabel">Rango</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <div class="fotoPerfil position-relative">
            <!-- Foto de perfil -->
            <img id="profileImage" src="#" alt="Foto de perfil">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">
        </div>
        <button class="position-relative translate-middle badge rounded-pill bg-success cosita" onclick="document.getElementById('fileInput').click();">
            <img src="img/iconos/camera.png" alt="" class="position-absolute" width="25">
        </button>
        <button type="button" class="btn btn-danger" id="removePhotoButton" style="display: none;">Quitar foto</button>
        <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">1.565 estrellas</h5>
        <div class="rangosObtenidos">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
        </div>


        <!-- <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2">
            <span class="input-group-text" id="basic-addon2"><img src="img/iconos/camera.png" alt="" class="position-absolute" width="25"></span>
        </div> -->

        <div class="col-12 row">
            <div class="col-6">
                <label for="exampleInputEmail1" class="form-label">Nombre</label>
                <div type="email" class="form-control" id="exampleInputEmail1">Usuario</div>
            </div>
            <div class="col-6">
                <label for="exampleInputEmail1" class="form-label">Apellido</label>
                <div type="email" class="form-control" id="exampleInputEmail1">Apellido</div>
            </div>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <div type="email" class="form-control" id="exampleInputEmail1">Email@ejemplo.com</div>
        </div>
        <div class="col 12 row">
            <div class="col-6">
                <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                <div type="email" class="form-control" id="exampleInputEmail1">1234567890</div>
            </div>

            <div class="col-6 row editar-perfil">
                <div class="col-2"><img src="img/iconos/editar.png" alt="" width="25"></div>
                <div class="col-10 editar">Editar Perfil</div>
            </div>
        </div>
        <button class="btn btn-primary">
            <div>Cerrar Sesión</div>
        </button>
        <button class="btn btn-danger">
            <div>Eliminar Cuenta</div>
        </button>
    </div>
</div>

<div class="modal fade" id="perfiu" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="fs-5 titulo-ayuda perfil" id="exampleModalLabel">Perfil</h1>
                <img src="img/iconos/segundoMemory.png" alt="logo" width="50">
            </div>
            <div class="modal-body">
                <a href="login.php">Login</a>
                <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click();">Añadir foto</button>
                <button type="button" class="btn btn-danger" id="removePhotoButton" style="display: none;">Quitar foto</button>
                <div class="col-9 row ancho">
                    <div class="contenidoPerfil col-5">
                        <input type="text" class="form-control perfil-input" placeholder="Nombre usuario">
                    </div>
                    <div class="contenidoPerfil col-4">
                        <input type="text" class="form-control perfil-input" placeholder="Apodo">
                    </div>
                </div>
                <div class="col-5 row ancho">
                    <div class="contenidoPerfil col-5">
                        <input type="email" class="form-control perfil-input" placeholder="Correo">
                    </div>
                </div>
                <div class="tabla">
                    <div class="col-10 row espacioInicioTabla">
                        <div class="col-6">
                            <span>Últimas partidas</span>
                        </div>
                        <div class="col-3">
                            <span>Tiempo</span>
                        </div>
                        <div class="col-3">
                            <span>Puntos</span>
                        </div>
                    </div>
                    <div class="col-10 row espaciosTabla">
                        <div class="col-6">
                            <span>Partida 009</span>
                        </div>
                        <div class="col-3">
                            <span>00:00</span>
                        </div>
                        <div class="col-3 puntos">
                            <span>000</span>
                        </div>
                    </div>
                    <div class="col-10 row espaciosTabla">
                        <div class="col-6">
                            <span>Partida 008</span>
                        </div>
                        <div class="col-3">
                            <span>00:00</span>
                        </div>
                        <div class="col-3 puntos">
                            <span>000</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn color" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>





            
<!--Seguir Jugando-->

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

            <div class="contenedor-tablaMulti" style="background-image: url(img/tablas/fondomulti.png);">
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
        <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content contenedorTsolo">
            <div class="tituloTsolo">Puntuación</div>
            <div class="contenedorTsoloInterior" style="background-image: url('img/tablas/fondosolo.png');">
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
                <button class="botonTsolo" style="margin-left: 20px;"data-bs-dismiss="modal" aria-label="Close">Salir</button>
            </div>
        </div>
        </div>
    </div>
     


        
