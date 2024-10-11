
const idDropzone = [];

const lista = document.getElementById("listaDrop");
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

// for (let i = 1; i <= 5; i++) {
//   const nuevoDrop = document.createElement("div");

//   nuevoDrop.id = `drop-objeto${i}`;

//   nuevoDrop.classList.add("dropzone", `posicion${i}`);

//   lista.appendChild(nuevoDrop);
// }

// function mezclarArreglo(arr) {
//   for (let i = arr.length - 1; i > 0; i--) {
//     let j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
//     [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambia los elementos
//   }
//   return arr;
// }
// let ordenCorrecto = mezclarArreglo([...idDropzone]);
// console.log(ordenCorrecto);

// function mostrarDropEnOrden(orden) {
//   lista.innerHTML = ''; // Limpiamos la lista actual
//   orden.forEach(id,index => {
//     let zonaDrop = document.createElement('div');
//     div.setAttribute('id', `drop-objeto${index+1}`);
//     div.classList.add(`posicion${index+1}`);
//     libros.appendChild(zonaDrop);
//   });
// }
// mostrarDropEnOrden(lista)

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

// VERIFICADOR Y PUNTOS
let puntuacion = 0;
const puntosCorrectos = 10; 
const puntosIncorrectos = -5; 
let aciertos = 0;


function actualizarPuntuacion(puntos) {
  puntuacion += puntos;
  if (puntuacion<0){
    puntuacion=0;
    document.getElementById("score").textContent = `PUNTOS: ${puntuacion}`;
  }else{
  document.getElementById("score").textContent = `PUNTOS: ${puntuacion}`;
  }
}

document
  .getElementById("verificarBtn")
  .addEventListener("click", verificarPosicion);

function verificarPosicion() {
  const objetos = document.querySelectorAll(".arrastrable");
  let correcto = true;

  objetos.forEach((objeto, index) => {
    const dropzoneEsperada = `drop-objeto${index + 1}`;
    const dropzoneActual = objeto.getAttribute("data-dropped");

    if (dropzoneActual === dropzoneEsperada) {
      actualizarPuntuacion(puntosCorrectos);
      acierto= aciertos+1
    } else {
      actualizarPuntuacion(puntosIncorrectos);
      correcto = false;
      aciertos = aciertos-1
    }
  });
  console.log(aciertos)

  if (correcto) {
    alert("¡Todos los objetos están en su lugar!");
  } else {
    alert("Algunos objetos no están en su lugar.");
  }
}



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

  // TIEMPO DE POSTA
  setTimeout(() => {
    objetos.forEach((objeto) => {
      objeto.style.transform = "translate(0px, 0px)"; // LO DEVUELVE
    });
  }, 5000); 
}
mostrarObjetosEnDropzones();


//CONTADOR
function iniciarTemp() {
  let contador = 0;
  let intervalo = setInterval(function () {
    contador++;
    document.getElementById("temp").innerHTML = `TIEMPO: ${contador}s`;
  }, 1000);
}
window.addEventListener("DOMContentLoaded", function () {
  iniciarTemp();
});
