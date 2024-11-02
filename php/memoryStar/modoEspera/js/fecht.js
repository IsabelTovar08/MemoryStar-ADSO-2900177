const conteUsuario = document.querySelector('.body-linea'); // Selecciona el elemento con la clase body-linea
const conterUsuario = document.querySelector('.contenedor-usuario')
document.addEventListener('DOMContentLoaded',function(){
    fetch('json/usuario.json')
    .then(response => response.json())
    .then(data => {
    data.forEach(usuario => {
            const html =`
            <div class="contenedor-usuario">

                <div class="usuario">
                        <div class="posicion-perfil">
                                <div class="perfil">
                                    <img src="${usuario.img}" alt="perfil">
                                </div>
                        </div>
                        <div class="contexto-usuario">
                            <div class="        font-size: .8em !important;">
                                <div class="nombre">
                                    <h2>${usuario.nombre}</h2>
                                </div>
                            <div class="descripcion">
                                <h6>${usuario.descripcion}</h6>
                            </div>
                        </div>
                        <div class="conte-diamante-img">
                            <div class="diamante">
                                <img src="${usuario.imgMoneda}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            `
            
            conteUsuario.innerHTML += html
          
    });
    })
    .catch(error => console.error('Error:', error));
})

function lentitud(valor){
    
}