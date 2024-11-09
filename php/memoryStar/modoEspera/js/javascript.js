// // mandar el mensaje
// const nombre = [];



// document.addEventListener('DOMContentLoaded',function(){
//     fetch('../json/usuario.json')
//     .then(response => response.json())
//     .then(data => {
//     data.forEach(user => {
//             nombre.push(user.nombre)
//     });
//     })
//     .catch(error => console.error('Error:', error));
// })



// function enviarMensaje(){
//     const comentario = document.querySelector('.mensaje').value
//     const mostrar = document.querySelector('.ver-mensaje')
//     mostrar.innerHTML += `<div>
//                             <div><b>${nombre[0]}</b></div>
//                             <div>${comentario}</div>
//                             </div>`;
// }


// function salir(){
//     alert('salidar')
//     window.location.href = '#' // poner enlaces
// }




// deslizar elementos

const bottomIniciar = document.querySelector('.botton-iniciar')

function comienzaEn(){
    const div = document.createElement('div');
    div.classList.add('div-comienza');
    setTimeout(()=>{
        div.innerHTML = `
            <div class='capa'>
                <div class="contenedo-comenzar">
                    <div class="comenzar-titulo">
                        <h3>Comienza en:</h3>
                    </div>
                    <div class="comienza-contador">
                        <h4>3</h4>
                    </div>
                </div>
            </div>
        `;
    },1000)
    document.querySelector('body').appendChild(div)
    setTimeout(()=>{
        div.innerHTML = `
            <div class='capa'>
                <div class="contenedo-comenzar">
                    <div class="comenzar-titulo">
                        <h3>Comienza en:</h3>
                    </div>
                    <div class="comienza-contador">
                        <h4>2</h4>
                    </div>
                </div>
            </div>
        `;
    },2000)
    document.querySelector('body').appendChild(div)
    setTimeout(()=>{
        div.innerHTML = `
            <div class='capa'>
                <div class="contenedo-comenzar">
                    <div class="comenzar-titulo">
                        <h3>Comienza en:</h3>
                    </div>
                    <div class="comienza-contador">
                        <h4>1</h4>
                    </div>
                </div>
            </div>
        `;
    },3000)
    document.querySelector('body').appendChild(div)
    setTimeout(()=>{
        div.innerHTML = `
            <div class='capa'>
                <div class="contenedo-comenzar">
                    <div class="comenzar-titulo">
                        <h3>Comienza en:</h3>
                    </div>
                    <div class="comienza-contador">
                        <h4>0</h4>
                    </div>
                </div>
            </div>
        `;
    },4000)
    document.querySelector('body').appendChild(div)
    setTimeout(()=>{
        window.location.href = '#'

    },5000)
}


function salirLeguna(){
    const salirLe = document.querySelector('.lengua-Salida')
    salirLe.classList.toggle('salir')
}

function salirSala(){
    if(confirm('seguro que quiere salir de la sala')){
        window.location.href ='#'
    }else{
        setTimeout(()=>{

            salirLeguna()
        },200)
    }
}

