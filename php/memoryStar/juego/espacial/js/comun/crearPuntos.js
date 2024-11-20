
export let datosJuego = null;

export class ManejarPuntos {
  constructor(scene) {
    this.scene = scene;
    this.puntos = 0;
    this.diamantes = 0;
    this.puntosText = this.scene.add.text(this.scene.scale.width - 285, 20, + this.puntos, { fontSize: "32px", fill: "#fff", stroke: "#000", strokeThickness: 3 });
    this.puntosText.setScrollFactor(0);
    this.diamantesText = this.scene.add.text(this.scene.scale.width - 100, 20, + this.diamantes, { fontSize: "32px", fill: "#fff", stroke: "#000", strokeThickness: 3 });
    this.diamantesText.setScrollFactor(0);

    this.tiempo = 25;
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.decrementarTiempo,
      callbackScope: this,
      loop: true,
    });

    this.tamañoContenedorPuntos();

    window.addEventListener('resize', () => this.tamañoContenedorPuntos());
    this.tiempoTotal = this.tiempo;
    this.progress = 100;
    this.decrementoPorSegundo = 100 / this.tiempoTotal;
    this.progressBar = this.scene.add.graphics();

    this.totalTime = 0; // Tiempo total en segundos
    this.timerText = null; // Texto para mostrar el temporizador
    this.timeEvent = null;
    this.modalCompraOxigenVisible = false;
  }

  obtenerDatos() {
    return {
      diamantes: this.diamantes,
      puntos: this.puntos,
      tiempo: this.tiempo,
    };
  }

  aumentarPuntos() {
    this.puntos += 10;
    this.diamantes += 1;
    this.puntosText.setText(this.puntos);
    this.diamantesText.setText(this.diamantes);

    const datosJuego = this.obtenerDatos();
    
    fetch('../../js/comun/pr.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosJuego)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.mensaje);  // Print server response
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
    });

    return datosJuego;
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
    if (!this.modalCompraOxigenVisible) {
      this.modalCompraOxigenVisible = true;
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
      this.modalCompraOxigenVisible = false;
      clearInterval(tiempoModal);
    };

    const tiempoModal = setInterval(() => {
      contador--;
      temporizador.textContent = contador;

      if (contador <= 0) {
        clearInterval(tiempoModal);
        modalOxigeno.hide();
        this.modalCompraOxigenVisible = false;
        this.deteriorarJugador();
      }
    }, 1000);
  }

  confirmAction() {
    if(this.diamantes>0){
      this.tiempo = 25;
      this.progress = 100;
      this.diamantes -= 1;
      this.diamantesText.setText(+ this.diamantes);
      this.scene.sound.add("sonidoOxigeno", { volume: 0.2 }).play();
  
    }else{
    alert( "No tienes suficientes diamantes para comprar oxígeno.");
    modalOxigeno.hide();

    }
    
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
    // Definir variables para la posición y el tamaño de la barra
    let progressBarX = 71;
    let progressBarY = 27;
    let progressBarWidth = 200;
    let progressBarHeight = 20;
    let cornerRadius = 8; // Radio para las esquinas redondeadas

    // Ajustar el tamaño y la posición si el ancho de la pantalla es menor a 900
    if (window.innerWidth < 900) {
      progressBarX = 49;  // Cambiar posición X
      progressBarY = 24;  // Cambiar posición Y
      progressBarWidth = 123; // Reducir el ancho de la barra de progreso
      progressBarHeight = 11; // Reducir la altura de la barra
      cornerRadius = 3;  // Reducir el radio de las esquinas redondeadas
    }

    // Limpiar gráficos anteriores
    this.progressBar.clear();

    // Dibujar la barra de fondo (vacía) con las nuevas dimensiones
    this.progressBar.fillStyle(0x3f3f3f, 1); // Gris
    this.progressBar.fillRoundedRect(progressBarX, progressBarY, progressBarWidth, progressBarHeight, cornerRadius); // Usar las variables ajustadas
    this.progressBar.setScrollFactor(0);

    // Cambiar el color de la barra según el progreso
    if (this.progress <= 25) {
      this.progressBar.fillStyle(0xff0000, 0.8); // Rojo
    } else if (this.progress <= 50) {
      this.progressBar.fillStyle(0xFFA500, 0.8); // Naranja
    } else {
      this.progressBar.fillStyle(0x00ff00, 0.8); // Verde
    }

    // Dibujar la barra de progreso actualizada
    this.progressBar.fillRoundedRect(
      progressBarX,
      progressBarY,
      (this.progress / 100) * progressBarWidth, // Escalar el ancho según el progreso
      progressBarHeight,
      cornerRadius
    );
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
  start(minutes, seconds, x, y) {
    this.totalTime = minutes * 60 + seconds;

    // Crear el texto del temporizador en la posición inicial
    this.timerText = this.scene.add.text(x, y, this.formatTime(this.totalTime), { fontSize: '32px', fill: '#ffffff', stroke: "#000", strokeThickness: 3 });

    // Evento de Phaser que ejecuta una función cada segundo
    this.timeEvent = this.scene.time.addEvent({
      delay: 1000, // 1 segundo
      callback: this.updateTimer,
      callbackScope: this,
      loop: true
    });

    // Ajustar la posición del temporizador según el tamaño de la pantalla
    this.checkScreenSize();

    // Listener para cuando la pantalla cambie de tamaño
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  // Método para formatear el tiempo (mm:ss)
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const partInSeconds = seconds % 60;
    const partInSecondsFormatted = partInSeconds < 10 ? `0${partInSeconds}` : partInSeconds;
    return `${minutes}:${partInSecondsFormatted}`;
  }

  // Método para actualizar el temporizador
  updateTimer() {
    this.totalTime--;
    this.timerText.setScrollFactor(0);

    if (this.totalTime >= 0) {
      this.timerText.setText(this.formatTime(this.totalTime));
    } else {
      // Detener el evento cuando el tiempo llega a cero
      this.timeEvent.remove(false);
    }
  }

  // Método para ajustar la posición del temporizador dependiendo del tamaño de la pantalla
  checkScreenSize() {
    if (window.innerWidth < 900) {
      // Si el ancho es menor a 900px, cambiar la posición
      this.timerText.setPosition(370, 15);  // Ejemplo de nueva posición para pantallas pequeñas
    } else {
      // Si el ancho es mayor o igual a 900px, poner en la posición original o la deseada
      this.timerText.setPosition(650, 22);  // Posición original para pantallas más grandes
    }
  }
  tamañoContenedorPuntos() {
    if (window.innerWidth < 900) {
      // Posiciones para pantallas pequeñas
      this.puntosText.setPosition(this.scene.scale.width - 200, 15);  // Nueva posición para puntosText
      this.diamantesText.setPosition(this.scene.scale.width - 65, 15);  // Nueva posición para diamantesText
    } else {
      // Posiciones para pantallas grandes
      this.puntosText.setPosition(this.scene.scale.width - 285, 20);  // Posición original para puntosText
      this.diamantesText.setPosition(this.scene.scale.width - 100, 20);  // Posición original para diamantesText
    }
  }

}



