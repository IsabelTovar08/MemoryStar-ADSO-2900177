document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".movable");

  function getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 100); // -100 para evitar que la imagen se salga de la vista
    const y = Math.random() * (window.innerHeight - 100); // -100 para evitar que la imagen se salga de la vista
    return { x, y };
  }

  function moveImages() {
    images.forEach((image) => {
      const { x, y } = getRandomPosition(); // Obtener posiciones aleatorias
      image.style.transform = `translate(${x}px, ${y}px)`; // Mueve la imagen
    });
  }

  // Mueve las imágenes cada 2 segundos
  setInterval(moveImages, 1000);

  const contenedor = document.querySelector(".contenedorCartas");
  const cartas = Array.from(document.querySelectorAll(".carta")); // Convertir NodeList a Array
  let cartasVolteadas = [];
  let aciertos = 0;
  const totalAciertos = cartas.length / 2; // Total de pares de cartas
  let intervalo;
  let tiempoRestante = 60; // 60 segundos

  // Mezclar las cartas
  function mezclarCartas() {
    const cartasParaMezclar = cartas.filter(
      (carta) => !carta.classList.contains("central")
    );

    for (
      let iteracionMezclar = cartasParaMezclar.length - 1;
      iteracionMezclar > 0;
      iteracionMezclar--
    ) {
      const j = Math.floor(Math.random() * (iteracionMezclar + 1));
      contenedor.appendChild(cartasParaMezclar[j]);
    }
  }

  // Función para voltear las cartas
  function voltearCarta(carta) {
    const bieen = document.getElementById('voltear');
    bieen.play();
    if (cartasVolteadas.length === 2) return;

    carta.classList.add("volteada");
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
      const [primeraCarta, segundaCarta] = cartasVolteadas;
      const idPrimeraCarta = primeraCarta.getAttribute("data-id");
      const idSegundaCarta = segundaCarta.getAttribute("data-id");

      if (idPrimeraCarta === idSegundaCarta) {
        const bieen = document.getElementById('bien');
        bieen.play();
        aciertos++;
        cartasVolteadas = [];
        mostrarMensaje(aciertos);

        if (aciertos === totalAciertos) {
          //   
          setTimeout(() => {
            // Redirigir al usuario después de mostrar el último mensaje
            const mensajeDiv = document.getElementById(`mensaje10`);
            mensajeDiv.style.display = "block";// Cambia esto a la URL de destino
          }, 5000); // Esperar 3 segundos antes de redirigir
          setTimeout(() => {
            window.location.href = "./espacial/cartas/juegoPixel/index.html"; // Cambia esto a la URL de destino
          }, 7000); // Esperar 3 segundos antes de redirigir
        }
      } else {
        setTimeout(() => {
          primeraCarta.classList.remove("volteada");
          segundaCarta.classList.remove("volteada");
          cartasVolteadas = [];
        }, 1000);
      }
    }
  }


  // Array para almacenar el orden en que se muestran los mensajes
  const ordenMensajes = [];

  function mostrarMensaje(aciertos) {
    let mensajes = [
      "Cabina - El Cerebro de la Nave: Controla la nave y la misión desde su centro estratégico.",
      "Motores - El Corazón Propulsor: Impulsa la nave con fuerza hacia el espacio.",
      "Paneles Solares - Las Alas Energéticas: Absorben la luz del sol y la convierten en energía para la nave. ",
      "Escudo de Calor: Protege la nave del calor extremo al reentrar en la atmósfera.",
    ];

    // Filtrar los mensajes ya mostrados para que no se repitan
    const mensajesRestantes = mensajes.filter(mensaje => !ordenMensajes.includes(mensaje));

    // Seleccionar aleatoriamente un mensaje de los restantes
    const elegido = Math.floor(Math.random() * mensajesRestantes.length);

    // Guardar el mensaje en el array 'ordenMensajes'
    ordenMensajes.push(mensajesRestantes[elegido]);

    // Mostrar el mensaje correspondiente
    const mensajeDiv = document.getElementById(`mensaje${aciertos}`);
    const mensajeText = document.getElementById(`mensajeTexto${ordenMensajes.length}`);


    if (mensajeDiv) {

      mensajeText.textContent = aciertos;
      mensajeText.textContent = mensajesRestantes[elegido];

      mensajeDiv.style.display = "block";

      setTimeout(() => {
        mensajeDiv.style.display = "none";
      }, 5000); // Mostrar el mensaje durante 1 segundo
    }
  }
  console.log(ordenMensajes)

  // Para ver el orden de los mensajes mostrados


  // Vincular eventos de clic a las cartas después de mezclar
  function inicializarJuego() {
    for (let iteracion = 0; iteracion < cartas.length; iteracion++) {
      cartas[iteracion].addEventListener("click", function () {
        voltearCarta(cartas[iteracion]);
      });
    }
  }

  // Iniciar el juego
  mezclarCartas();
  inicializarJuego();
  iniciarContador();
});
