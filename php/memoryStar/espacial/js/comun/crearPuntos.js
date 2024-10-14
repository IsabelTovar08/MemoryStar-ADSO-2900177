export class ManejarPuntos {
  constructor(scene) {
    this.scene = scene;

    this.score = 0;
    this.diamantes = 0;
    this.scoreText = this.scene.add.text(this.scene.scale.width - 200, 0, "Score: " + this.score, { fontSize: "32px", fill: "#fff" });
    this.scoreText.setScrollFactor(0);
    this.modalVisible = false;
    this.diamantesText = this.scene.add.text(this.scene.scale.width - 300, 100, "Diamantes: " + this.diamantes, { fontSize: "32px", fill: "#fff" });
    this.diamantesText.setScrollFactor(0);

    this.tiempo = 25;
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.decrementarTiempo,
      callbackScope: this,
      loop: true,
    });

    this.tiempoTotal = this.tiempo;
    this.progress = 100;
    this.decrementoPorSegundo = 100 / this.tiempoTotal;
    this.progressBar = this.scene.add.graphics();
    this.drawProgressBar();
  }

  obtenerDatos() {
    return {
      diamantes: this.diamantes,
      puntuacion: this.score,
      tiempo: this.tiempo,
    };
  }

  aumentarPuntos() {
    this.score += 10;
    this.diamantes += 1;
    this.scoreText.setText("Score: " + this.score);
    this.diamantesText.setText("Diamantes: " + this.diamantes);
    const datos = this.obtenerDatos();
    console.log(JSON.stringify(datos));
  }

  resetearTiempo() {
    this.tiempo = 25;
    this.progress = 100;
  }

  decrementarTiempo() {
    if (this.tiempo > 0) {
      this.tiempo -= 1;
    }

    if (this.tiempo <= 0 && !this.scene.instanciaPersonaje.jugador.isDead) {
      this.mostrarModal();
    }
  }

  mostrarModal() {
    if (!this.modalVisible) {
      this.modalVisible = true;
      var modalOxigeno = new bootstrap.Modal(document.getElementById("modal"));
      modalOxigeno.show();
      this.iniciarTemporizador(modalOxigeno);
    }
  }

  iniciarTemporizador(modalOxigeno) {
    var aceptar = document.getElementById("comprarOxigeno");
    var temporizador = document.getElementById("temporizador");
    var diamantesIndex = document.getElementById("diamantes");
    let contador = 5;
    diamantesIndex.textContent = this.diamantes;
    temporizador.textContent = contador; 

    aceptar.onclick = () => {
      modalOxigeno.hide();
      this.confirmAction();
      this.modalVisible = false;
      clearInterval(tiempoModal);
    };

    const tiempoModal = setInterval(() => {
      contador--;
      temporizador.textContent = contador;

      if (contador <= 0) {
        clearInterval(tiempoModal);
        modalOxigeno.hide();
        this.modalVisible = false;
        this.deteriorarJugador();
      }
    }, 1000);
  }

  confirmAction() {
    this.tiempo = 25;
    this.progress = 100;
    this.diamantes -= 1;
    this.diamantesText.setText("Diamantes: " + this.diamantes);
    this.scene.sound.add("sonidoOxigeno", { volume: 0.2 }).play();

  }

  deteriorarJugador() {
    this.scene.instanciaPersonaje.jugador.isDead = true;
    this.scene.instanciaPersonaje.jugador.anims.play("mario-dead");
    this.scene.instanciaPersonaje.jugador.setCollideWorldBounds(false);
    this.scene.sound.add("muerte", { volume: 1 }).play();
    this.scene.add.text(400, this.scene.scale.height - 400, "¡MORISTEEEEE!", {
      fontSize: "60px",
      fill: "#fff",
    });
    setTimeout(() => {
      this.scene.instanciaPersonaje.jugador.setVelocityY(-350);
    }, 3000);
  }

  drawProgressBar() {
    // Limpiar gráficos anteriores
    this.progressBar.clear();

    // Estilo de la barra de fondo (barra vacía) con bordes redondeados
    this.progressBar.fillStyle(0x3f3f3f, 1); // Gris
    this.progressBar.fillRoundedRect(71, 27, 200, 20, 8); // Rectángulo con esquinas redondeadas, radio de 15
    this.progressBar.setScrollFactor(0);

    // Cambiar el color de la barra dependiendo del tiempo restante
    if (this.progress <= 25) { // Si quedan 5 segundos o menos
      this.progressBar.fillStyle(0xff0000, 0.8); // Rojo

    } else if (this.progress <= 50) {
      this.progressBar.fillStyle(0xFFA500, 0.8); // Naranja

    } else {
      this.progressBar.fillStyle(0x00ff00, 0.8); // Verde
    }

    // Dibujar la barra de progreso con bordes redondeados
    this.progressBar.fillRoundedRect(71, 27, (this.progress / 100) * 200, 20, 0); // Esquinas redondeadas de 15px

  }

  update(time, delta) {
    if (this.progress > 0) {
      this.progress -= (this.decrementoPorSegundo / 1000) * delta; // Decremento suave según delta
      if (this.progress < 0) {
        this.progress = 0; // Asegurarse de que no sea negativo
      }
    }

    // Redibujar la barra de progreso
    this.drawProgressBar();

    // Acción cuando el tiempo se agote
    if (this.progress <= 0) {
      // Acción al terminar el tiempo
    }
  }
}
