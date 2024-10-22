export class Disparo {
    constructor(scene, arma, boss) { // Recibe el boss como parámetro
        this.scene = scene;
        this.arma = arma;
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
        const bala = this.balas.get(this.arma.x, this.arma.y); // Posición de la bala según el arma
        this.scene.sound.add("disparo", { volume: 1 }).play(); // Sonido del disparo
        if (bala) {
            bala.setActive(true);
            bala.setVisible(true);

            // Ajustar la dirección de la bala según la rotación del arma
            const direccionX = this.velocidadBala * Math.cos(this.arma.rotation);
            const direccionY = this.velocidadBala * Math.sin(this.arma.rotation);

            // Si el arma está volteada (por ejemplo, apuntando hacia la izquierda)
            if (this.arma.flipX) {
                bala.body.velocity.x = -direccionX; // Invertir dirección en el eje X
            bala.body.velocity.y = -direccionY; // Mantener la dirección Y en función de la rotación
                

            } else {
                bala.body.velocity.x = direccionX; // Dirección normal
            bala.body.velocity.y = direccionY; // Mantener la dirección Y en función de la rotación
                
            }

            bala.setRotation(this.arma.rotation); // Alinear la rotación de la bala con el arma

            // Eliminar la bala después de 2 segundos
            this.scene.time.delayedCall(2000, () => {
                bala.destroy(); // Destruir la bala después de un tiempo
            });

            // Actualizar el tiempo para el siguiente disparo
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
