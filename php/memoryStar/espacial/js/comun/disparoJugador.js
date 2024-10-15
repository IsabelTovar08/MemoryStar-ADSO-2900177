export class Disparo {
    constructor(scene, player) {
        this.scene = scene;           // Referencia a la escena principal
        this.player = player;         // Referencia al jugador
        this.balas = null;            // Grupo de balas
        this.velocidadBala = 400;     // Velocidad de las balas
        this.ultimaBalaDisparada = 0; // Tiempo del último disparo

        this.crearGrupoBalas();       // Crear el grupo de balas
    }

    crearGrupoBalas() {
        this.balas = this.scene.physics.add.group({
            defaultKey: 'projectile',
            maxSize: 100,
            createCallback: (bala) => {
                bala.setScale(0.1); // Escalar la bala
            }
        });
    }

    disparar() {
        const tiempoActual = this.scene.game.getTime();
        if (tiempoActual > this.ultimaBalaDisparada) {
            // Crear una nueva bala
            const bala = this.balas.get(this.player.x, this.player.y);
            this.scene.sound.add("disparo", { volume: 1 }).play();

            if (bala) {
                bala.setActive(true);
                bala.setVisible(true);
                bala.body.velocity.x = this.velocidadBala * Math.cos(this.player.rotation);
                bala.body.velocity.y = this.velocidadBala * Math.sin(this.player.rotation);
                bala.setRotation(this.player.rotation);

                // Eliminar la bala después de 2 segundos
                this.scene.time.delayedCall(2000, () => {
                    bala.destroy();  // Eliminar la bala
                });

                this.ultimaBalaDisparada = tiempoActual + 300;  // Control de la frecuencia de disparo
            }
        }
    }
}
