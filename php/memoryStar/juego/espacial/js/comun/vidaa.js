export class VidaJugador {
    constructor(scene, vidaMaxima = 100) {
        this.scene = scene;
        this.vidaJugador = vidaMaxima;
        this.vidaMaxima = vidaMaxima;
        this.crearBarraVida();
    }

    crearBarraVida() {
        this.barraVidaJugador = this.scene.add.graphics();
        this.actualizarBarra();
    }

    actualizarBarra() {
        this.barraVidaJugador.clear();
        
        const porcentajeVida = this.vidaJugador / this.vidaMaxima;
        
        // Establecer el color verde para la vida restante
        this.barraVidaJugador.fillStyle(0x00ff00, 1); // Color verde para la vida restante

        // Dibujar la barra de salud con el porcentaje de vida restante
        this.barraVidaJugador.fillRect(50, 50, 200 * porcentajeVida, 20);
        
        // Dibujar un borde para la barra de salud
        this.barraVidaJugador.lineStyle(2, 0xffffff);
        this.barraVidaJugador.strokeRect(50, 50, 200, 20);
        this.barraVidaJugador.setScrollFactor(0);
    }

    dañoJugador(amount) {
        this.vidaJugador = Math.max(this.vidaJugador - amount, 0);
        this.actualizarBarra();

        if (this.vidaJugador <= 0) {
            this.scene.manejoPuntos.deteriorarJugador();
        }
    }

    heal(amount) {
        // Curar vida y asegurarse de no exceder la vida máxima
        this.vidaJugador = Math.min(this.vidaJugador + amount, this.vidaMaxima);
        this.actualizarBarra(); // Actualizar la barra de salud
    }

    playerDied() {
        console.log('El jugador ha muerto');
        // Aquí puedes implementar la lógica de lo que sucede cuando el jugador muere
    }
}
