export class partesNave {
    constructor(scene) {
        this.scene = scene;
        this.object1Collected = false;
        this.object2Collected = false;
        this.object3Collected = false;
        this.object4Collected = false;

        // Inicializar el cuadro de la nave
        this.initGraphics();
        this.addPartesNave();
        this.adjustForMobile();
    }

    // Métodos de la clase
    initGraphics() {
        this.graphicsWidth = 75;
        this.graphicsHeight = 240;
        this.graphicsX = 15;
        this.graphicsY = 70;

        if (window.innerWidth < 900) {
            this.graphicsWidth = 50;
            this.graphicsHeight = 162;
            this.graphicsX = 9;
            this.graphicsY = 60;
        }

        this.graphicsPartes = this.scene.add.graphics()
            .fillStyle(0xffc5c5, 0.5)
            .fillRect(this.graphicsX, this.graphicsY, this.graphicsWidth, this.graphicsHeight)
            .setScrollFactor(0);

        let maskGraphicsPartes = this.scene.make.graphics()
            .fillStyle(0xffffff)
            .fillRoundedRect(this.graphicsX, this.graphicsY, this.graphicsWidth, this.graphicsHeight, 5)
            .setScrollFactor(0);

        this.graphicsPartes.setMask(maskGraphicsPartes.createGeometryMask());
    }

    addPartesNave() {
        this.nave = this.scene.add.image(23, 77, 'alas').setScale(0.1).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
        this.propulsores = this.scene.add.image(23, 140, 'propulsores').setScale(0.55).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
        this.cabina = this.scene.add.image(23, 190, 'cabina').setScale(0.4).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
        this.cubierta = this.scene.add.image(23, 250, 'cubierta').setScale(0.23).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
    }

    adjustForMobile() {
        if (window.innerWidth < 900) {
            this.nave.setScale(0.08);
            this.nave.setPosition(13, 70);
            this.propulsores.setScale(0.4);
            this.propulsores.setPosition(13, 110);
            this.cabina.setScale(0.3);
            this.cabina.setPosition(13, 150);
            this.cubierta.setScale(0.5);
            this.cubierta.setPosition(13, 180);
        }
    }

    recolectarObjeto(objeto, objetoRecolectado, modalId, nave, objetoColeccionado) {
        this.scene.physics.add.overlap(this.scene.jugador, objeto, () => {
            if (!objetoRecolectado) {
                objetoColeccionado(); // Actualiza el estado
                objeto.disableBody(true, true);
                this.scene.sound.add("sonido", { volume: 0.2 }).play();

                // Mostrar modal
                const modal = new bootstrap.Modal(document.getElementById(modalId));
                modal.show();

                // Temporizador para cerrar el modal
                let contador = 3; // Valor inicial del contador
                const temporizadorModal = setInterval(() => {
                    contador--;
                    if (contador <= 0) {
                        clearInterval(temporizadorModal);
                        modal.hide();
                    }
                }, 500);

                nave.clearTint();

                // Verifica si todos los objetos están recolectados
                if (this.object1Collected && this.object2Collected && this.object3Collected && this.object4Collected) {
                    // Retraso de 2 segundos para reproducir el sonido de victoria
                    setTimeout(() => {
                        this.scene.add.text(300, this.scene.scale.height - 450, "FELICIDADES, ENCONTRASTE TODAS LAS PARTES!", {
                            fontSize: "40px",
                            fill: "#fff",
                        });
                        this.scene.sound.add("victoria", { volume: 0.2 }).play();
                        console.log('sonido de victoria');
                    }, 1000);

                    // Modal de redirección después de recolectar todo
                    setTimeout(() => {
                        const modal = new bootstrap.Modal(document.getElementById('modalRedireccion'));
                        modal.show();
                        const boton = document.getElementById('aceptarRedireccion');
                        boton.addEventListener('click', this.redirigir);
                    }, 3000);
                }
            }
        });
    }

    redirigir() {
        window.location.href = "../pruebaNave.html";
    }
}
