const imagen = document.querySelector('.imagenV');
let subir = true;

setInterval(() => {
  // Aplica una leve traslación hacia arriba antes de cambiar la imagen
  imagen.style.transform = 'scale(1.1)';

  setTimeout(() => {
    // Cambia la fuente de la imagen después de que se mueva ligeramente hacia arriba
    if (subir) {
      imagen.src = 'img/iconos/1.png';
    } else {
      imagen.src = 'img/iconos/2.png';
    }
    
    // Restaura la posición de la imagen
    imagen.style.transform = 'scale(1)';
    subir = !subir;
  }, 800); // Espera la duración de la transición antes de cambiar la imagen

}, 1600); // Intervalo de cambio de imagen cada 1 segundo
const texto = "¡Hola!, ¡bienvenido!, ¿En qué te puedo ";
const contenedorTexto = document.getElementById("texto");
let i = 0;

function mostrarTexto() {
  if (i < texto.length) {
    contenedorTexto.innerHTML += texto.charAt(i);
    i++;
    setTimeout(mostrarTexto, 100);  // Ajusta el tiempo para la velocidad
  }
}

mostrarTexto();

  const ocultarMensaje = document.querySelector('.cerrarMensaje');
  const mensaje = document.querySelector('.burbuja_texto');
  const mostrar = document.querySelector('.mostrarMensaje');

  ocultarMensaje.addEventListener('click', () => {
      mensaje.style.visibility = 'hidden';
      mensaje.style.transition = '0.1s';
  });

  mostrar.addEventListener('click', () => {
      mensaje.style.visibility = 'visible';
      mensaje.style.transition = '0.1s';
  });