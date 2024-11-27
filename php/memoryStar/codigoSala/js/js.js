const input = document.getElementById('codigo');

// Limitar a 6 caracteres
input.addEventListener('input', function(event) {
  if (this.value.length > 6) {
    this.value = this.value.slice(0, 6); // Limitar a 6 caracteres
  }
});

// Desactivar el scroll del ratón y las teclas de flecha
input.addEventListener('wheel', function(event) {
  event.preventDefault();
});

input.addEventListener('keydown', function(event) {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
  }
});




// function numero(event) {
//     event.preventDefault(); // Para evitar que el formulario recargue la página

//     const codigo = document.querySelector('#codigo').value;

//     const cuerpo = document.querySelector('body');
//     const mensaje = document.querySelector('.mensaje');
//     const numeroEntero = /^[0-9]+$/;

//     if (codigo === '') {
//         mensaje.textContent = "Por favor ingresa un código";
//         setTimeout(()=>{
//             mensaje.textContent = ""
//         },1800)
//     }
//     // else if (!numeroEntero.test(codigo)) {
//     //     mensaje.textContent = "Solo se permiten números, ingrese de nuevo el número";
//     //     mostrarAlerta(); // Mostrar alerta personalizada si no es un número válido
//     // }
//     else if (codigo.length< 6) {
//         mensaje.textContent = "El código es demasiado pequeño";
//         setTimeout(()=>{
//             mensaje.textContent = ""
//         },1800)
//     }
// }

// Función para mostrar la alerta personalizada 
// function alertaPersonalizada() {
//     let html = `
//     <div class="capa">
//         <div class="alerta">
//             <div class="titulo-alerta">
//                 <h2 class="titulo">Sala no encontrada</h2>
//             </div>
//             <div class="contexto-alerta">
//                 <p class="contexto">Ingrese de nuevo el código</p>
//             </div>
//         </div>
//     </div>`;
//     return html;
// }

// function mostrarAlerta() {
//     const cuerpo = document.querySelector('body');
//     cuerpo.innerHTML = alertaPersonalizada(); 

//     const capa = document.querySelector('.capa');

//     setTimeout(() => {
//         capa.style.display = 'none'; 
//         cuerpo.innerHTML = `
//         <div class="container">
//             <form action="" onsubmit="numero(event)">
//                 <label for="codigo">Código de la sala</label>
//                 <input type="text" value="" id="codigo" placeholder="Código" maxlength="6" minlength="1">
//                 <input type="submit" value="Enviar">
//             </form>
//             <p class="mensaje"></p>
//         </div>`;
//     }, 3000); // 3 segundos de espera antes de ocultar la alerta
// }


// animacion de las puertas

// const puertoTop = document.querySelector('.puerta-arriba')
// const puertoBottom = document.querySelector('.puerta-abajo')


// setTimeout(()=>{
// puertoTop.style.position = 'absolute'
// puertoTop.style.top = '-100%'
// puertoTop.style.transition = 'all 3.5s ease'
// puertoBottom.style.position = 'absolute'
// puertoBottom.style.bottom = '-100%'
// puertoBottom.style.transition = 'all 3.5s ease'


// },2000)


// const contenedorUnirseSala = document.querySelector('.unimer-sala')
// const contendedorCrearSala = document.querySelector('.crear-sala')
// const cajaUnirme = document.querySelector('.caja-unirme')
// const cajaCrear = document.querySelector('.caja-crear') 
contendedorCrearSala.addEventListener('click',()=>{

    contendedorCrearSala.style.background = '#00e3f3 '
    contendedorCrearSala.style.color = 'black '
    contenedorUnirseSala.style.background = ' #03192eaf'
    contenedorUnirseSala.style.color = 'white'
    cajaUnirme.style.display ='none'
    cajaCrear.style.display = 'inline-block'
})

contenedorUnirseSala.addEventListener('click',()=>{

    contenedorUnirseSala.style.background = ' #00e3f3'
    contenedorUnirseSala.style.color = 'black'
    contendedorCrearSala.style.background = ' #03192eaf'
    contendedorCrearSala.style.color = ' white'
    cajaUnirme.style.display ='inline-block '
    cajaCrear.style.display = 'none'
})


