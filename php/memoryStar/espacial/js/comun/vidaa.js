export class VidaJugador {
    constructor(scene, maxHealth = 100) {
        this.scene = scene;
        this.health = maxHealth; // Vida inicial
        this.maxHealth = maxHealth; // Vida máxima
        this.createHealthBar(); // Crear la barra de salud
    }

    createHealthBar() {
        // Crear un contenedor gráfico para la barra de salud
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar(); // Dibujar la barra inicial
    }

    updateHealthBar() {
        // Limpiar la barra de salud actual
        this.healthBar.clear();
        
        // Calcular el porcentaje de vida
        const healthPercent = this.health / this.maxHealth;
        
        // Establecer el color verde para la vida restante
        this.healthBar.fillStyle(0x00ff00, 1); // Color verde para la vida restante

        // Dibujar la barra de salud con el porcentaje de vida restante
        this.healthBar.fillRect(50, 50, 200 * healthPercent, 20); // Barra ajustada al porcentaje
        
        // Dibujar un borde para la barra de salud
        this.healthBar.lineStyle(2, 0xffffff); // Borde blanco
        this.healthBar.strokeRect(50, 50, 200, 20); // Tamaño fijo de la barra
    }

    takeDamage(amount) {
        this.health = Math.max(this.health - amount, 0);
        this.updateHealthBar();

        if (this.health <= 0) {
            this.scene.manejoPuntos.deteriorarJugador();
        }
    }

    heal(amount) {
        // Curar vida y asegurarse de no exceder la vida máxima
        this.health = Math.min(this.health + amount, this.maxHealth);
        this.updateHealthBar(); // Actualizar la barra de salud
    }

    playerDied() {
        console.log('El jugador ha muerto');
        // Aquí puedes implementar la lógica de lo que sucede cuando el jugador muere
    }
}
