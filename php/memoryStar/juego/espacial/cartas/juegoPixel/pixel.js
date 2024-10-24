import { Personaje } from "../../js/comun/animations.js";
import { ManejarPuntos } from "../../js/comun/crearPuntos.js";
import { estrellasFondo } from "../../js/comun/estrellasFondo.js";
import { createPlatforms } from './plataformasPixel.js';
import { partesNave } from "../../js/comun/nave.js";
import { creacionRecolectables } from "../../js/comun/basePuntos.js";
import { UIElementsBarras } from "../../js/comun/crearBarras.js";

class MyScene extends Phaser.Scene {
   constructor() {
      super({ key: 'MyScene' });
   }

   preload() {
      this.load.image('star', '../../super-midu-bros-main/planetas/estrella.png');
      this.load.spritesheet("mario","../../img/vacaUltima.png", { frameWidth: 365, frameHeight: 412 });
      this.load.spritesheet("boss", "../../super-midu-bros-main/assets/entities/mario.png", {
         frameWidth: 18,
         frameHeight: 14,
      });
      this.load.audio('sonido', '../../sonidos/recolectar.mp3');
      this.load.audio('coin', '../../sonidos/coin.mp3');
      this.load.audio('soundCoin', '../../sonidos/soundCoin.mp3');
      this.load.audio('caida', '../../sonidos/caida.mp3');
      this.load.audio('muerte', '../../sonidos/muerte.mp3');
      this.load.audio('victoria', '../../sonidos/victoria.mp3');
      this.load.audio('sonidoOxigeno', '../../sonidos/recolectaOxigeno.mp3');

      this.load.image('corazon', 'imgPixel/corazon.png');
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

      this.load.image('alas', '../../img/alasC.png');
      this.load.image('propulsores', '../../img/propulsores.png');
      this.load.image('cabina', '../../img/cabinaN.png');
      this.load.image('cubierta', '../../img/cuerpoNave.png');

      this.load.image('diamante', '../../img/diamante.png');
      this.load.image('temporizador', '../../img/tiempo.png');
      this.load.image('estrellaPuntos', '../../img/puntos.png');
      this.load.image('salir', '../../img/salir.png');
      this.load.image('oxigeRecort', '../../img/oxigen.png');

   
      this.load.image("button", "../../img/arriba.png");
      this.load.image("leftButton", "../../img/izqui.png");
      this.load.image("rightButton", "../../img/derecha.png");
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

      // this.add.image(500, config.height - 200, 'siete').setScale(0.06);

      this.object1 = this.physics.add.image(Phaser.Math.Between(700, 1100), config.height - 300, 'alas').setScale(0.15);
      this.object2 = this.physics.add.image(Phaser.Math.Between(80, 380), config.height - 400, 'propulsores').setScale(0.6);
      this.object3 = this.physics.add.image(Phaser.Math.Between(400, 500), config.height - 500, 'cabina').setScale(0.5);
      this.object4 = this.physics.add.image(Phaser.Math.Between(900, 1300), config.height - 500, 'cubierta').setScale(0.35);


      this.floor = this.physics.add.staticGroup();
      createPlatforms(this);
      this.elementosSuperiores = new UIElementsBarras(this);

      this.manejoPuntos = new ManejarPuntos(this);
      this.manejoRecolectables = new creacionRecolectables(this, this.manejoPuntos)

      this.estrellasFondo = new estrellasFondo(this);

      this.instanciaPersonaje = new Personaje(this);
      this.jugador = this.instanciaPersonaje.jugador;


      this.corazones = this.manejoRecolectables.crearCorazones();
      this.oxigeno = this.manejoRecolectables.crearOxigeno();
      this.siete = this.manejoRecolectables.crearSiete(1200, 300);
      this.iniciarOxigeno = this.manejoPuntos.drawProgressBar();
      this.manejoPuntos.start(1, 0, 650, 10);

      // Se instancia al final para que no interfiera con el diseño
      this.instanciaPartesNave = new partesNave(this);

      // Botón salir
      const botonSalir = this.add.image(config.width - 10, config.height - 10, 'salir').setScale(0.11).setOrigin(1, 1).setScrollFactor(0).setInteractive();

      botonSalir.on('pointerover', () => {
         botonSalir.setScale(0.12).setTint(0xaaaaaa);
      });
      botonSalir.on('pointerout', () => {
         botonSalir.setScale(0.11).clearTint();
      });
      botonSalir.on('pointerdown', () => {
         window.location.href = '../../../index.php';
      });


      // COnfigurar coliciones para el oxigeno y corazones
      this.manejoRecolectables.configurarColisionOxigeno(this.oxigeno);
      this.manejoRecolectables.configurarColisionMineral(this.corazones);
      // manejarPuntos.configurarColisionSiete(this.siete, "../juegoLava/index.html");

      // Coliciones entre el personaje y el suelo y los recolectables y el suelo
      this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
      this.physics.add.collider(this.corazones, this.floor);
      this.physics.add.collider(this.oxigeno, this.floor);
      this.physics.add.collider(this.siete, this.floor);
      this.physics.add.collider(this.object1, this.floor);
      this.physics.add.collider(this.object2, this.floor);
      this.physics.add.collider(this.object3, this.floor);
      this.physics.add.collider(this.object4, this.floor);

 


// Actualizar el estado de las partes recolectadas
      this.instanciaPartesNave.recolectarObjeto(this.object1, this.instanciaPartesNave.object1Collected, "modalObjeto1", this.instanciaPartesNave.nave, () => { this.instanciaPartesNave.object1Collected = true; });
      this.instanciaPartesNave.recolectarObjeto(this.object2, this.instanciaPartesNave.object2Collected, "modalObjeto2", this.instanciaPartesNave.propulsores, () => { this.instanciaPartesNave.object2Collected = true; });
      this.instanciaPartesNave.recolectarObjeto(this.object3, this.instanciaPartesNave.object3Collected, "modalObjeto3", this.instanciaPartesNave.cabina, () => { this.instanciaPartesNave.object3Collected = true; });
      this.instanciaPartesNave.recolectarObjeto(this.object4, this.instanciaPartesNave.object4Collected, "modalObjeto4", this.instanciaPartesNave.cubierta, () => { this.instanciaPartesNave.object4Collected = true; });

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


      this.physics.world.setBounds(0, config.height - 1500, 1850, 1500);
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