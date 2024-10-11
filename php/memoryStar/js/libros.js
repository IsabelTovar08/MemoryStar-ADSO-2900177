const libros = document.getElementById('lista');
const botonVerificar = document.getElementById('verificar1');
const resultado = document.getElementById('resultado');
const tiempo = 5000; 

const idsLibros = [];
const librosId = document.querySelectorAll('.libro');
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
  libros.innerHTML = ''; 

  orden.forEach(id => {
    let img = document.createElement('img');
    
    let idSinComillas = id.replace(/'/g, '');
    img.setAttribute('src', `img/secuLibro/librito${idSinComillas}.png`);
    img.setAttribute('data-id', idSinComillas);
    img.classList.add('libro', 'inicio');
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

// desabilito drag
deshabilitarDrag();

// habilitar desp de 5s
setTimeout(() => {
  document.querySelectorAll('.libro').forEach(libro => {
    libro.classList.remove('inicial');
  });
  let ordenMezclado = mezclarArreglo([...idsLibros]); //mezcla de nuevo
  mostrarLibrosEnOrden(ordenMezclado);
  habilitarDrag();
}, 5000); 


//verificar
botonVerificar.addEventListener('click', () => {
  let ordenActual = Sortable.get(libros).toArray();

  let ordenActualConComillas = ordenActual.map(id => `'${id}'`);
  let esCorrecto = ordenActualConComillas.every((id, index) => id === ordenCorrecto[index]);

  //Mostrar el resultado
  if (esCorrecto) {
    resultado.innerHTML = '<p style="color: green;">¡El orden es correcto!</p>';
  } else {
    resultado.innerHTML = '<p style="color: red;">El orden es incorrecto. ¡Intenta de nuevo!</p>';
  }
});
