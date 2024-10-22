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

      // Verificar si la dropzone ya contiene un objeto
      if (dropzone.children.length > 1) {
        // mantener un solo el objeto por dropzone
        document.getElementById("objetos").appendChild(objetoArrastrado);
      } else {
        if (objetoArrastrado.id === "lampara") {
          objetoArrastrado.classList.add("lampara-cambiado");
        } else {
          if (
            objetoArrastrado.id === "cactus" ||
            objetoArrastrado.id === "jarra"
          ) {
            objetoArrastrado.classList.add("objeto-cambiado");
          } else {
            if (
              objetoArrastrado.id === "libro" ||
              objetoArrastrado.id === "zapatos" ||
              objetoArrastrado.id === "cuadro"
            ) {
              objetoArrastrado.classList.add("objeto-cambiado2");
            }
          }
        }
      }
    },
    onRemove: function (evento) {
      var objetoArrastrado = evento.item;
      if (dropzone.id === "objetos") {
        //esta parte si dolio, amo esta condicion, me salvaste
        objetoArrastrado.classList.remove("objeto-cambiado");
        objetoArrastrado.classList.remove("lampara-cambiado");
        objetoArrastrado.classList.remove("objeto-cambiado2");
      } else {
        if (document.getElementById("objetos").contains(objetoArrastrado)) {
          objetoArrastrado.classList.remove("objeto-cambiado");
          objetoArrastrado.classList.remove("lampara-cambiado");
          objetoArrastrado.classList.remove("objeto-cambiado2");
        }
      }
    },
  });
});

//cambio de imagen
const imagenPrincipal = document.getElementById("imagen-principal");
const nuevaImagen = "img/juegoObjetos/salaCom.png";

window.onload = function () {
  imagenPrincipal.src = nuevaImagen;

  setTimeout(function () {
    imagenPrincipal.src = "img/juegoObjetos/sala.png";
  }, 2500);
};
