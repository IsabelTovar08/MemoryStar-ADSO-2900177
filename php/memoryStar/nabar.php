<!-- nab  -->
<nav class="nav flex-column apartado-iconos">
    <img id="controlMusica" src="img/iconos/sonido-apagadoo.png" alt="Reproducir" class="iconos efectosIconos">
    <img src="img/iconos/trofeo.png" alt="Histórico" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#hisorico">
    <div class="ajustes">
        <img src="img/iconos/ajustes.png" alt="Ajustes" class="iconos efectosIconos" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        <div class="collapse" id="collapseExample">
            <div class="card card-body col-5 color">
                <div class="col-12 row">
                    <div class="col-6">Música</div>
                    <div class="col-6"><input type="range" id="volumenMusica" min="0" max="1" step="0.1" value="1"></div>
                </div>
                <div class="col-12 row">
                    <div class="col-6">Sonido</div>
                    <div class="col-6"><input type="range" id="volumenSonido" min="0" max="1" step="0.1" value="1"></div>
                </div>
                <button id="botonSilencio" class="btn btn-primary">Silenciar</button>
            </div>
        </div>
    </div>
    <img src="img/iconos/ayuda.png" alt="Ayuda" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal-ayuda">
</nav>
<ul class="nav justify-content-end">
    <li class="nav-item">
        <div class="nombre">Usuario</div>
    </li>
    <li class="nav-item">
        <img src="img/iconos/usuario.png" alt="user" class="usuario iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    </li>
</ul>

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
    <div class="modal-dialog">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                <div class="col-12 row">
                    <div class="col-10">
                        <h1 class="fs-5 titulo-ayuda">¿Cómo Jugar?</h1>
                    </div>
                    <div class="col-2">
                        <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal" aria-label="Close">
                    </div>
                    
                </div>
            </div>
            <div class="modal-body texto">

                Aquí puedes encontrar ayuda sobre cómo jugar nuestros modos de juego. <br>
                Selecciona el modo en el cual necesitas ayuda.
                
                <div class="col-12 row">
                    <div class="col-4">
                        <img src="img/iconos/botonCarta.png" alt="cartas" id="goToModal2" class="imgAyuda btn">
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/botonSecuencia.png" alt="secuencia" id="goToModal3" class="imgAyuda btn">
                    </div>
                    <div class="col-4">
                        <img src="img/iconos/botonAsociacion.png" alt="asociacion" id="goToModal4" class="imgAyuda btn">
                    </div>
                </div>

            </div>

        </div>
    </div>
</div>

<!-- Modal ayuda CARTAS 2 -->
<div class="modal fade" id="exampleModal-ayuda2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
               
                <div class="col-12 row">
                    <div class="col-10">
                        <h1 class="fs-5 titulo-ayuda">¿Cómo Jugar?</h1>
                    </div>
                    <div class="col-2">
                    </div>    
                </div>
            </div>
            <div class="modal-body texto">
                
                En el modo de juego de cartas tu objetivo es encontrar las parejas de cartas iguales

                <img src="img/ayuda/ayudaCarta.png" class="imgAyuda2">
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir1">Atras</div>
            
        </div>
    </div>
</div>

<!-- Modal ayuda SECUENCIA 3 -->
<div class="modal fade" id="exampleModal-ayuda3" tabindex="-1" aria-labelledby="exampleModalLabel3" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                <div class="col-12 row">
                    <div class="col-10">
                        <h1 class="fs-5 titulo-ayuda">¿Cómo Jugar?</h1>
                    </div>
                    <div class="col-2">
                        <!-- Botón de cerrar (si lo necesitas) -->
                    </div>    
                </div>
            </div>
            <div class="modal-body texto">
                SECUENCIA
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir2">Atras</div>
        </div>
    </div>
</div>

<!-- Modal ayuda ASOCIACION 4 -->
<div class="modal fade" id="exampleModal-ayuda4" tabindex="-1" aria-labelledby="exampleModalLabel4" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content fondo-ayuda">
            <div class="modal-header">
                <div class="col-12 row">
                    <div class="col-10">
                        <h1 class="fs-5 titulo-ayuda">¿Cómo Jugar?</h1>
                    </div>
                    <div class="col-2">
                        <!-- Botón de cerrar (si lo necesitas) -->
                    </div>    
                </div>
            </div>
            <div class="modal-body texto">
                ASOCIACION
            </div>
            <div alt="salir" class="btn atras-ayuda" id="salir3">Atras</div>
        </div>
    </div>
</div>



<!-- Modal Perfil-->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
    <div class="modal-content">
            <div class="modal-header">
                <h1 class="fs-5 titulo-ayuda" id="exampleModalLabel">Perfil</h1>
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