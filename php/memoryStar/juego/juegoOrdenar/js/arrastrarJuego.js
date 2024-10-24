// const lista = document.getElementById("listaDrop");
// let ronda=1

// const duro = function () {
const idDropzone = [];

const dropzoneId = document.querySelectorAll(".dropzone");
// RAAMDOMIZAR ID
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Crear un arreglo de números del 1 al total de dropzones
const totalDropzones = dropzoneId.length;
const numeros = Array.from({ length: totalDropzones }, (_, index) => index + 1);

// MEXCLAR
const numerosBarajados = shuffleArray(numeros);

dropzoneId.forEach((dropzone, index) => {
  const nuevoId = `drop-objeto${numerosBarajados[index]}`;
  idDropzone.push(nuevoId);
  dropzone.id = nuevoId;
});

console.log(idDropzone);

// DRAG
interact(".arrastrable").draggable({
  listeners: {
    start(event) {
      event.target.classList.add("drag");
    },
    move(event) {
      const { target } = event;
      const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
      const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
    },
    end(event) {
      event.target.classList.remove("drag");
    },
  },
});

//DROP
interact(".dropzone").dropzone({
  accept: ".arrastrable",
  overlap: 0.4,
  ondropactivate: function (event) {
    event.target.classList.add("dropzone-active");
  },
  ondragenter: function (event) {
    const dropzoneElement = event.target;
    const draggableElement = event.relatedTarget;

    dropzoneElement.classList.add("dropzone-highlight");
    draggableElement.classList.add("can-drop");
  },
  ondragleave: function (event) {
    event.target.classList.remove("dropzone-highlight");
    event.relatedTarget.classList.remove("can-drop");
  },
  ondrop: function (event) {
    // VER EN Q DROPZONE CAYO
    event.relatedTarget.setAttribute("data-dropped", event.target.id);
  },
  ondropdeactivate: function (event) {
    event.target.classList.remove("dropzone-active");
    event.target.classList.remove("dropzone-highlight");
  },
});

// CONTADOR
let contador = -5;
let intervaloBarra; //parte de barra
let botonPresionado = false;
function iniciarTemp() {
  contador = -5;
  let intervalo = setInterval(function () {
    contador++;
    if (contador >= 0) {
      document.getElementById("temp").innerHTML = `TIEMPO: ${contador}s`;
      document.getElementById("verificarBtn").disabled = false;

      if (!intervaloBarra) {
        iniciarBarra();
      }
    } else {
      document.getElementById("verificarBtn").disabled = true;
    }
  }, 1000);
}
window.addEventListener("DOMContentLoaded", function () {
  iniciarTemp();
});

// BARRA
let tiempoRestante = 10;
const barraRegresiva = document.getElementById("countdown-bar");
const textoRegresivo = document.getElementById("countdown-text");

function iniciarBarra() {
  // Evitar que se ejecute más de una vez
  intervaloBarra = setInterval(() => {
    tiempoRestante--;
    textoRegresivo.textContent = tiempoRestante;
    barraRegresiva.style.width = tiempoRestante * 10 + "%"; // estilo mod

    if (tiempoRestante <= 0) {
      clearInterval(intervaloBarra);
      textoRegresivo.textContent = "¡Tiempo!";
      barraRegresiva.style.width = "0%";
      if (!botonPresionado) {
        document.getElementById("tiempo1").innerHTML = `${contador}s`;
        new bootstrap.Modal(
          document.getElementById("tablapuntuacionsolo")
        ).show();
      }
    }
  }, 1000);
}

// VERIFICADOR Y PUNTOS
// let puntuacion = 0;
// const puntosCorrectos = 10;
// const puntosIncorrectos = -5;
// let aciertos = 0;

// function actualizarPuntuacion(puntos) {
//   puntuacion += puntos;
//   if (puntuacion<0){
//     puntuacion=0;
//     document.getElementById("score").textContent = `PUNTOS: ${puntuacion}`;
//   }else{
//   document.getElementById("score").textContent = `PUNTOS: ${puntuacion}`;
//   }
// }

document
  .getElementById("verificarBtn")
  .addEventListener("click", verificarPosicion);

function verificarPosicion() {
  const objetos = document.querySelectorAll(".arrastrable");
  let correcto = true;
  botonPresionado = true;
  let aciertos = 0;

  objetos.forEach((objeto, index) => {
    const dropzoneEsperada = `drop-objeto${index + 1}`;
    const dropzoneActual = objeto.getAttribute("data-dropped");

    if (dropzoneActual === dropzoneEsperada) {
      // actualizarPuntuacion(puntosCorrectos);
      aciertos += 100;
    } else {
      // actualizarPuntuacion(puntosIncorrectos);
      correcto = false;
    }
  });
  console.log(aciertos);
  document.getElementById("puntosSecu1").innerHTML = aciertos;
  document.getElementById("puntosSecu2").innerHTML = aciertos;
  document.getElementById("tiempo1").innerHTML = `${contador}s`;
  if (contador <= 5 && correcto) {
    let rubis = 5;
    document.getElementById("rubis").innerHTML = `+${rubis}`;
  }
  if (botonPresionado) {
    new bootstrap.Modal(document.getElementById("tablapuntuacionsolo")).show();
    
  }

  // if (correcto) {
  //   alert("¡Todos los objetos están en su lugar!");
  // } else {
  //   alert("Algunos objetos no están en su lugar.");
  // }
}
document.getElementById("verificarBtn").disabled = true;

//PISTA DE LUGAR CORRECTO
function mostrarObjetosEnDropzones() {
  const objetos = document.querySelectorAll(".arrastrable");

  objetos.forEach((objeto, index) => {
    const dropzone = document.getElementById(`drop-objeto${index + 1}`);
    // TOMAR COORDENADA
    const dropzoneRect = dropzone.getBoundingClientRect();
    // PSAR EL OBJETO A LA COORDENADA COORESPONDIENTE
    objeto.style.transform = `translate(${
      dropzoneRect.left - objeto.offsetLeft
    }px, ${dropzoneRect.top - objeto.offsetTop}px)`;
  });

  // TIEMPO DE PiSTA
  setTimeout(() => {
    objetos.forEach((objeto) => {
      objeto.style.transform = "translate(0px, 0px)"; // LO DEVUELVE
    });
  }, 5000);
}
mostrarObjetosEnDropzones();

// };
// duro()
// document.getElementById("ronda")

//   if (ronda === 1) {
//     duro(); // Ejecutar en la primera ronda
//   } else if (ronda === 2) {
//     duro.break()

//     duro(); // Ejecutar en la segunda ronda
//   } else if (ronda === 3) {
//     duro(); // Ejecutar en la tercera ronda
//   }
