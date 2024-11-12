export class JuegoCartas {
  constructor() {
    this.images = document.querySelectorAll(".movable");
    this.puntosHTML = document.getElementById("puntos");
    this.puntosContainer = document.getElementById("puntos-container");
    this.puntosSumar = 100;
    this.diamantesHTML = document.getElementById("diamantes");
    this.diamantesContainer = document.getElementById("diamantes-container");
    this.diamantesSumar = 1;
    this.contenedor = document.querySelector(".contenedorCartas");
    this.cartas = Array.from(document.querySelectorAll(".carta"));
    this.cartasVolteadas = [];
    this.aciertos = 0;
    this.totalAciertos = this.cartas.length / 2;
    this.tiempoRestante = 60;
    this.ordenMensajes = [];
    this.contar = 0;
    this.titulos = [
      "PRIMERA PARTE:",
      "SEGUNDA PARTE:",
      "TERCERA PARTE:",
      "CUARTA PARTE:",
    ];
    this.mensajes = [
      "Cabina: El área donde los astronautas controlan la nave. Lleno de pantallas y botones",
      "Dorsal: Su función es alojar paneles, sensores o sistemas estructurales clave",
      "Propulsores: La parte trasera que contiene los motores, responsables de empujar la nave hacia adelante.",
      "Alas: Proporcionan estabilidad y control durante el descenso y aterrizaje en la Tierra.",
    ];
    this.segundaRonda = document.getElementById("segundaRonda");
    this.pzuntiaciom = document.getElementById("staticBackdrop");
    this.insertarPuntos = document.getElementById("puntosFin");
    this.insertarDiamantes = document.getElementById("diamantesFin");
    this.insertarTiempo = document.getElementById("tiempoFin");
    this.tiempo = document.getElementById("tiempo");
    this.siguiente = document.getElementById("siguiente");

    this.puntoss = 0;
    this.diamantess = 0;
    this.seconds = 0;
    this.timerInterval;

    this.init();
  }

  init() {
    this.puntosHTML.textContent = this.puntoss;
    this.diamantesHTML.textContent = this.diamantess;

    setInterval(this.moveImages.bind(this), 1000);

    this.mezclarCartas();
    this.inicializarJuego();
    this.startTimer();
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
  startTimer() {
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }
  }

  updateTimer() {
    this.seconds++;
    document.getElementById("timer").textContent = this.formatTime(
      this.seconds
    );
  }
  iniciarTemp(){
    
  }

  formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
  getRandomPosition() {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    return { x, y };
  }

  moveImages() {
    this.images.forEach((image) => {
      const { x, y } = this.getRandomPosition();
      image.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  mezclarCartas() {
    const cartasParaMezclar = this.cartas.filter(
      (carta) => !carta.classList.contains("central")
    );

    for (let i = cartasParaMezclar.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.contenedor.appendChild(cartasParaMezclar[j]);
    }
  }

  voltearCarta(carta) {
    const bieen = document.getElementById("voltear");
    bieen.play();

    if (
      carta.classList.contains("emparejada") ||
      this.cartasVolteadas.length === 2
    )
      return;

    carta.classList.add("volteada");
    this.cartasVolteadas.push(carta);

    if (this.cartasVolteadas.length === 2) {
      this.compararCartas();
    }
  }

  compararCartas() {
    const [primeraCarta, segundaCarta] = this.cartasVolteadas;
    const idPrimeraCarta = primeraCarta.getAttribute("data-id");
    const idSegundaCarta = segundaCarta.getAttribute("data-id");

    if (idPrimeraCarta === idSegundaCarta && primeraCarta !== segundaCarta) {
      this.procesarAcierto(primeraCarta, segundaCarta);
    } else {
      setTimeout(() => {
        primeraCarta.classList.remove("volteada");
        segundaCarta.classList.remove("volteada");
        this.cartasVolteadas = [];
      }, 1000);
    }
  }

  procesarAcierto(primeraCarta, segundaCarta) {
    const bieen = document.getElementById("bien");
    bieen.play();
    this.aciertos++;

    this.puntoss += this.puntosSumar;
    this.diamantess += this.diamantesSumar;
    this.actualizarPuntos();

    primeraCarta.classList.add("emparejada");
    segundaCarta.classList.add("emparejada");
    this.cartasVolteadas = [];
    this.mostrarMensaje(this.aciertos);

    if (this.aciertos === this.totalAciertos) {
      this.mostrar();
    }
  }

  actualizarPuntos() {
    this.puntosHTML.textContent = this.puntoss;
    this.diamantesHTML.textContent = this.diamantess;

    this.animarIncremento(
      this.puntosHTML,
      this.puntosContainer,
      `+${this.puntosSumar}`
    );
    this.animarIncremento(
      this.diamantesHTML,
      this.diamantesContainer,
      `+${this.diamantesSumar}`
    );
  }
  mostrar() {
    this.stopTimer();
    var modal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
    modal.show();
    this.siguiente.addEventListener("click", () => {
      window.location.href = "./juego/espacial/cartas/juegoPixel/planetScapearma tu nave.html";
    });
    // this.segundaRonda.style.display = 'flex';
    this.insertarPuntos.textContent = this.puntoss;
    this.insertarDiamantes.innerHTML = `${this.diamantess}<img src="modales/modales/img/tablas/rubipuntaje.png"
                            style="width: 4vh;height: auto;">`;
    this.insertarTiempo.textContent = this.formatTime(this.seconds);
  }
  animarIncremento(elemento, container, texto) {
    const sumaTexto = document.createElement("span");
    sumaTexto.textContent = texto;
    sumaTexto.className = "animate";
    sumaTexto.style.position = "absolute";
    sumaTexto.style.left = `${elemento.offsetLeft}px`;
    sumaTexto.style.top = `${elemento.offsetTop - 30}px`;
    container.appendChild(sumaTexto);

    setTimeout(() => {
      sumaTexto.style.opacity = 0;
    }, 1000);

    setTimeout(() => {
      container.removeChild(sumaTexto);
    }, 1500);
  }

  mostrarMensaje(aciertos) {
    const indicesRestantes = this.mensajes
      .map((_, index) => index)
      .filter((index) => !this.ordenMensajes.includes(index));

    if (indicesRestantes.length === 0) return;

    const elegido = Math.floor(Math.random() * indicesRestantes.length);
    const indiceSeleccionado = indicesRestantes[elegido];
    this.ordenMensajes.push(indiceSeleccionado);

    const mensajeDiv = document.getElementById("mostrarParte");
    const mensajeText = document.getElementById("mensajeTexto1");
    const titulo = document.getElementById("titulo1");

    if (mensajeDiv) {
      mensajeText.textContent = this.mensajes[indiceSeleccionado];
      titulo.textContent = this.titulos[this.contar];
      mensajeDiv.style.display = "block";

      setTimeout(() => {
        mensajeDiv.style.display = "none";
      }, 5000);
    }

    this.contar++;

    if (this.ordenMensajes.length === 4) {
      this.enviarOrden();
    }
  }

  enviarOrden() {
    fetch("juego/espacial/cartas/php/almacenar_orden.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ordenDef: this.ordenMensajes }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.status));
  }

  inicializarJuego() {
    this.cartas.forEach((carta, index) => {
      carta.addEventListener("click", () => {
        this.voltearCarta(carta);
      });
    });
  }
}
