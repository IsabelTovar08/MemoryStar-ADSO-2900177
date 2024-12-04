// ManejoTiempo.js
export class ManejoTiempo {
    constructor(scene) {
        this.scene = scene;
        this.tiempo = 25;
        this.tiempoText = this.scene.add.text(0, 0, "TIEMPO DE VIDA: 25", {
            fontSize: "32px",
            fill: "#fff",
        });
        this.tiempoText.setScrollFactor(0);
        this.scene.time.addEvent({
            delay: 1000,
            callback: this.decrementarTiempo,
            callbackScope: this,
            loop: true,
        });

        this.tiempoTotal = this.tiempo; // Duración de la barra en segundos

        // Valor inicial del progreso (100%)
        this.progress = 100;

        // Decremento por segundo calculado
        this.decrementoPorSegundo = 100 / this.tiempoTotal; // Ej: 100 / 10 segundos = 10% cada segundo

        // Crear un gráfico para la barra de progreso
        this.progressBar = this.scene.add.graphics();

        // Dibujar la barra de progreso inicial
        this.drawProgressBar();
    }
    getTiempo() {
        return this.tiempo;
    }
    decrementarTiempo() {
        if (this.tiempo > 0) {
            this.tiempo -= 1;
            this.tiempoText.setText("TIEMPO DE VIDA: " + this.tiempo);
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

    confirmAction() {
        this.tiempo = 25;
        this.progress = 100;
        this.tiempoText.setText("TIEMPO DE VIDA: " + this.tiempo);
        this.compraOxigeno = true;
        console.log('comprando')
        console.log(this.compraOxigeno)


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
    deteriorarJugador() {
        this.scene.instanciaPersonaje.jugador.isDead = true;
        this.scene.instanciaPersonaje.jugador.anims.play("mario-dead");
        this.scene.instanciaPersonaje.jugador.setCollideWorldBounds(false);
        this.scene.sound.add("muerte", { volume: 1 }).play();
        this.scene.add.text(400, this.scene.scale.height - 400, "¡MORISTEEEEE!", {
            fontSize: "60px",
            fill: "#fff",
        });
        console.log("pausar");
        // this.scene.pause();                                 
        setTimeout(() => {
            this.scene.instanciaPersonaje.jugador.setVelocityY(-350);            
        }, 100);
    }
    drawProgressBar() {
        // Limpiar gráficos anteriores
        this.progressBar.clear();

        // Estilo de la barra de fondo (barra vacía)
        this.progressBar.fillStyle(0x808080, 1); // Gris
        this.progressBar.fillRect(50, 0, 200, 30); // Coordenadas y tamaño

        // Cambiar el color de la barra dependiendo del tiempo restante
        if (this.progress <= 25) { // Si quedan 5 segundos o menos
            this.progressBar.fillStyle(0xff0000, 1); // Rojo

        } else if (this.progress <= 50) {
            this.progressBar.fillStyle(0xFFA500, 1); // naranja

        } else {               
            this.progressBar.fillStyle(0x00ff00, 1); // Verde

        }

        // Dibujar la barra de progreso
        this.progressBar.fillRect(50, 0, (this.progress / 100) * 200, 30); // Se dibuja proporcional al progreso
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
