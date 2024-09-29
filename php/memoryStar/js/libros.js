const libros = document.getElementById('lista');
const botonVerificar = document.getElementById('verificar1');
const resultado = document.getElementById('resultado');
const tiempo = 5000; // Tiempo de espera antes de habilitar el drag (5 segundos)

const idsLibros = [];
const librosId = document.querySelectorAll('.libro');
librosId.forEach((librosId, index) => {
  idsLibros.push(`'${index + 1}'`);  // tener los id
});

// Función para mezclar un arreglo
function mezclarArreglo(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambia los elementos
  }
  return arr;
}

// Generamos un orden correcto aleatorio al cargar la página
let ordenCorrecto = mezclarArreglo([...idsLibros]);
console.log(ordenCorrecto);

// Función para mostrar los libros en un orden dado
function mostrarLibrosEnOrden(orden) {
  libros.innerHTML = ''; // Limpiamos la lista actual

  // Insertamos los libros en el DOM según el orden dado
  orden.forEach(id => {
    let img = document.createElement('img');
    // Al usar el id, debemos quitar las comillas simples
    let idSinComillas = id.replace(/'/g, '');
    img.setAttribute('src', `img/secuLibro/librito${idSinComillas}.png`);
    img.setAttribute('data-id', idSinComillas);
    img.classList.add('libro', 'inicio');
    libros.appendChild(img);
  });
}

// Mostrar el orden correcto al cargar la página
mostrarLibrosEnOrden(ordenCorrecto);

// Inicializar Sortable.js sin permitir el drag
let sortable;

// Función para deshabilitar temporalmente el drag
function deshabilitarDrag() {
  sortable = Sortable.create(libros, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    group: "lista-libros",
    sort: false, // deshabilitar el drag
  });
}

// Función para habilitar el drag
function habilitarDrag() {
  sortable.destroy(); // Destruir la instancia anterior
  sortable = Sortable.create(libros, {
    animation: 250,
    chosenClass: "seleccionado",
    dragClass: "drag",
    group: "lista-libros",
    sort: true, // Habilitar el drag
    store: {
      set: (sortable) => {
        let ordenActual = sortable.toArray();
        console.log(ordenActual); 
      }
    },
    onStart: () => {
      // cuadrar tamaño
      document.querySelectorAll('.libro').forEach(libro => {
        libro.classList.remove('inicio');
      });
    }
  });
}

// Deshabilitar drag al inicio
deshabilitarDrag();

// Después de 5 s habiliatr el drag
setTimeout(() => {
  document.querySelectorAll('.libro').forEach(libro => {
    libro.classList.remove('inicial');
  });
  let ordenMezclado = mezclarArreglo([...idsLibros]); // Mezclar un nuevo orden aleatorio
  mostrarLibrosEnOrden(ordenMezclado);

  // Habilitar el drag después de 5 segundos
  habilitarDrag();
}, 5000); // Cambia 5000 para modificar el tiempo (en milisegundos)

// Al hacer clic en el botón de verificar
// botonVerificar.addEventListener('click', () => {
//   let ordenActual = Sortable.get(libros).toArray();
//   // Agregar comillas simples para la comparación
//   let ordenActualConComillas = ordenActual.map(id => `'${id}'`);
//   let esCorrecto = ordenActualConComillas.every((id, index) => id === ordenCorrecto[index]);

//   // Mostrar el resultado
//   if (esCorrecto) {
//     resultado.innerHTML = '<p style="color: green;">¡El orden es correcto!</p>';
//   } else {
//     resultado.innerHTML = '<p style="color: red;">El orden es incorrecto. ¡Intenta de nuevo!</p>';
//   }
// });
