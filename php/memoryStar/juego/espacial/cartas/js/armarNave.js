document.addEventListener("DOMContentLoaded", function () {
    const btnVeri = document.getElementById("verificar");
    let ordenCorrect = []; // Declarar en un ámbito global para acceso en todas las funciones
  
    // Recuperar `ordenDef` del servidor
    fetch("php/almacenar_orden.php")
      .then((response) => response.json())
      .then((data) => {
        ordenCorrect = data.ordenDef || [];
        console.log("Orden correcto:", ordenCorrect);
      });
  
    let ordenActual;
    console.log("Holaaaaaaa");
  
    const lista = document.getElementById("lista1");
    Sortable.create(lista, {
      animation: 250,
      chosenClass: "seleccionado",
      dragClass: "drag",
      store: {
        set: (sortable) => {
          ordenActual = sortable.toArray();
          console.log("Orden actual:", ordenActual);
        },
      },
    });
  
    // verificar
    const loader = document.getElementById("loader");
    const mainContent = document.getElementById("main-content");
    const toastMessage = document.getElementById("toastMessage");
    
    btnVeri.addEventListener("click", function () {
      if (!ordenCorrect.length) {
        alert("El orden correcto no se ha cargado. Inténtalo de nuevo.");
        return;
      }
    
      loader.style.display = "block"; // Mostrar la animación de carga
      mainContent.classList.add("blur"); // Desenfocar el fondo
    
      setTimeout(() => {
        let aciertos = 0;
        ordenActual = Sortable.get(lista).toArray();
        const cuadros = document.querySelectorAll(".cuadro");
        let correcto = true;
    
        ordenActual.forEach((id, index) => {
          const cuadro = cuadros[index];
          const idEsperado = ordenCorrect[index];
    
          if (id == idEsperado) {
            aciertos += 1;
            cuadro.classList.remove("mal");
            cuadro.classList.add("bien");
          } else {
            cuadro.classList.add("mal");
            cuadro.classList.remove("bien");
            correcto = false;
          }
        });
    
        loader.style.display = "none"; // Ocultar la animación de carga
        mainContent.classList.remove("blur"); // Quitar el desenfoque del fondo
    
        // Configurar el mensaje de resultado en el toast
        if (correcto) {
          toastMessage.innerHTML = "¡Correcto! Has acertado en todas las posiciones.";
        } else {
          toastMessage.innerHTML = `Has acertado en ${aciertos} de ${ordenCorrect.length} posiciones.`;
        }
    
        // Mostrar el toast
        const resultadoToast = new bootstrap.Toast(document.getElementById("resultadoToast"));
        resultadoToast.show();
      }, 500); // Tiempo simulado para la verificación
    });
    
  });
  