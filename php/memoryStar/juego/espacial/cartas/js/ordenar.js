const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");
const startZone = document.getElementById("start-zone");

let draggedElement = null;
let originalPosition = null;

// Asignar eventos a cada elemento draggable
draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", dragStart);
  draggable.addEventListener("dragend", dragEnd);
});

function dragStart(event) {
  draggedElement = event.target;  // Guardar el elemento arrastrado
  event.dataTransfer.setData("text", event.target.id);
  originalPosition = draggedElement.parentElement; // Guardar la posición original
  setTimeout(() => {
    draggedElement.classList.add("dragging"); // Añadir clase para manejar la visibilidad
  }, 0);
}

function dragEnd(event) {
  setTimeout(() => {
    draggedElement.classList.remove("dragging"); // Quitar la clase al terminar el arrastre
    draggedElement = null;
  }, 0);
}

// Habilitar que se puedan soltar elementos en las zonas (start y dropzones)
[startZone, ...dropzones].forEach(zone => {
  zone.addEventListener("dragover", allowDrop);
  zone.addEventListener("drop", handleDrop);
  zone.addEventListener("dragleave", removeOverClass);
});

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add("over");


}

function handleDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("over");

  const dropzone = event.currentTarget;
  const existingElement = dropzone.querySelector(".draggable");

  if (dropzone === startZone) {
    // Si se suelta en la zona de inicio, devolver el elemento arrastrado allí
    if (existingElement) {
      existingElement.parentElement.appendChild(existingElement); // Mover el elemento existente a su zona original
    }
    startZone.appendChild(draggedElement); // Colocar el elemento arrastrado en la zona de inicio
  } else {
    // Si se suelta en una zona diferente, intercambiar elementos
    if (existingElement) {
      // Intercambiar los elementos: mover el elemento existente a la posición del elemento arrastrado
      originalPosition.appendChild(existingElement);
    }
    // Colocar el elemento arrastrado en la zona actual
    dropzone.appendChild(draggedElement);
  }
}

function removeOverClass(event) {
  event.currentTarget.classList.remove("over");
}
// Asignar eventos a cada elemento draggable
// draggables.forEach(draggable => {
//   draggable.addEventListener('dragstart', (event) => {
//     event.dataTransfer.setData('text/plain', event.target.id); // Establece el ID del elemento
//     event.dataTransfer.effectAllowed = 'move'; // Asegura que el arrastre es solo para mover
//     draggedElement = event.target;

//     setTimeout(() => {
//       event.target.style.display = "none";  // Ocultar el elemento mientras se arrastra
//     }, 0);
//   });

//   draggable.addEventListener('dragend', (event) => {
//     setTimeout(() => {
//       event.target.style.display = "block";  // Volver a mostrar el elemento
//       draggedElement = null;
//     }, 0);
//   });
// });

// // Habilitar que se puedan soltar elementos en las zonas (start y dropzones)
// [startZone, ...dropzones].forEach(zone => {
//   zone.addEventListener('dragover', (event) => {
//     event.preventDefault(); // Necesario para permitir el drop
//     event.currentTarget.classList.add('over');
//   });

//   zone.addEventListener('drop', (event) => {
//     event.preventDefault(); // Prevenir la apertura de la imagen en otra pestaña
//     event.currentTarget.classList.remove('over');

//     const id = event.dataTransfer.getData('text/plain');
//     const draggedElement = document.getElementById(id);

//     if (draggedElement) {
//       event.currentTarget.appendChild(draggedElement);
//     }
//   });

//   zone.addEventListener('dragleave', (event) => {
//     event.currentTarget.classList.remove('over');
//   });
// });

// Prevenir que la imagen se abra en una nueva pestaña
// draggables.forEach(item => {
//   item.addEventListener('dragstart', (event) => {
//     event.preventDefault(); // Evita el comportamiento predeterminado
//   });
// });