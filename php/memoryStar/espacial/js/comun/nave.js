export class partesNave {
    constructor(scene) {
        this.scene = scene;
        this.object1Collected = false;
        this.object2Collected = false;
        this.object3Collected = false;
        this.object4Collected = false;
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
        window.location.href = "../juegoLava/index.html";
    }
}
