import { Personaje } from '../js/comun/animations.js';
import { ManejarPuntos } from '../js/comun/crearPuntos.js';
import { estrellasFondo } from '../js/comun/estrellasFondo.js';
import { createPlatforms } from './plataformas.js';

class MyScene extends Phaser.Scene {
   constructor() {
     super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('1112','imgLava/isla.png')
      this.load.image('hola','imgLava/lo.png')
      this.load.image('111','imgLava/looo.png')
      this.load.image('button','imgLava/arriba.png')
      this.load.image('leftButton','imgLava/izqui.png')
      this.load.image('rightButton','imgLava/derecha.png')
      this.load.image('star', 'imgLava/bo.png');
      this.load.spritesheet('mario', '../super-midu-bros-main/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
      // this.load.image('caramelo', 'imgLava/oro.png');
      this.load.audio('gameover', '../super-midu-bros-main/assets/sound/music/gameover.mp3');
      this.load.image('oxigeno', '../super-midu-bros-main/assets/oxigeno.png');
      this.load.image('volcan','imgLava/ki.png')
      this.load.image('lava','imgLava/lava.png');
      this.load.image('lavita','imgLava/lavita.png');
      this.load.image('fondoLava','imgLava/deco.png');
      this.load.image('portal','imgLava/portal.png')
      this.load.image('sec2','imgLava/sec2.png')
      this.load.image('sec1','imgLava/sec1.png')
      this.load.image('fondo','imgLava/fondo2.jpg')
      this.load.image('tr','imglava/tr.png')
     this.load.image('hielo','imgLava/hielo.png') 
     this.load.image('piedra','imgLava/ed.png')
     this.load.image('pd','imgLava/pd.png')
     this.load.image('iglu', 'imgLava/iglu.png')
     this.load.image('caramelo','imgLava/w.png')
         this.load.image("siete", "imgLava/rr.png");
   
     
         
   }

   create() {
   this.add.image(700,config.height -300, 'fondo').setScale(0.3)
    this.add.image(300,config.height - 430,'hielo').setScale(0.2)
   // this.add.image(600, config.height -130, 'sec1').setScale(1)


      this.add.image(570, config.height - 248, 'piedra').setScale(0.04)
      this.add.image(870, config.height - 195, 'piedra').setScale(0.04)
      this.add.image(900, config.height - 195, 'piedra').setScale(0.04)

   this.add.image(350, config.height -160,'volcan').setScale(0.06)
   this.add.image(1100, config.height -190,'volcan').setScale(0.06)
  this.add.image(40, config.height - 135, 'portal').setScale(0.2)
   this.add.image(300, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(500, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(700, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(900, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(1100, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(1300, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(1400, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(100, config.height -1 , 'lavita').setScale(0.14);
   this.add.image(1340, config.height - 470, 'pd').setScale(0.05)
   this.add.image(1150, config.height - 562, 'pd').setScale(0.05)
   this.add.image(1300, config.height - 280, 'pd').setScale(0.05)
   this.add.image(140, config.height - 500, 'iglu').setScale(0.2)

     this.floor = this.physics.add.staticGroup();

     // Llamar a la función de creación de plataformas
     createPlatforms(this);

     this.estrellasFondo = new estrellasFondo(this);

     // Crear instancia de Mario
     this.instanciaPersonaje = new Personaje(this); 

     const manejarPuntos = new ManejarPuntos(this);
     this.mineral = manejarPuntos.crearMinerales(); 
     this.oxigeno = manejarPuntos.crearOxigeno();
     this.siete = manejarPuntos.crearSiete(1200, 300);
 
     manejarPuntos.configurarColisionOxigeno(this.oxigeno);
     manejarPuntos.configurarColisionMineral(this.mineral);
     manejarPuntos.configurarColisionSiete(this.siete);

     this.physics.world.setBounds(0, config.height - 1300, 1450, 1300);
     this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
     this.physics.add.collider(this.mineral, this.floor);
     this.physics.add.collider(this.oxigeno, this.floor);
     this.physics.add.collider(this.siete,this.floor);
 
     this.cameras.main.setBounds(0, config.height - 1300, 1450, 1300);
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