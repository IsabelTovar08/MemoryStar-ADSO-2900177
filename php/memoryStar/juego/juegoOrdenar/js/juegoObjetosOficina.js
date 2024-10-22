//contador
// let intervalo;
// let tiempoRestante = 10;
// function iniciarContador() {
//   intervalo = setInterval(() => {
//     tiempoRestante--;

//     console.log(`Tiempo restante: ${tiempoRestante} segundos`);

//     if (tiempoRestante <= 0) {
//       clearInterval(intervalo);

//       var myModal = new bootstrap.Modal(
//         document.getElementById("seguirJugando")
//       );
//       myModal.show();

//       setTimeout(function () {
//         myModal.hide();

//         myModal._element.addEventListener(
//           "hidden.bs.modal",
//           function () {
//             var modal2 = new bootstrap.Modal(
//               document.getElementById("tablapuntuacionsolo")
//             );
//             modal2.show();
//           },
//           { once: true }
//         );
//       }, 3000);
//     }
//   }, 1000);
// }

// iniciarContador();

Sortable.create(document.getElementById("objetos"), {
  group: {
    name: "compartido",
    put: true, // devolver objetos
  },
  animation: 150,
});

// Hacer que las dropzones acepten objetos
document.querySelectorAll(".dropzone").forEach(function (dropzone) {
  Sortable.create(dropzone, {
    group: "compartido",
    animation: 150,
    onAdd: function (evento) {
      var objetoArrastrado = evento.item;

      objetoArrastrado.classList.add("objeto-cambiado");

      // Verificar si la dropzone ya contiene un objeto
      if (dropzone.children.length > 1) {
        // mantener un solo el objeto por dropzone
        document.getElementById("objetos").appendChild(objetoArrastrado);
      }
    },
    onRemove: function (evento) {
      var objetoArrastrado = evento.item;

      if (dropzone.id === "objetos") {
        //esta parte si dolio, amo esta condicion, me salvaste
        objetoArrastrado.classList.remove("objeto-cambiado");
      } else {
        if (document.getElementById("objetos").contains(objetoArrastrado)) {
          objetoArrastrado.classList.remove("objeto-cambiado");
        }
      }
    },
  });
});

//cambio de imagen
const imagenPrincipal = document.getElementById("imagen-principal");
const nuevaImagen = "img/juegoObjetos/oficinaCom.png";

window.onload = function () {
  imagenPrincipal.src = nuevaImagen;

  setTimeout(function () {
    imagenPrincipal.src = "img/juegoObjetos/oficina.png";
  }, 2500);
};
