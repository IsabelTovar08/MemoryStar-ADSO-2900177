const imagenes = document.querySelectorAll('.imagen');
let subir = true;

setInterval(() => {
    imagenes.forEach(imagen => {
        if (subir) {
            imagen.style.transform = 'translateY(-8px)';
        } else {
            imagen.style.transform = 'translateY(0)';
        }
    });
    subir = !subir;
}, 1000);
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
