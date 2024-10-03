// MineralManager.js
export class ManejarPuntos {
    constructor(scene) {
        this.scene = scene;
        
        // Tiempo
        this.tiempo = 15;
        this.tiempoText = this.scene.add.text(0, 0, 'TIEMPO DE VIDA: 15', { fontSize: '32px', fill: '#fff' });
        this.tiempoText.setScrollFactor(0);

        // Puntuación
        this.score = 0;
        this.scoreText = this.scene.add.text(16, 100, 'Score: 0', { fontSize: '32px', fill: '#fff' });
        this.scoreText.setScrollFactor(0);

        // Temporizador
        this.scene.time.addEvent({
            delay: 1000, 
            callback: this.decrementarTiempo,
            callbackScope: this,
            loop: true
        });
    }

    crearMinerales() {
        const mineralGroup = this.scene.physics.add.group({
            key: 'mineral',
            repeat: 10,
            setXY: { x: 0, y: 0, stepX: 100 }
        });

        this.configurarMinerales(mineralGroup);
        return mineralGroup;
    }

    configurarMinerales(mineralGroup) {
        mineralGroup.children.iterate(function (child) {
            child.setY(Phaser.Math.Between(0, 1) === 0 ? 0 : 400);
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
            child.setScale(0.08);
        });
    }
  
    crearOxigeno() {
        const oxigenGroup = this.scene.physics.add.group({
            key: 'oxigeno',
            repeat: 4,
            setXY: { x: Phaser.Math.Between(200, 350), y: 0, stepX: 280 }
        });

        this.configurarOxigeno(oxigenGroup);
        return oxigenGroup;
    }
    configurarOxigeno(oxigenGroup) {
        oxigenGroup.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
            child.setScale(0.1);
        });
    }

    decrementarTiempo() {
        if (this.tiempo > 0) {
            this.tiempo -= 1;
            this.tiempoText.setText('TIEMPO DE VIDA: ' + this.tiempo);
        }
      
        if (this.tiempo <= 0 && !this.scene.instanciaPersonaje.jugador.isDead) {
            this.scene.instanciaPersonaje.jugador.isDead = true;
            this.scene.instanciaPersonaje.jugador.anims.play('mario-dead');
            this.scene.instanciaPersonaje.jugador.setCollideWorldBounds(false);
            this.scene.sound.add('gameover', { volume: 0.2 }).play();
        
            setTimeout(() => {
                this.scene.instanciaPersonaje.jugador.setVelocityY(-350);
            }, 100);
        }
    }
    
    recolectarOxigeno(mario, oxigeno) {
        oxigeno.disableBody(true, true);
        this.tiempo = 15;
        this.tiempoText.setText('TIEMPO DE VIDA: ' + this.tiempo);
    }

    configurarColisionOxigeno(oxigenGroup) {
        this.scene.physics.add.overlap(this.scene.instanciaPersonaje.jugador, oxigenGroup, this.recolectarOxigeno, null, this);
    }

    recolectarMineral(mario, mineral) {
        mineral.disableBody(true, true); 
        this.score += 10; 
        this.scoreText.setText('Score: ' + this.score);

        if (this.score >= 60) {
            this.scoreText.setText('Score: ' + this.score + ' - NIVEL COMPLETADO');
            this.showModal(); 
        }
    }

    configurarColisionMineral(mineralGroup) {
        this.scene.physics.add.overlap(this.scene.instanciaPersonaje.jugador, mineralGroup, this.recolectarMineral, null, this);
    }

    showModal() {
        console.log('¡Nivel Completado!');
    }
}