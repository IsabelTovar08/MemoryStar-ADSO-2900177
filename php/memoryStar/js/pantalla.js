document.addEventListener("DOMContentLoaded", () => {
  const pantalla = document.getElementById("pCompleta");
  // Comprueba la altura de la pantalla al cargar la página
  if (window.innerHeight < 450) {
    pantalla.style.display = "block"; // Muestra la imagen
  }else{
    pantalla.style.display = "none";
    
  }

  // Actualiza al cambiar el tamaño de la ventana
  window.addEventListener("resize", function () {
    if (window.innerHeight < 450) {
      pantalla.style.display = "block";
    } else {
      pantalla.style.display = "none";
    }
  });

  pantalla.addEventListener("click", function () {
    toggleFullScreen();
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      // Entrar en pantalla completa
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(
          `Error al intentar entrar en pantalla completa: ${err.message}`
        );
      });
    } else {
      // Salir de pantalla completa
      document.exitFullscreen().catch((err) => {
        console.log(
          `Error al intentar salir de pantalla completa: ${err.message}`
        );
      });
    }
  }
});
// window.addEventListener('beforeunload', (event) => {
//   // Evita el comportamiento predeterminado
//   event.preventDefault();

//   // Establece un mensaje de advertencia
//   event.returnValue = '¿Estás seguro de que deseas salir de esta página?';
// });

