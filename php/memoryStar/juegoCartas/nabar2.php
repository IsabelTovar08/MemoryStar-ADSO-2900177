<!-- nab  -->
<nav class="nav flex-column apartado-iconos">
    <img id="controlMusica" src="../../img/iconos/sonido-apagadoo.png" alt="Reproducir" class="iconos efectosIconos">
    <img src="../../img/iconos/trofeo.png" alt="Histórico" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal">
    <div class="ajustes">
        <img src="../../img/iconos/ajustes.png" alt="Ajustes" class="iconos efectosIconos" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
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
    <img src="../../img/iconos/ayuda.png" alt="Ayuda" class="iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#exampleModal">
</nav>
<ul class="nav justify-content-end">
    <li class="nav-item">
        <div class="nombre">Usuario</div>
    </li>
    <li class="nav-item">
        <img src="../../img/iconos/usuario.png" alt="user" class=" usuario  iconos efectosIconos"   data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    </li>
</ul>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg ">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="fs-5 titulo-ayuda" id="exampleModalLabel">¿Cómooooo  Jugar?</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div  id="resultados"></div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn color" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<div class="contenedorCabeza">
        <h1 class="tituloCabeza">CARTAS</h1>
        <div class="figuras">
            <div class="figuras-arriba">
                <div class="rectangulo">
                    <img src="../../img/imagenesCabeza/estrella.png" class="estrella">
                    <span class="numero1">67</span>
                </div>
                <div class="rombo">
                    <img src="../../img/imagenesCabeza/Polygon 1poligono.png" alt="">
                    <span class="numeroRombo">77</span>
                </div>
                <div class="rectangulo">
                    <span class="numero2">99</span>
                    <img src="../../img/imagenesCabeza/diamante.png" class="estrella">
                </div>
            </div>
            <div class="figuras-abajo">
                <div class="figura-abajo">
                    <img src="../../img/imagenesCabeza/bombillo.png" >
                </div>
                <div class="figura-abajo">
                    <img src="../../img/imagenesCabeza/segundo diamante .png">
                </div>
            </div>
        </div>
    </div>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="container">
                    <div class="col-12 row">
                        <div class="col-4">
                            <button type="button" class="btn btn-primary col-4" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                        <div class="col-4">
                            <div class="col-4 comentario">Perfil</div>
                        </div>
                        <div class="col-4">
                            <div class="col-4 izquierdaLogo">
                                <img src="img/iconos/logoMemory.png" class="izquierdaLogo">
                            </div>
                        </div>
                    </div>
                    <div class="containerFoto">
                        <div class="fotoPerfil">
                            <!-- Foto de perfil -->
                            <img id="profileImage" src="#" alt="Foto de perfil">
                            <input type="file" id="fileInput" accept="image/*" style="display: none;">
                        </div>
                        <button type="button" class="btn btn-secondary" onclick="document.getElementById('fileInput').click();">Añadir foto</button>
                        <button type="button" class="btn btn-danger" id="removePhotoButton" style="display: none;">Quitar foto</button>
                    </div>
                    <div class="container2">
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
                        <div class="col-12 row ancho">
                            <div class="vacio col-12"></div>
                        </div>
                        <div class="col-11 row ancho">
                            <div class="tituloTabla col-11"></div>
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
                </div>
            </div>
        </div>
    </div>
</div>