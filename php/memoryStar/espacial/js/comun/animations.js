export class Personaje {
  constructor(scene) {
    this.scene = scene;
    
    this.keys = scene.input.keyboard.createCursorKeys();
    this.isDead = false;
    this.startX = 100;
    this.startY = this.scene.scale.height - 80;

    this.jugador = this.scene.physics.add.sprite(this.startX, this.startY, 'mario')
      .setOrigin(0, 1)
      .setGravityY(300)
      .setScale(2.5);

    this.jugador.setCollideWorldBounds(true);

    this.createAnimations();
    this.createTouchControls();  // Añadido: crear controles táctiles
  }

  createAnimations() {
    this.scene.anims.create({
      key: 'mario-walk',
      frames: this.scene.anims.generateFrameNumbers('mario', { start: 1, end: 3 }),
      frameRate: 12,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'mario-idle',
      frames: [{ key: 'mario', frame: 0 }]
    });

    this.scene.anims.create({
      key: 'mario-jump',
      frames: [{ key: 'mario', frame: 5 }]
    });

    this.scene.anims.create({
      key: 'mario-dead',
      frames: [{ key: 'mario', frame: 4 }]
    });
  }

  handleMovement() {
    if (this.isDead) return; // No mover si está muerto

    if (this.keys.left.isDown) {
      this.jugador.anims.play('mario-walk', true);
      this.jugador.x -= 4;
      this.jugador.flipX = true;
    } else if (this.keys.right.isDown) {
      this.jugador.anims.play('mario-walk', true);
      this.jugador.x += 4;
      this.jugador.flipX = false;
    } else {
      this.jugador.anims.play('mario-idle', true);
    }

    if (this.keys.up.isDown && this.jugador.body.touching.down) {
      this.jugador.setVelocityY(-350);
      this.jugador.anims.play('mario-jump', true);
    }

    if (this.jugador.y >= this.scene.scale.height) {
      this.handleDeath();
    }
  }

  handleDeath() {
    this.isDead = true;
    this.jugador.setCollideWorldBounds(false);
    this.scene.sound.add('gameover', { volume: 0.2 }).play();

    setTimeout(() => {
      this.jugador.setVelocityY(-350);
    }, 100);

    setTimeout(() => {
      this.resurrect();
    }, 2000);
  }

  resurrect() {
    this.jugador.setX(this.startX);
    this.jugador.setY(this.startY);
    this.jugador.setVelocity(0, 0);
    this.isDead = false;
    this.jugador.setCollideWorldBounds(true);
    this.jugador.anims.play('mario-idle');
  }

  createTouchControls() {
    if (window.innerWidth <= 1000) { // Ajusta el ancho según sea necesario
      const screenWidth = this.scene.scale.width;
      const screenHeight = this.scene.scale.height;
  
      // Crear el botón de salto en la parte derecha de la pantalla
      const jumpButton = this.scene.add.sprite(screenWidth * 0.85, screenHeight * 0.85, 'button')
        .setInteractive()
        .setScale(0.24)
        .setScrollFactor(0);
  
      jumpButton.on('pointerdown', () => {
        if (this.jugador.body.touching.down && !this.isDead) {  // Verificar que no esté muerto
          this.jugador.setVelocityY(-380);
          this.jugador.anims.play('mario-jump', true);
        }
      });
  
      // Botón izquierdo en la parte izquierda de la pantalla
      const leftButton = this.scene.add.sprite(screenWidth * 0.1, screenHeight * 0.85, 'leftButton')
        .setInteractive()
        .setScale(0.24)
        .setScrollFactor(0);
  
      leftButton.on('pointerdown', () => {
        if (!this.isDead) {  // Verificar que Mario no esté muerto
          this.jugador.setVelocityX(-220);
          this.jugador.anims.play('mario-walk', true); // Activar animación de caminar
          this.jugador.flipX = true;
        }
      });
  
      leftButton.on('pointerup', () => {
        if (!this.isDead) {  // Verificar que Mario no esté muerto
          this.jugador.setVelocityX(0);
          this.jugador.anims.play('mario-idle', true);
        }
      });
  
      // Botón derecho en la parte derecha de la pantalla
      const rightButton = this.scene.add.sprite(screenWidth * 0.2, screenHeight * 0.85, 'rightButton')
        .setInteractive()
        .setScale(0.24)
        .setScrollFactor(0);
  
      rightButton.on('pointerdown', () => {
        if (!this.isDead) {  // Verificar que Mario no esté muerto
          this.jugador.setVelocityX(220);
          this.jugador.anims.play('mario-walk', true); // Activar animación de caminar
          this.jugador.flipX = false;
        }
      });
  
      rightButton.on('pointerup', () => {
        if (!this.isDead) {  // Verificar que Mario no esté muerto
          this.jugador.setVelocityX(0);
          this.jugador.anims.play('mario-walk', true);
        }
      });
    }
  }
  
}
