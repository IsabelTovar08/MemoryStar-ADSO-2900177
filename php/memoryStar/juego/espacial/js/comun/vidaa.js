export class VidaJugador {
    constructor(scene, vidaMaxima = 100, iconoPath) {
        this.scene = scene;
        this.vidaJugador = vidaMaxima;
        this.vidaMaxima = vidaMaxima;
        this.iconoPath = iconoPath;
        this.crearContenedorVida();
    }
    
    crearContenedorVida() {
        // Crear un contenedor para agrupar barra de vida e ícono
        this.contenedor = this.scene.add.container(20, 70);
        
        // Crear gráficos para la barra de vida
        this.barraVidaJugador = this.scene.add.graphics();
        
        // Añadir ícono si se proporciona
        if (this.iconoPath) {
            this.icono = this.scene.add.image(0, 0, this.iconoPath)
                .setOrigin(0)
                .setDisplaySize(30, 30);
            this.contenedor.add(this.icono);
        }
        
        // Añadir barra de vida al contenedor
        this.contenedor.add(this.barraVidaJugador);
        
        // Establecer el contenedor como fijo en la cámara
        this.contenedor.setScrollFactor(0);
        
        this.actualizarBarra();
        
    }
  
    
    actualizarBarra() {
        this.barraVidaJugador.clear();
        
        const porcentajeVida = this.vidaJugador / this.vidaMaxima;
        
        // Establecer color verde para la vida restante
        this.barraVidaJugador.fillStyle(0x00ff00, 1);
        
        const x = 40; // Ajustar posición para dejar espacio al ícono
        const y = 0;
        const width = 200;
        const height = 20;
        const radius = 10;
        
        // Dibujar barra de vida con bordes redondeados
        this.barraVidaJugador.fillRoundedRect(x, y, width * porcentajeVida, height, radius);
        
        // Dibujar borde
        this.barraVidaJugador.lineStyle(2, 0xffffff);
        this.barraVidaJugador.strokeRoundedRect(x, y, width, height, radius);
    }
    
    // Los métodos restantes permanecen igual
    dañoJugador(amount) {
        this.vidaJugador = Math.max(this.vidaJugador - amount, 0);
        this.actualizarBarra();
        
        if (this.vidaJugador <= 0) {
            this.scene.manejoPuntos.deteriorarJugador();
        }
    }
    
    heal(amount) {
        this.vidaJugador = Math.min(this.vidaJugador + amount, this.vidaMaxima);
        this.actualizarBarra();
    }
    
    playerDied() {
        console.log('El jugador ha muerto');
    }
}