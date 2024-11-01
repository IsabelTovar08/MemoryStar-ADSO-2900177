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
    btnVeri.addEventListener("click", function () {
      if (!ordenCorrect.length) {
        alert("El orden correcto no se ha cargado. Inténtalo de nuevo.");
        return;
      }
  
      let aciertos = 0;
      ordenActual = Sortable.get(lista).toArray();
      const cuadros = document.querySelectorAll(".cuadro");
      let correcto = true;
  
      ordenActual.forEach((id, index) => {
        const cuadro = cuadros[index];
        const idEsperado = ordenCorrect[index]; // El valor correcto para esta posición
  
        if (id == idEsperado) { // Compara `id` con `idEsperado`
          aciertos += 1;
          cuadro.classList.remove("mal");
          cuadro.classList.add("bien"); // Añade una clase para los aciertos si deseas
        } else {
          cuadro.classList.add("mal");
          cuadro.classList.remove("bien");
          correcto = false;
        }
      });
  
      if (correcto) {
        alert("¡Correcto! Has acertado en todas las posiciones.");
      } else {
        alert(`Has acertado en ${aciertos} de ${ordenCorrect.length} posiciones.`);
      }
    });
  });
  