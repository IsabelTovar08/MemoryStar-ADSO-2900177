import { Personaje } from "../../js/comun/animations.js";
import { ManejarPuntos } from "../../js/comun/crearPuntos.js";
import { estrellasFondo } from "../../js/comun/estrellasFondo.js";
import { createPlatforms } from './plataformasPixel.js';
import { partesNave } from "../../js/comun/nave.js";
// import { ManejoTiempo } from "../../js/comun/time.js";
import { creacionRecolectables } from "../../js/comun/basePuntos.js";
class MyScene extends Phaser.Scene {
   constructor() {
      super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('star', '../../super-midu-bros-main/planetas/estrella.png');
      this.load.spritesheet('mario', '../../super-midu-bros-main/assets/entities/mario.png', { frameWidth: 18, frameHeight: 16 });
      this.load.spritesheet("boss", "../../super-midu-bros-main/assets/entities/mario.png", {
         frameWidth: 18,
         frameHeight: 14,
      });
      this.load.image('fondoPartes', 'imgPixel/partesNave.png');

     

      this.load.audio('sonido', 'imgPixel/recolectar.mp3');
      this.load.audio('coin', 'imgPixel/coin.mp3');
      this.load.audio('soundCoin', 'imgPixel/soundCoin.mp3');
      this.load.audio('caida', 'imgPixel/caida.mp3');
      this.load.audio('muerte', 'imgPixel/muerte.mp3');
      this.load.audio('victoria', 'imgPixel/victoria.mp3');
      this.load.audio('sonidoOxigeno', 'imgPixel/recolectaOxigeno.mp3');
      this.load.image('oxigeRecort', 'imgPixel/oxigen.png');



      this.load.image("projectile", "imgLuna/bo.png");
      this.load.image('corazon', 'imgPixel/corazon.png');
      this.load.audio('gameover', '../../super-midu-bros-main/assets/sound/music/gameover.mp3');
      this.load.image('oxigeno', '../../super-midu-bros-main/assets/oxigeno.png');
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
      this.load.image('siete', '../juegoLuna/imgLuna/7.png')
      this.load.image('nave', 'imgPixel/nave.png');

      this.load.image('alas', 'imgPixel/alasC.png');
      this.load.image('propulsores', 'imgPixel/propulsores.png');
      this.load.image('cabina', 'imgPixel/cabina.png');
      this.load.image('cubierta', 'imgPixel/cubierta.png');
   }

   create() {
      this.add.image(0, config.height - 5, 'fondo').setOrigin(0, 1).setScale(2);
      // this.add.image(475, 10, 'fondoPartes').setOrigin(0, 0).setScale(1.1);


      let graphicsTiempo = this.add.graphics().fillStyle(0xf5deb2, 0.25).fillRect(15, 10, 270, 50).setScrollFactor(0);

      let maskGraphicsTiempo = this.make.graphics().fillStyle(0xffffff).fillRoundedRect(15, 10, 270, 50, 5).setScrollFactor(0);

      graphicsTiempo.setMask(maskGraphicsTiempo.createGeometryMask()); // Aplicar la máscara
      

      this.add.image(28, 13, 'oxigeRecort').setScale(0.09).setOrigin(0, 0).setScrollFactor(0);

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
     
      // this.add.image(500, config.height - 200, 'siete').setScale(0.06);

      this.object1 = this.physics.add.image(Phaser.Math.Between(700, 1100), config.height - 300, 'alas').setScale(0.15);
      this.object2 = this.physics.add.image(Phaser.Math.Between(80, 380), config.height - 400, 'propulsores').setScale(0.6);
      this.object3 = this.physics.add.image(Phaser.Math.Between(400, 500), config.height - 500, 'cabina').setScale(0.6);
      this.object4 = this.physics.add.image(Phaser.Math.Between(900, 1300), config.height - 500, 'cubierta').setScale(0.8);


      this.floor = this.physics.add.staticGroup();
      this.projectile = this.physics.add.group();

      createPlatforms(this);

      

     

      this.manejoPuntos = new ManejarPuntos(this);
      this.manejoRecolectables = new creacionRecolectables(this, this.manejoPuntos)

      this.estrellasFondo = new estrellasFondo(this);

      this.instanciaPersonaje = new Personaje(this);
      this.jugador = this.instanciaPersonaje.jugador;

      this.instanciaPartesNave = new partesNave(this);

      this.mineral = this.manejoRecolectables.crearCorazones();
      this.oxigeno = this.manejoRecolectables.crearOxigeno();
      this.siete = this.manejoRecolectables.crearSiete(1200, 300);


      let graphicsPartes = this.add.graphics().fillStyle(0xf5deb2, 0.3).fillRect(15, 60, 80, this.scale.height -270).setScrollFactor(0);

      let maskGraphicsPartes = this.make.graphics().fillStyle(0xffffff).fillRoundedRect(15, 60, 80, this.scale.height -270, 5).setScrollFactor(0);

      graphicsPartes.setMask(maskGraphicsPartes.createGeometryMask()); // Aplicar la máscara


      this.nave = this.add.image(20, 70, 'alas').setScale(0.12).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
      this.propulsores = this.add.image(20, 140, 'propulsores').setScale(0.6).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
      this.cabina = this.add.image(20, 190, 'cabina').setScale(0.5).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);
      this.cubierta = this.add.image(20, 250, 'cubierta').setScale(0.75).setTint(0x505050).setScrollFactor(0).setOrigin(0, 0);


      this.manejoRecolectables.configurarColisionOxigeno(this.oxigeno);
      this.manejoRecolectables.configurarColisionMineral(this.mineral);
      // manejarPuntos.configurarColisionSiete(this.siete, "../juegoLava/index.html");

      this.physics.world.setBounds(0, config.height - 1500, 1850, 1500);
      this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
      this.physics.add.collider(this.mineral, this.floor);
      this.physics.add.collider(this.oxigeno, this.floor);
      this.physics.add.collider(this.siete, this.floor);
      this.physics.add.collider(this.object1, this.floor);
      this.physics.add.collider(this.object2, this.floor);
      this.physics.add.collider(this.object3, this.floor);
      this.physics.add.collider(this.object4, this.floor);





      // Pasando funciones para actualizar el estado
      this.instanciaPartesNave.recolectarObjeto(this.object1, this.instanciaPartesNave.object1Collected, "modalObjeto", this.nave, () => { this.instanciaPartesNave.object1Collected = true; });
      this.instanciaPartesNave.recolectarObjeto(this.object2, this.instanciaPartesNave.object2Collected, "modalObjeto", this.propulsores, () => { this.instanciaPartesNave.object2Collected = true; });
      this.instanciaPartesNave.recolectarObjeto(this.object3, this.instanciaPartesNave.object3Collected, "modalObjeto", this.cabina, () => { this.instanciaPartesNave.object3Collected = true; });
      this.instanciaPartesNave.recolectarObjeto(this.object4, this.instanciaPartesNave.object4Collected, "modalObjeto", this.cubierta, () => { this.instanciaPartesNave.object4Collected = true; });

      // ../../espacial/index.html
      const datos = this.manejoPuntos.obtenerDatos();
      const datosJSON = JSON.stringify(datos);

      // Puedes usar este JSON según necesites
      console.log(datosJSON);

      fetch("../libreria/espacial.php", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: datosJSON,
      })
         .then((response) => {
            if (!response.ok) {
               throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
         })
         .then((data) => console.log(data))
         .catch((error) => console.error("Error:", error));



      this.cameras.main.setBounds(0, config.height - 1500, 1850, 1500);
      this.cameras.main.startFollow(this.instanciaPersonaje.jugador);


   }



   update(time, delta) {
      this.estrellasFondo.update();
      if (!this.instanciaPersonaje.jugador.isDead) {
         this.instanciaPersonaje.handleMovement();
      }
      this.manejoPuntos.update(time, delta);
   }
}

const config = {
   type: Phaser.AUTO,
   width: window.innerWidth > 800 ? window.innerWidth : 400,
   height: window.innerHeight > 600 ? window.innerHeight : 200,
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