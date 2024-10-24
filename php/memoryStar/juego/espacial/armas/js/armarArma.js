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
  overlap: 0.1,
  ondropactivate: function (event) {
    event.target.classList.add("dropzone-active");
  },
  ondragenter: function (event) {
    const dropzoneElement = event.target;
    const draggableElement = event.relatedTarget;

    //   dropzoneElement.classList.add("dropzone-highlight");
    //   draggableElement.classList.add("can-drop");
  },
  ondragleave: function (event) {
    event.target.classList.remove("dropzone-highlight");
    event.relatedTarget.classList.remove("can-drop");
  },
  ondrop: function (event) {
    // VER EN Q DROPZONE CAYO
    event.relatedTarget.setAttribute("data-dropped", event.target.getAttribute("data-id"));
  },
  ondropdeactivate: function (event) {
    event.target.classList.remove("dropzone-active");
    event.target.classList.remove("dropzone-highlight");
  },
});

const btnVerificar = document.getElementById("verificar");

btnVerificar.addEventListener("click", function () {
  const objetos = document.querySelectorAll(".arrastrable");
  let correcto = true;

  objetos.forEach((objeto) => {
    const objetoId = objeto.getAttribute("data-id");
    const dropzoneId = objeto.getAttribute("data-dropped");

    if (objetoId !== dropzoneId) {
      correcto = false;
      console.log(`El objeto ${objetoId} está en la dropzone incorrecta.`);
      // Cambiar el estilo si es incorrecto
      objeto.classList.add("incorrecto");
    } else {
      console.log(`El objeto ${objetoId} está en la dropzone correcta.`);
      // Cambiar el estilo si es correcto
      objeto.classList.remove("incorrecto");
      objeto.classList.add("correcto");
    }
  });

  if (correcto) {
    console.log("Todos los objetos están en las dropzones correctas.");
  } else {
    console.log("Algunos objetos no están en las dropzones correctas.");
  }
});
