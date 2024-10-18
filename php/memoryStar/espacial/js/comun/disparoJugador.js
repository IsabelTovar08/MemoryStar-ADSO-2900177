export class Disparo {
    constructor(scene, player, boss) { // Recibe el boss como parámetro
        this.scene = scene;
        this.player = player;
        this.balas = null;
        this.velocidadBala = 700;
        this.ultimaBalaDisparada = 0;
        this.boss = boss; // Guardar la referencia al boss

        this.crearGrupoBalas();
        this.configurarColisionConBoss(); // Configurar colisión con el boss
    }

    crearGrupoBalas() {
        this.balas = this.scene.physics.add.group({
            defaultKey: 'projectile',
            createCallback: (bala) => {
                bala.setScale(0.05); // Escalar la bala
            }
        });
    }

    disparar() {
        const tiempoActual = this.scene.game.getTime();
        if (tiempoActual > this.ultimaBalaDisparada) {
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

                this.ultimaBalaDisparada = tiempoActual + 300;
            }
        }
    }

    configurarColisionConBoss() {
        // Detectar la colisión entre las balas y el boss
        this.scene.physics.add.overlap(this.balas, this.boss.boss, this.colisionBalaBoss, null, this);
    }

    colisionBalaBoss(boss, bala) {
        console.log("¡La bala ha colisionado con el Boss!");
        bala.destroy();  // Destruir la bala al impactar

        // Reducir la vida del boss o cualquier otro efecto
        this.boss.reducirVida(20); // Llamar al método que reduce la vida del boss
    }
}
