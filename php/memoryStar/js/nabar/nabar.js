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
        <div class="card card-body color tama">
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
            <img src="img/iconos/usuario.png" id="profileImage2" alt="user" class="derecho iconos efectosIconos ponerimagenPerfilusuario1" data-bs-toggle="offcanvas" data-bs-target="#perfil" aria-controls="offcanvasRight">
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
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/codigo-qr.png" alt="user" class="derecho iconos efectosIconos" data-bs-toggle="modal" data-bs-target="#qrMemory">
        </li>
    </ul>
    <ul class="nav justify-content-end">
        <li class="nav-item usuario">
            <img src="img/iconos/pCompleta3.png" alt="user" class="derecho iconos efectosIconos" id="pCompleta">
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







<!-- Modal ayuda CARTAS 2 -->
<div class="modal fade" id="exampleModal-ayuda2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog princ">
    <div class="modal-content sec">
      <div class="modal-header">
        <h5 class="modal-title titulo-ayuda" id="exampleModalLabel">¿Como Jugar PlanetScape?</h5>
        <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal" aria-label="Close">
        
      </div>
      <div class="modal-body bod">
        <div class="textoEx">
            <strong>ARMA TU NAVE:</strong> <br>
            Objetivo: Tu tarea es encontrar parejas de cartas. Al hacerlo, deberás recordar un orden 
            específico que se actualizará en cada ronda. <br>
            Desarrollo: Te transportas a un mundo espacial donde debes recolectar piezas perdidas 
            de una nave espacial. Sin embargo, estarás en un entorno con limitaciones como la falta de oxígeno, 
            lo que añade presión para regresar a la Tierra.<br>
            Desafío adicional: Después de recolectar las piezas, deberás organizarlas en la nave según el orden de 
            las cartas que has memorizado. El desafío radica en que el orden cambia con cada ronda, así que tendrás 
            que mantener tu concentración para completar la misión con éxito.<br><br>
            <strong>DERROTA EL ENEMIGO:</strong> <br>
            Objetivo: Aquí necesitarás ser ágil para recolectar materiales y ensamblar herramientas que te permitan defenderte.<br>
            Desarrollo: Un enemigo te está infligiendo daño constantemente, y tendrás que derrotarlo antes de que logre escapar. 
            Esto implica no solo enfrentarte al enemigo, sino también gestionar eficientemente el tiempo y los recursos que tienes 
            a tu disposición para crear las herramientas necesarias para tu defensa.
        </div>
        <div class="contenedor-imgAyuda">
            
                    


        </div>
        <div alt="salir" class="btn atras-ayuda" id="salir1">Atras</div>
      </div>
      
    </div>
  </div>
</div>

<!-- Modal ayuda SECUENCIA 3 -->
<div class="modal fade" id="exampleModal-ayuda3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog princ">
    <div class="modal-content sec">
      <div class="modal-header">
        <h5 class="modal-title titulo-ayuda" id="exampleModalLabel">¿Como Jugar Memorix?</h5>
        <img src="img/iconos/botonSalir.png" alt="salir" class="btn salir-ayuda" data-bs-dismiss="modal" aria-label="Close">
        
      </div>
      <div class="modal-body bod">
        <div class="textoEx">
            1. Observa una secuencia de objetos que aparecerá por unos segundos.<br>
            2. Después de desaparecer, la secuencia volverá desordenada. Reordénala correctamente.<br>
            3. Tienes un tiempo limitado para completar el reordenamiento.<br>
            4. Ganas puntos por ordenar correctamente y más si lo haces rápido.<br>
        </div>
        <div class="contenedor-imgAyuda">
            
                    


        </div>
        <div alt="salir" class="btn atras-ayuda" id="salir2">Atras</div>
      </div>
      
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
                    1. Se mostrarán 2 columnas, la izquierda con imágenes principales y la derecha con imágenes asociadas. <br>
                    2. Haz coincidir cada imagen de la izquierda con la relacionada en la derecha. <br>
                    3. Tienes tiempo limitado para hacer todas las asociaciones. <br>
                    4. Ganas puntos por cada asociación correcta, más si lo haces rápido. <br>
                    5. Las asociaciones serán más difíciles conforme avances. <br>
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
            <img id="profileImage" src="" alt="Foto de perfil">
        </div>
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
                <input type="text" class="labelPerfil" id="txtNombreP" name="txtNombre" required>
            </div>
            <div class="mb-3">
                <label for="txtApellidoP" class="form-label">Apellido</label>
                <input type="text" class="labelPerfil" id="txtApellidoP" name="txtApellido" required>
            </div>
            <div class="mb-3">
                <label for="txtTelefonoP" class="form-label">Teléfono</label>
                <input type="number" class="labelPerfil" id="txtTelefonoP" name="txtTelefono" required>
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
        <div class="card__avatar fotoPerfil1" id="ponerFoto">
            <img src="" alt="foto de perfil" class="ponerimagenPerfilusuario2">
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
        <div>
            <h5 class="offcanvas-title perfil" id="offcanvasRightLabel">Tus iconos de perfil:</h5>
            <div id="productourls">
            <div id="productourls-table">
                <div class="productourls-table-contenedor">
                
                </div>
            </div>
            </div>

        </div>
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






























<!-- Modal  mapa, los estilo estaba en estilosInicio.css-->
<div class="modal fade" id="Mapa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg card moveer">
        <div class="modal-content color-mapa">
            <div class="tithe titulo">
                <h1 class="fs-5" id="exampleModalLabel">RANKING MEMORYSTAR</h1>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-body container-tabla-recompensa">
                <table class="tabla-historial-global">
                    <thead class="mapa-cabeza">
                        <tr>
                            <th>Posición</th>
                            <th>Nombre de Usuario</th>
                            <th>Puntaje Total</th>
                            <th>Diamantes</th>
                            <th>Nivel Alcanzado</th>
                            <th>Fecha de Inicio</th>
                        </tr>
                    </thead>
                    <tbody class="cuerpo-tabla-historial">
                      

        
                    </tbody>
                </table>
                
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
                    <p class="descripcion-tienda">Compra artículos especiales para mejorar tu experiencia en el juego. </p>
                    <div class="wooden-sign">
                        <div class="wooden-sign2">
                            <div class="number-item3">
                                <span class="sign-text2">Iconos de perfil</span>
                                <span class="number"><div id="diamond-count"></div> <div class="diamond"></div></span>
                            </div>
                        </div>
                    </div>
                    <div class="store-items row"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- Contenedor de alerta -->
    <div id="custom-alert" class="custom-alert" style="display: none;">
        <span id="alert-message"></span>
        <button id="close-alert" class="btn-close">X</button>
    </div>
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

<!-- Modal QR MEMORY -->
  <div class="modal fade" id="qrMemory" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content forma-contenedor">
        <div class="modal-header forma-header">
          <h1 class="modal-title forma-title fs-5" id="staticBackdropLabel">Codigo QR</h1>
          <button type="button" class="btn-close forma-cerrar" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body forma-body">
          <div id="QR"></div>
        </div>
        <div class="modal-footer forma-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
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
