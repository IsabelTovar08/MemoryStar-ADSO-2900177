const libros = document.getElementById("lista");
const botonVerificar = document.getElementById("verificarBtn");
const resultado = document.getElementById("resultado");
const tiempo = 5000;

const idsLibros = [];
const librosId = document.querySelectorAll(".libro");
librosId.forEach((librosId, index) => {
  idsLibros.push(`'${index + 1}'`);
});

// mezcla arreglo
function mezclarArreglo(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// orden correcto
let ordenCorrecto = mezclarArreglo([...idsLibros]);
console.log(ordenCorrecto);

// pista
function mostrarLibrosEnOrden(orden) {
  libros.innerHTML = "";

  orden.forEach((id) => {
    let img = document.createElement("img");

    let idSinComillas = id.replace(/'/g, "");
    img.setAttribute("src", `img/secuLibro/librito${idSinComillas}.png`);
    img.setAttribute("data-id", idSinComillas);
    img.classList.add("libro", "inicio");
    libros.appendChild(img);
  });
}

// Mostrar pista
mostrarLibrosEnOrden(ordenCorrecto);

// drag
let sortable;

// quitar drag 5s
function deshabilitarDrag() {
  sortable = Sortable.create(libros, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    group: "lista-libros",
    sort: false, //desabilito
  });
}

// poner drag
function habilitarDrag() {
  sortable.destroy(); // borrar pasado
  sortable = Sortable.create(libros, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    group: "lista-libros",
    sort: true, // Habilito
    store: {
      set: (sortable) => {
        let ordenActual = sortable.toArray();
        console.log(ordenActual);
      },
    },
    onStart: () => {
      
      document.querySelectorAll(".libro").forEach((libro) => {
        libro.classList.remove("inicio");
      });
    },
  });
}

// desabilito drag
deshabilitarDrag();

// habilitar desp de 5s
setTimeout(() => {
  document.querySelectorAll(".libro").forEach((libro) => {
    libro.classList.remove("inicial");
  });
  let ordenMezclado = mezclarArreglo([...idsLibros]); //mezcla de nuevo
  mostrarLibrosEnOrden(ordenMezclado);
  habilitarDrag();
}, 5000);

// CONTADOR
let contador = -5;
let intervaloBarra; //parte de barra
let botonPresionado = false;
function iniciarTemp() {
  contador = -5;
  let intervalo = setInterval(function () {
    contador++;
    if (contador >= 0) {
      
      document.getElementById("verificarBtn").disabled = false;
      document.getElementById("temp").innerHTML = `TIEMPO: ${contador}s`;
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

//verificar
let aciertos = 0;
botonVerificar.addEventListener("click", () => {
  let ordenActual = Sortable.get(libros).toArray();
  botonPresionado = true;
  let ordenActualConComillas = ordenActual.map((id) => `'${id}'`);
  let aciertos = 0;

  
  document.getElementById("tiempo1").innerHTML = `${contador}s`;

  ordenActualConComillas.forEach((id, index) => {
    if (id === ordenCorrecto[index]) {
      aciertos = aciertos + 100;
    }
  });
  if (contador <= 5 && aciertos === (ordenCorrecto.length * 100)) {
    let rubis = 5;
    document.getElementById("rubis").innerHTML = `+${rubis}`;
  }

  document.getElementById("puntosSecu1").innerHTML = aciertos;
  document.getElementById("puntosSecu2").innerHTML = aciertos;
  if (botonPresionado) {
    new bootstrap.Modal(
      document.getElementById("tablapuntuacionsolo")
    ).show();
    
  }
  // Mostrar el resultado
  if (aciertos === (ordenCorrecto.length * 100)) {
    alert("¡Correcto! Has acertado en todas las posiciones.");
  } else {
    alert(`Has acertado en ${aciertos} posiciones de ${ordenCorrecto.length}.`);
  }
});
