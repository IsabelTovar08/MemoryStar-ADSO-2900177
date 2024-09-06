<!-- nab  -->
<nav class="nav flex-column apartado-iconos">
    <img id="controlMusica" src="img/iconos/sonido-apagadoo.png" alt="Reproducir" class="iconos efectosIconos">
    <img src="img/iconos/trofeo.png" alt="Histórico" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#hisorico">
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
        <li class="nav-item" >
            <span class="nombre">Usuario</span>
        </li>
        <li class="nav-item usuario">
            <img src="img/iconos/usuario.png" alt="user" class="iconos efectosIconos" data-bs-toggle="offcanvas" data-bs-target="#perfil" aria-controls="offcanvasRight">
        </li>
    </ul>
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/mapa.png" alt="user" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#Mapa">
        </li>
    </ul>
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/qr.png" alt="user" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#escanerRapido">
        </li>
    </ul>
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/carrito.png" alt="user" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal-tienda">
        </li>
    </ul>
</div>

<!-- Modal Histórico-->
<div class="modal fade" id="hisorico" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg ">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="fs-5 titulo-ayuda" id="exampleModalLabel">Histórico</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
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
            <div class="modal-footer">
                <button type="button" class="btn color" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal ayuda -->
<div class="modal fade" id="exampleModal-ayuda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content fondo-ayuda">
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
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
               
                
                 <h1 class=" titulo-ayuda">¿Cómo Jugar?</h1>
                 
            </div>
            <div class="modal-body">
                
                <div class="texto">
                    En el modo de juego de cartas tu objetivo es encontrar las parejas de cartas iguales
                </div>

                <img src="img/ayuda/ayudaCarta.png" class="imgAyuda2">
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir1">Atras</div>
            
        </div>
    </div>
</div>

<!-- Modal ayuda SECUENCIA 3 -->
<div class="modal fade" id="exampleModal-ayuda3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                
                <h1 class=" titulo-ayuda">¿Cómo Jugar?</h1>
                
            </div>
            <div class="modal-body">
                <div class="texto">
                    SECUENCIA
                </div>
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir2">Atras</div>
        </div>
    </div>
</div>

<!-- Modal ayuda ASOCIACION 4 -->
<div class="modal fade" id="exampleModal-ayuda4" tabindex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                
                    
                <h1 class=" titulo-ayuda">¿Cómo Jugar?</h1>
                       
                
            </div>
            <div class="modal-body">
                <div class="texto">
                        ASOCIACIÓN
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
            
            <div><img src="img/iconos/editar.png" alt="" width="25"></div>
            <div class="col-6 editar">Editar Perfil</div>
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

<!-- Modal -->
<div class="modal fade" id="escanerRapido" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Unirse a una sala</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>





<!-- Modal -->
<div class="modal fade" id="Mapa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog ">
    <div class="modal-content cuerpoMapa ">
      <div class="modal-header">
        <h1 class="modal-title fs-5  tituloMapa" id="staticBackdropLabel" >MAPA DE RECOMPENSAS</h1>
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
                <label for="txtnumero1">Ingresa tu puntuación:</label>
                <input type="number" id="txtnumero1">
                <button type="submit">Enviar</button>
            </form>
      </div>
    </div>
  </div>
</div>

<!-- Modal tienda -->
<div class="modal fade" id="exampleModal-tienda" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                <div class="col-12 row">
                    <div class="col-10">
                        <h1 class="fs-5 titulo-ayuda">Tienda memoryStar</h1>
                    </div>
                    <div class="col-2">
                        <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal" aria-label="Close">
                    </div>
                    
                </div>
            </div>
            <div class="modal-body texto">

            Compra artículos especiales para mejorar tu experiencia en el juego. <br>
            
              <br>
              <div class="icon-perfil">
                    <div class="wooden-sign">
                      <p class="sign-text">Iconos de perfil</p>
                    </div>
                    <hr class="division">
              </div>
            <br>
            <div class="col-12 row">
                    <div class="col-4"> 
                        <img src="img/iconos/perfil1.png" alt="cartas" id="goToModal2" class="imgTienda btn">
                        <div class="modal-body texto">

                    <div class="number-item">
                        <span class="number">115</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/perfil2.png" alt="secuencia" id="goToModal3" class="imgTienda btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">130</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/perfil3.png" alt="asociacion" id="goToModal4" class="imgTienda btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">155</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 row">
                    <div class="col-4"> 
                        <img src="img/iconos/perfil4.png" alt="cartas" id="goToModal2" class="imgTienda btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">167</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/perfil5.png" alt="secuencia" id="goToModal3" class="imgTienda btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">172</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/perfil6.png" alt="asociacion" id="goToModal4" class="imgTienda btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">185</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                </div>
                <div class="icon-perfil">
                <br>
                <div class="wooden-sign"> 
                    <p class="sign-text">Fondos de pantalla</p>
                    </div>
                    <hr class="division">
                </div>

               <br> <div class="col-12 row">
                    <div class="col-4"> 
                        <img src="img/iconos/pantalla1.png" alt="cartas" id="goToModal2" class="imgTiendaF btn">
                        <div class="modal-body texto">

                    <div class="number-item">
                        <span class="number">130</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/pantalla2.png" alt="secuencia" id="goToModal3" class="imgTiendaF btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">165</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/pantalla4.png" alt="asociacion" id="goToModal4" class="imgTiendaF btn">
                        <div class="modal-body texto">
                    <div class="number-item">
                        <span class="number">190</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn">Comprar</button>
                        </div>
                    </div>
                </div>
                <div class="icon-perfil">
                <br>
                <div class="wooden-sign"> 
                    <p class="sign-text">Poderes</p>
                    </div>
                    <hr class="division">
                </div>

               <br> <div class="col-12 row">
                    <div class="col-6"> 
                        <img src="img/iconos/poder1.png" alt="cartas" id="goToModal2" class="imgTienda btn">
                        <p class="text-po">Congelar tiempo</p>
                        <div class="modal-body texto">

                    <div class="number-item2">
                        <span class="number">220</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn2">Comprar</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <img src="img/iconos/poderes2.png" alt="secuencia" id="goToModal3" class="imgTienda">
                        <p class="text-po">Revelar cartas</p>
                        <div class="modal-body texto">
                    <div class="number-item2">
                        <span class="number">265</span>
                        <div class="diamond"></div>
                    </div>
                        <button class="buy-btn2">Comprar</button>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</div>
                
     


        
