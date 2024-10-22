document.addEventListener('DOMContentLoaded', function () {

function cartasFacil(){
    let mostrar = "";
    mostrar += `

        
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
            </div>




            <div class="contenedorCartas">
                <div class="carta"  data-id="ave">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/ave.jpg
                        " class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>
                <div class="carta" data-id="vaca">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/vaca.jpg
                        " class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>
                <div class="carta"  data-id="koala">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/koala.jpg" class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>
                <div class="carta"  data-id="leon">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/leon.jpg" class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>
                <div class="central">
                    <img src="img/logoNuevo1.png" class="imagen2">
                </div>
                <div class="carta" data-id="ave">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/ave.jpg
                        " class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>   
                <div class="carta" data-id="vaca">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/vaca.jpg
                        " class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>
                <div class="carta" data-id="koala">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/koala.jpg" class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>
                <div class="carta" data-id="leon">
                    <div class="cara reverso">
                        <img src="img/cartasAnimales/leon.jpg" class="imagen">
                    </div>
                    <div class="cara frente">
                        <img src="img/Cartalogorehecha.png" class="imagen" alt="Reverso">
                    </div>
                </div>

            </div>`;


    document.getElementById('juegoCartas').innerHTML = mostrar;


};
document.getElementById('generarCartasBtn').addEventListener('click', cartasFacil);


});