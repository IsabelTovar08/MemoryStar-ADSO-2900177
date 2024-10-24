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

    // Si la carta ya está emparejada o hay dos cartas volteadas, no hacer nada
    if (carta.classList.contains("emparejada") || cartasVolteadas.length === 2) return;

    carta.classList.add("volteada");
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
      const [primeraCarta, segundaCarta] = cartasVolteadas;
      const idPrimeraCarta = primeraCarta.getAttribute("data-id");
      const idSegundaCarta = segundaCarta.getAttribute("data-id");

      // Verificar que las dos cartas tengan el mismo "data-id" y que sean efectivamente diferentes cartas
      if (idPrimeraCarta === idSegundaCarta && primeraCarta !== segundaCarta) {
        const bieen = document.getElementById('bien');
        bieen.play();
        aciertos++;

        // Marcar las cartas como emparejadas
        primeraCarta.classList.add("emparejada");
        segundaCarta.classList.add("emparejada");

        cartasVolteadas = [];
        mostrarMensaje(aciertos);

        if (aciertos === totalAciertos) {
          setTimeout(() => {
            window.location.href = "./juego/espacial/cartas/juegoPixel/index.html";
          }, 7000);
        }
      } else {
        // Las cartas no coinciden, voltearlas de nuevo después de un tiempo
        setTimeout(() => {
          primeraCarta.classList.remove("volteada");
          segundaCarta.classList.remove("volteada");
          cartasVolteadas = [];
        }, 1000);
      }
    }
  }

  // Array para almacenar el orden en que se muestran los mensajes
  let contar = 0;
  let titulos = [
    'PRIMERA PIEZA A ENSAMBLAR',
    'SEGUNDA PIEZA A ENSAMBLAR',
    'TERCERA PIEZA A ENSAMBLAR',
    'CUARTA PIEZA A ENSAMBLAR'
  ];

  function mostrarMensaje(aciertos) {
    let mensajes = [
      "Cabina: El área donde los astronautas controlan la nave. Lleno de pantallas y botones",
      "Dorsal: La función del dorsal de una nave es alojar paneles, sensores o sistemas estructurales clave",
      "Propulsores: La parte trasera que contiene los motores, responsables de empujar la nave hacia adelante.",
      "Alas: Proporcionan estabilidad y control durante el descenso y aterrizaje en la Tierra."
    ];

    const ordenMensajes = [];
    // Filtrar los índices ya usados para que no se repitan
    const indicesRestantes = mensajes
        .map((_, index) => index) // Crear un array de índices
        .filter(index => !ordenMensajes.includes(index)); // Excluir los índices ya seleccionados

    // Si ya se han mostrado todos los mensajes, no hacer nada
    if (indicesRestantes.length === 0) return;

    // Seleccionar aleatoriamente un índice de los restantes
    const elegido = Math.floor(Math.random() * indicesRestantes.length);
    const indiceSeleccionado = indicesRestantes[elegido];

    // Guardar el índice seleccionado en 'ordenMensajes' para evitar repeticiones
    ordenMensajes.push(indiceSeleccionado);

    // Mostrar el mensaje correspondiente usando el índice seleccionado
    const mensajeDiv = document.getElementById('mostrarParte');
    const mensajeText = document.getElementById('mensajeTexto1');
    const titulo = document.getElementById('titulo1');

    if (mensajeDiv) {
      mensajeText.textContent = mensajes[indiceSeleccionado];
      titulo.textContent = titulos[contar];
      mensajeDiv.style.display = 'block';

      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        mensajeDiv.style.display = 'none';
      }, 5000);
    }

    contar++;
    console.log(ordenMensajes); // Verificar el orden de los índices seleccionados
}

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
});
