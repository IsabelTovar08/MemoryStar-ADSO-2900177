export class Personaje {
  constructor(scene) {
    this.scene = scene;
    this.keys = scene.input.keyboard.createCursorKeys();
    this.isDead = false;
    this.startX = 100; 
    this.startY = 450; 

    this.jugador = this.scene.physics.add.sprite(this.startX, this.startY, 'mario')
    .setOrigin(0, 1)
    .setGravityY(300)
    .setScale(2);

    this.jugador.setCollideWorldBounds(true);


    this.createAnimations();
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
      this.jugador.x -= 2;
      this.jugador.flipX = true;
    } else if (this.keys.right.isDown) {
      this.jugador.anims.play('mario-walk', true);
      this.jugador.x += 2;
      this.jugador.flipX = false;
    } else {
      this.jugador.anims.play('mario-idle', true);
    }

    if (this.keys.up.isDown && this.jugador.body.touching.down) {
      this.jugador.setVelocityY(-300);
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
}