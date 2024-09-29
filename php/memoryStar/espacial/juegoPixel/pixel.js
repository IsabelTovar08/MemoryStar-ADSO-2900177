import { Personaje } from '../js/comun/animations.js';
import { ManejarPuntos } from '../js/comun/crearPuntos.js';
import { estrellasFondo } from '../js/comun/estrellasFondo.js';
import { createPlatforms } from './plataformasPixel.js';

class MyScene extends Phaser.Scene {
   constructor() {
      super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('star', '../super-midu-bros-main/planetas/estrella.png');
      this.load.spritesheet('mario', '../super-midu-bros-main/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
      this.load.image('corazon', 'imgPixel/corazon.png');
      this.load.audio('gameover', '../super-midu-bros-main/assets/sound/music/gameover.mp3');
      this.load.image('oxigeno', '../super-midu-bros-main/assets/oxigeno.png');
      this.load.image('suelo', 'imgPixel/pop/1.png');
      this.load.image('flotante', 'imgPixel/pñp/12.png');
      this.load.image('suelo-flotante', 'imgPixel/kok/1.png');
      this.load.image('suelo-flo', 'imgPixel/pñp/2.png');
      this.load.image('puente', 'imgPixel/pixe/1.png');
      this.load.image('planetaRojo', 'imgPixel/planet/rojo.png');
      this.load.image('planetaRosa', 'imgPixel/planet/6.png');
      this.load.image('piedra', 'imgPixel/roca.png');
      this.load.image('piedrita', 'imgPixel/piedrita.png');
      this.load.image('arbol', 'imgPixel/arboles/1.png');
      this.load.image('arbol-azul', 'imgPixel/arboles/3.png');
      this.load.image('arbol-amarillo', 'imgPixel/pixe/3.png');
      this.load.image('arbusto', 'imgPixel/arbusto.png');
      this.load.image('luz', 'imgPixel/luz.png');
      this.load.image('cactus', 'imgPixel/pixe/2.png');
      this.load.image('matera', 'imgPixel/matera.png');
      this.load.image('cerca', 'imgPixel/cerca.png');
      this.load.image('fondo', 'imgPixel/fondo-pixel-2.jpeg');
      this.load.image('montaña', 'imgPixel/kok/2.png');
      this.load.image('montañaFin', 'imgPixel/montaña-fin.png');
      this.load.image('montañaVerde', 'imgPixel/pixe/5.png');
      this.load.image('siete','../juegoLuna/imgLuna/7.png')
   }

   create() {
      this.add.image(0, config.height - 5, 'fondo').setOrigin(0, 1).setScale(2);
      this.add.image(85, config.height - 112, 'luz').setScale(0.2);
      this.add.image(310, config.height - 82, 'cactus').setScale(0.05);
      this.add.image(290, config.height - 72, 'piedra').setScale(0.04);
      this.add.image(200, config.height - 470, 'matera').setScale(0.1);
      this.add.image(80, config.height - 348, 'piedra').setScale(0.05);
      this.add.image(480, config.height - 420, 'arbusto').setScale(0.14);
      this.add.image(450, config.height - 420, 'arbusto').setScale(0.14);
      this.add.image(440, config.height - 420, 'piedrita').setScale(0.05);
      this.add.image(480, config.height - 420, 'piedra').setScale(0.03);
      this.add.image(1580, config.height - 440, 'luz').setScale(0.2);
      this.add.image(930, config.height - 455, 'arbusto').setScale(0.14);
      this.add.image(780, config.height - 275, 'arbol-azul').setScale(0.15);
      this.add.image(720, config.height - 285, 'luz').setScale(0.2);
      this.add.image(950, config.height - 290, 'puente').setScale(0.25);
      this.add.image(810, config.height - 240, 'piedrita').setScale(0.09);
      this.add.image(300, config.height - 500, 'planetaRojo').setScale(0.25).setAlpha(0.7);
      this.add.image(1000, config.height - 650, 'planetaRosa').setScale(0.15).setAlpha(0.7);
      this.add.image(500, config.height, 'montaña').setScale(0.25);
      this.add.image(850, config.height - 70, 'montaña').setScale(0.25);
      this.add.image(1150, config.height - 98, 'montaña').setScale(0.25);
      this.add.image(1420, config.height - 90, 'montañaFin').setScale(0.25);
      this.add.image(490, config.height - 425, 'piedraC').setScale(0.07).setAlpha(0.8);
      this.add.image(1050, config.height - 650, 'flor').setScale(0.1);
      this.add.image(650, config.height - 458, 'piedra').setScale(0.05);
      this.add.image(1100, config.height - 290, 'arbol').setScale(0.2);
      this.add.image(1300, config.height - 512, 'arbol-amarillo').setScale(0.15);

      this.add.image(1315, config.height - 480, 'piedra').setScale(0.04);

      this.floor = this.physics.add.staticGroup();

      // Llamar a la función de creación de plataformas
      createPlatforms(this);

      this.estrellasFondo = new estrellasFondo(this);

      // Crear instancia de Mario
      this.instanciaPersonaje = new Personaje(this);

      // const manejarPuntos2 = new ManejarPuntos(this)


      const manejarPuntos = new ManejarPuntos(this);
      this.mineral = manejarPuntos.crearCorazones();
      this.oxigeno = manejarPuntos.crearOxigeno();
      this.siete = manejarPuntos.crearSiete(1200, 300);

      manejarPuntos.configurarColisionOxigeno(this.oxigeno);
      manejarPuntos.configurarColisionMineral(this.mineral);
      manejarPuntos.configurarColisionSiete(this.siete);

      this.physics.world.setBounds(0, config.height - 1500, 1850, 1500);
      this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
      this.physics.add.collider(this.mineral, this.floor);
      this.physics.add.collider(this.oxigeno, this.floor);
      this.physics.add.collider(this.siete,this.floor);
      

      this.cameras.main.setBounds(0, config.height - 1500, 1850, 1500);
      this.cameras.main.startFollow(this.instanciaPersonaje.jugador);

   }

   update() {
      this.estrellasFondo.update();
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