import { Personaje } from './comun/animations.js';
import { ManejarPuntos } from './comun/crearPuntos.js';

class MyScene extends Phaser.Scene {
   constructor() {
     super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('star', 'planetas/estrella.png');
      this.load.image('fondo', 'planetas/6.png');
      this.load.spritesheet('mario', 'assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
      this.load.image('floorbricks', 'assets/scenery/overworld/floorbricks.png');
      this.load.image('mineral', 'planetas/cristal.png');
      this.load.audio('gameover', 'assets/sound/music/gameover.mp3');
      this.load.image('oxigeno', 'assets/oxigeno.png');
   }

   create() {
     this.add.image(400, 300, 'fondo');

     this.floor = this.physics.add.staticGroup();
     createPlatforms(this);
     this.floor = this.physics.add.staticGroup();
     this.floor.create(0, config.height - 16, 'floorbricks').setOrigin(0, 0.5).refreshBody();
     this.floor.create(150, config.height - 16, 'floorbricks').setOrigin(0, 0.5).refreshBody();

     // Crear instancia de Mario
     this.instanciaPersonaje = new Personaje(this); 

     const manejarPuntos = new ManejarPuntos(this);
     this.mineral = manejarPuntos.crearMinerales(); 
     this.oxigeno = manejarPuntos.crearOxigeno();
 
     manejarPuntos.configurarColisionOxigeno(this.oxigeno);
     manejarPuntos.configurarColisionMineral(this.mineral);
 
     this.physics.world.setBounds(0, config.height - 1200, 1450, 1200);
     this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
     this.physics.add.collider(this.mineral, this.floor);
     this.physics.add.collider(this.oxigeno, this.floor);
 
     this.cameras.main.setBounds(0, config.height - 1200, 1450, 1200);
     this.cameras.main.startFollow(this.instanciaPersonaje.jugador);
   }

   update() {
     if (!this.instanciaPersonaje.jugador.isDead) {
      this.instanciaPersonaje.handleMovement();
    }
   }
}

const config = {
   type: Phaser.AUTO,
   width: window.innerWidth,
   height: window.innerHeight,
   scene: MyScene,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 300 },
         debug: false
      }
   }
};

new Phaser.Game(config);