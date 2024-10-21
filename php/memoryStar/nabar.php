<!-- nab  -->
<nav class="nav flex-column apartado-iconos">
    <img id="desplegarOpciones" src="img/iconos/opcionesN.png" alt="desplegarOpciones" class="iconos efectosIconos">
    <img id="controlMusica" src="img/iconos/musicaApagada.png" alt="Reproducir" class="iconos efectosIconos">
    <img src="img/iconos/copaN.png" alt="Histórico" class="iconos efectosIconos" data-bs-toggle="modal"
        data-bs-target="#hisorico">
    <img src="img/iconos/ajustesN.png" alt="Ajustes" class="iconos efectosIconos" data-bs-toggle="collapse"
        data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    <!-- <div class=""> -->
    <div class="collapse" id="collapseExample" style="width: 500%;">
        <div class="card card-body color">
            <div class="col-12 row">
                <div class="col-5">Música</div>
                <div class="col-6"><input type="range" class="secondary" id="volumenMusica" min="0" max="1" step="0.1"
                        value="1"></div>
            </div>
            <div class="col-12 row">
                <div class="col-5">Sonido</div>
                <div class="col-6"><input type="range" id="volumenSonido" min="0" max="1" step="0.1" value="1"></div>
            </div>
            <button id="botonSilencio" class="btn btn-primary">Silenciar</button>
        </div>
    </div>
    <!-- </div> -->
    <img src="img/iconos/ayudaN.png" alt="Ayuda" class="iconos efectosIconos" data-bs-toggle="modal"
        data-bs-target="#exampleModal-ayuda">
</nav>
<div class="apartado-derecho">
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <span class="nombre">Usuario</span>
        </li>
        <li class="nav-item usuario">
            <img src="img/iconos/usuario.png" id="profileImage2" alt="user" class="derecho iconos efectosIconos"
                data-bs-toggle="offcanvas" data-bs-target="#perfil" aria-controls="offcanvasRight">
        </li>
    </ul>
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/posicion.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal"
                data-bs-target="#Mapa">
        </li>
    </ul>
    <!-- <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/qr.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#escanerRapido">
        </li>
    </ul> -->
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/tiendaN.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal"
                data-bs-target="#exampleModal-tienda">
        </li>
    </ul>
</div>

<!-- Modal Histórico-->
<div class="modal fade" id="hisorico" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg card moveer">
        <div class="modal-content coloor">
            <div class="tithe titulo">
                <h1 class="fs-5" id="exampleModalLabel">Histórico</h1>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

            <div class="modal-body">
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
            <div class="">
                <button type="button" class="btn" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal ayuda -->
<div class="modal fade" id="exampleModal-ayuda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog card moover coloor">
        <div class="modal-content coloor">
            <div class="modal-header">

                <h1 class="titulo-ayuda">¿Cómo Jugar?</h1>


                <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal"
                    aria-label="Close">



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
                    2. Elige dos cartas para voltear. Si coinciden, se quedan boca arriba; si no, se vuelven a voltear.
                    <br>
                    3. Intenta recordar la ubicación de las cartas a medida que juegas. <br>
                    4. Sigue volteando cartas hasta encontrar todas las parejas. <br>
                    5. El juego puede tener un límite de tiempo o un número máximo de intentos. <br>
                    6. Encuentra todas las parejas de cartas en el menor tiempo o con la menor cantidad de intentos
                    posible.
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
                    2. Reordena la secuencia: Después de desaparecer, la secuencia volverá desordenada. Reordénala
                    correctamente.<br>
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
                    Visualiza las imágenes: Se mostrarán 2 columnas, la izquierda con imágenes principales y la derecha
                    con imágenes asociadas. <br>
                    Asocia las imágenes: Haz coincidir cada imagen de la izquierda con la relacionada en la derecha.
                    <br>
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
        <div class="card__img">
            <img src="img/fondos/perfil3.jpg" id="profileImage2" alt="">
        </div>
        <div class="card__avatar fotoPerfil">
            <img id="profileImage" src="#" alt="Foto de perfil">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">
        </div>
        <button class="position-relative translate-middle badge rounded-pill bg-success cosita"
            onclick="document.getElementById('fileInput').click();">
            <img src="img/iconos/camera.png" alt="" class="position-absolute" width="25">
        </button>
        <div class="card__title ">Cameron Williamson</div>
        <div class="card__subtitle">Web Development</div>
    </div>
    <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
        <form action="pago.php" method="post">
            <h1>Editar Perfil</h1>
            <div class="col">
                <label for="exampleInputEmail1" class="form-label">Nombre</label>
                <input type="text" class="form-control labelPerfil" id="txtNombre" name="txtNombre" required>
            </div>
            <div class="col">
                <label for="exampleInputEmail1" class="form-label">Apellido</label>
                <input type="text" class="form-control labelPerfil" id="txtApellido" name="txtApellido" required>
            </div>
            <div class="col">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="email" class="form-control labelPerfil" id="txtEmail" name="txtEmail" required>
            </div>
            <div class="col">
                <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                <input type="number" class="form-control labelPerfil" id="txtTelefono" name="txtTelefono" required>
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
        <div class="card__title ">Cameron Williamson</div>
        <div class="card__subtitle">Web Development</div>
    </div>
    <div class="offcanvas-body">
        <div class="cardDos">

            <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">1.565 Puntos</h5>
        </div>
        <div class="rangosObtenidos">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
            <img src="img/rangos/rangoBloqueadoo.png" alt="" class="" width="50">
        </div>
        <br>
        <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">Tus iconos de de perfil:</h5>
        <br>
        <div class="modal-profile-items row"></div>
        <br>

        <div class="col-12 row">
            <div class="col-6 ">
                <label for="exampleInputEmail1" class="form-label">Nombre</label>
                <div type="email" class="form-control labelPerfil">Usuario <div type="button" class="editar"
                        data-bs-toggle="offcanvas" data-bs-target="#editarPerfil" aria-controls="offcanvasBottom"
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar Perfil"><img
                            src="img/iconos/editar.png" alt="" width="25"></div>
                </div>
            </div>
            <div class="col-6">
                <label for="exampleInputEmail1" class="form-label">Apellido</label>
                <div type="email" class="form-control labelPerfil">Apellido <div type="button" class="editar"
                        data-bs-toggle="offcanvas" data-bs-target="#editarPerfil" aria-controls="offcanvasBottom"
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar Perfil"><img
                            src="img/iconos/editar.png" alt="" width="25"></div>
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <div type="email" class="form-control labelPerfil">Email@ejemplo.com <div type="button" class="editar"
                    data-bs-toggle="offcanvas" data-bs-target="#editarPerfil" aria-controls="offcanvasBottom"
                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar Perfil"><img
                        src="img/iconos/editar.png" alt="" width="25"></div>
            </div>
        </div>
        <div class="col 12 row">
            <div class="col-6">
                <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                <div type="email" class="form-control labelPerfil">1234567890 <div type="button" class="editar"
                        data-bs-toggle="offcanvas" data-bs-target="#editarPerfil" aria-controls="offcanvasBottom"
                        data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Editar Perfil"><img
                            src="img/iconos/editar.png" alt="" width="25"></div>
                </div>
            </div>
        </div>
        <br>
        <button class="btn cancelar">
            <div>Cerrar Sesión</div>
        </button>
        <button class="btn">
            <div>Eliminar Cuenta</div>
        </button>
    </div>
</div>

<!-- Modal -->
<div class="modal fade " id="escanerRapido" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
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





<!-- Modal -->
<div class="modal fade" id="Mapa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog ">
        <div class="modal-content cuerpoMapa ">
            <div class="modal-header">
                <h1 class="modal-title fs-5  tituloMapa" id="staticBackdropLabel">MAPA DE RECOMPENSAS</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
                <div class="containerMapa">
                    <div class="barra-containerMapa">
                        <div class="barra-progreso" id="barra-progreso"></div>
                    </div>
                    <div class="recompensa primera">
                        <img src="img/rangos/rangoBloqueadoo.png" alt="" class="imagenMapa rango">
                    </div>
                    <div class="recompensa segunda">
                        <img src="img/rangos/rangoBloqueadoo.png" alt="" class="imagenMapa rango">
                    </div>
                    <div class="recompensa tercera">
                        <img src="img/rangos/rangoBloqueadoo.png" alt="" class="imagenMapa rango">
                    </div>
                    <div class="recompensa cuarta">
                        <img src="img/rangos/rangoBloqueadoo.png" alt="" class="imagenMapa rango">
                    </div>
                    <div class="recompensa quinta">
                        <img src="img/rangos/rangoBloqueadoo.png" alt="" class="imagenMapa rango">
                    </div>

                </div>

                <form onsubmit="return operaciones()">
                    <label for="txtnumero1" class="tituloMapa">Ingresa tu puntuación:</label>
                    <input type="number" id="txtnumero1">
                    <button type="submit">Enviar</button>
                </form>
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
                        <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-tienda"
                            data-bs-dismiss="modal" aria-label="Close">
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
<div class="modal fade" id="exampleModal-comprar1" tabindex="-1" aria-labelledby="exampleModalLabel2"
    aria-hidden="true">
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
                        <button type="button" class=" botonSeguir" data-bs-dismiss="modal"
                            aria-label="Close">Salir</button>
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
                        <div class="col-6">4.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">5.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">6.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">7.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">8.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">9.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>
                    <div class="col-10 row contenedor-infoMulti">
                        <div class="col-6">10.<img src="img/tablas/fotouser.png" alt="" style="width: 20px;">Usuario
                        </div>
                        <div class="col-3">00:00</div>
                        <div class="col-3">9999</div>
                    </div>


                </div>

                <div class="contenedor-botonSeguir1">
                    <div class="col-6">
                        <button type="button" class=" botonSeguir">Continuar</button>
                    </div>
                    <div class="col-6">
                        <button type="button" class=" botonSeguir" data-bs-dismiss="modal"
                            aria-label="Close">Salir</button>
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<!--Tabla solo-->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tablapuntuacionsolo">
    Launch demo modal
</button>

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

                <div id="puntosSecu1" class="puntaje-total">
                    100
                </div>

                <div class="contenedor-puntaje">

                    <div>+15</div><img src="img/tablas/rubipuntaje.png" alt="" class="rubi-puntaje">
                </div>

                <div class="col-10 row contenedor-info">
                    <div class="col-6"><img src="..//img/fotouser.png" alt="" style="width: 20px;">Usuario</div>
                    <div class="col-3">00:00</div>
                    <div class="col-3">9999</div>
                </div>

            </div>

            <div class="contenedor-botonTsolo">
                <!-- <button class="botonTsolo">Jugar de nuevo</button> -->
                <button class="botonTsolo" style="margin-left: 20px;" data-bs-dismiss="modal"
                    aria-label="Close">Aceptar</button>
            </div>
        </div>
    </div>
</div>