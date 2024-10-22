import { Personaje } from "../../js/comun/animations.js";
import { ManejarPuntos } from "../../js/comun/crearPuntos.js";
import { estrellasFondo } from "../../js/comun/estrellasFondo.js";
import { createPlatforms } from "./plataformas.js";
import { creacionRecolectables } from "../../js/comun/basePuntos.js";
import { UIElementsBarras } from "../../js/comun/crearBarras.js";
import { partesNave } from "../../js/comun/nave.js";

// import{BossScene} from "../js/comun/boss.js"

class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: "MyScene" });
  }

  preload() {
    this.load.image("sky", "imgLuna/d");
    this.load.image("button", "imgLava/arriba.png");
    this.load.image("leftButton", "imgLava/izqui.png");
    this.load.image("rightButton", "imgLava/derecha.png");
    this.load.image("star", "imgLuna/estrella.png");
    this.load.spritesheet("mario","../../img/vacaUltima.png", { frameWidth: 365, frameHeight: 400 });
    this.load.audio('sonido', '../../sonidos/recolectar.mp3');
    this.load.audio('coin', '../../sonidos/coin.mp3');
    this.load.audio('soundCoin', '../../sonidos/soundCoin.mp3');
    this.load.audio('caida', '../../sonidos/caida.mp3');
    this.load.audio('muerte', '../../sonidos/muerte.mp3');
    this.load.audio('victoria', '../../sonidos/victoria.mp3');
    this.load.audio('sonidoOxigeno', '../../sonidos/recolectaOxigeno.mp3');

    this.load.image("caramelo", "../../super-midu-bros-main/planetas/cristal.png");
    this.load.image("projectile", "imgLuna/bo.png");

    this.load.image("b", "imgLuna/b.png");
    this.load.image("hueso", "imgLuna/hueso.png");
    this.load.image("d", "imgLuna/d.png");
    this.load.image("e", "imgLuna/e.png");
    this.load.image("f", "imgLuna/f.png");

    this.load.image("k", "imgLuna/fu.png");
    this.load.image("m", "imgLuna/m.png");
    this.load.image("n", "imgLuna/1112.png");
    this.load.image("o", "imgLuna/o.png");
    this.load.image("piso", "imgLuna/98.png");
    this.load.image("meteorito", "imgLuna/m.png");
    this.load.image("fondo", "imgLuna/aa.png");
    this.load.image("robot", "imgLuna/robot.png");
    this.load.image("2", "imgLuna/2.png");
    this.load.image("bande", "imgluna/bande.png");
    this.load.image("we", "imgluna/h.jpg");
    this.load.image("crater", "imgLuna/crater.png");
    this.load.image("p1", "imgLuna/yy.png");
    this.load.image("p2", "imgLuna/y2.png");
    this.load.image("p3", "imgLuna/y3.png");
    this.load.image("uno", "imgLuna/1.png");
    this.load.image("dos", "imgLuna/2.png");
    this.load.image("tres", "imgLuna/3.png");
    this.load.image("cuatro", "imgLuna/4.png");
    this.load.image("cinco", "imgLuna/5.png");
    this.load.image("seis", "imgLuna/6.png");
    this.load.image("siete", "imgLuna/7.png");
    this.load.image("cohete", "imgLuna/98.png");
    this.load.image("sueloF", "imgLuna/87.png");


    this.load.image('alas', '../../img/alasC.png');
    this.load.image('propulsores', '../../img/propulsores.png');
    this.load.image('cabina', '../../img/cabina.png');
    this.load.image('cubierta', '../../img/cubierta.png');

    this.load.image("button", "../../img/arriba.png");
    this.load.image("leftButton", "../../img/izqui.png");
    this.load.image("rightButton", "../../img/derecha.png");
    this.load.image("siete", "imgDulces/rr.png");

    this.load.image('oxigeRecort', '../../img/oxigen.png');
    this.load.image('diamante', '../../img/diamante.png');
    this.load.image('temporizador', '../../img/tiempo.png');
    this.load.image('estrellaPuntos', '../../img/puntos.png');
    this.load.image('salir', '../../img/salir.png');
  }

  create() {
    this.add.image(0, config.height, "we").setOrigin(0,1).setScale(0.32);
    const planetas = [
      this.add
        .image(150, config.height - 100, "d")
        .setScale(0.9)
        .setAlpha(0.8),

      this.add
        .image(900, config.height - 400, "b")
        .setScale(0.3)
        .setAlpha(0.5),

      this.add
        .image(1200, config.height - 200, "f")
        .setScale(1)
        .setAlpha(0.7),
      this.add.image(760, config.height - 200, "uno").setScale(0.2),
    ];

    this.meteoritos = [];

    for (let i = 0; i < 10; i++) {
      let meteorito = this.add
        .image(
          Phaser.Math.Between(
            this.cameras.main.width,
            this.cameras.main.width + 400
          ),
          Phaser.Math.Between(50, this.cameras.main.height - 50),
          "meteorito"
        )
        .setScale(0.02);

      meteorito.velocidadX = Phaser.Math.Between(1, 3);
      this.meteoritos.push(meteorito);
    }

    this.k = this.add.image(1000, config.height - 200, "k").setScale(0.1);
    this.k = this.add.image(600, config.height - 200, "k").setScale(0.1);
    this.k = this.add.image(400, config.height - 500, "k").setScale(0.1);
    this.add.image(1000, config.height - 71, "robot").setScale(0.16);
    this.add.image(940, config.height - 50, "m").setScale(0.08);
    this.add.image(1100, config.height - 50, "bande").setScale(0.04);
    this.add.image(150, config.height - 40, "hueso").setScale(0.06);
    this.add.image(360, config.height - 360, "hueso").setScale(0.06);
    this.add.image(700, config.height - 350, "p1").setScale(0.07);
    this.add.image(80, config.height - 290, "p2").setScale(0.07);
    this.add.image(1290, config.height - 215, "p3").setScale(0.07);
    this.add.image(500, config.height - 140, "p3").setScale(0.07);
    this.add.image(1000, config.height - 292, "m").setScale(0.03);
    this.add.image(1050, config.height - 293, "m").setScale(0.04);
    this.add.image(1020, config.height - 293, "m").setScale(0.05);
    this.add.image(250, config.height - 50, "dos").setScale(0.06);
    this.add.image(60, config.height - 350, "tres").setScale(0.2);
    this.add.image(250, config.height - 240, "cuatro").setScale(0.09);
    this.add.image(450, config.height - 370, "cinco").setScale(0.06);
    this.add.image(750, config.height - 360, "cinco").setScale(0.06);
    this.add.image(430, config.height - 160, "seis").setScale(0.07);
    this.add.image(930, config.height - 310, "seis").setScale(0.07);

    this.object1 = this.physics.add.image(Phaser.Math.Between(700, 1100), config.height - 300, 'alas').setScale(0.15);
    this.object2 = this.physics.add.image(Phaser.Math.Between(80, 380), config.height - 400, 'propulsores').setScale(0.6);
    this.object3 = this.physics.add.image(Phaser.Math.Between(400, 500), config.height - 500, 'cabina').setScale(0.6);
    this.object4 = this.physics.add.image(Phaser.Math.Between(900, 1300), config.height - 500, 'cubierta').setScale(0.8);

    this.tweens.add({
      targets: planetas,
      y: "+=6",
      duration: 2000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });

    // Crear instancia del boss

    this.floor = this.physics.add.staticGroup();
    this.projectile = this.physics.add.group();

    createPlatforms(this);
    this.elementosSuperiores = new UIElementsBarras(this);

    this.estrellasFondo = new estrellasFondo(this);
    this.instanciaPersonaje = new Personaje(this);
    this.jugador = this.instanciaPersonaje.jugador;

    // const manejarPuntos = new ManejarPuntos(this);
    // this.mineral = manejarPuntos.crearMinerales();
    // this.oxigeno = manejarPuntos.crearOxigeno();
    // this.siete = manejarPuntos.crearSiete(1200, 300);
   

    // manejarPuntos.configurarColisionOxigeno(this.oxigeno);
    // manejarPuntos.configurarColisionMineral(this.mineral);
    // manejarPuntos.configurarColisionSiete(
    //   this.siete,
    //   "../../espacial/index.html"
    // );

    // this.physics.world.setBounds(0, config.height - 1300, 1450, 1300);
    // this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
    // this.physics.add.collider(this.mineral, this.floor);
    // this.physics.add.collider(this.oxigeno, this.floor);
    // this.physics.add.collider(this.siete, this.floor);


    this.manejoPuntos = new ManejarPuntos(this);
    this.manejoRecolectables = new creacionRecolectables(this ,this.manejoPuntos)
    this.iniciarOxigeno = this.manejoPuntos.drawProgressBar();
    this.manejoPuntos.start(1, 0, 650, 10);
    
    this.minerales = this.manejoRecolectables.crearMinerales();
    this.oxigeno = this.manejoRecolectables.crearOxigeno();
    this.siete = this.manejoRecolectables.crearSiete(1200, 300);

    this.manejoRecolectables.configurarColisionOxigeno(this.oxigeno);
    this.manejoRecolectables.configurarColisionMineral(this.minerales);

    this.instanciaPartesNave = new partesNave(this);


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


    // COnfigurar coliciones para el oxigeno y minerales
    this.manejoRecolectables.configurarColisionOxigeno(this.oxigeno);
    this.manejoRecolectables.configurarColisionMineral(this.minerales);


              // Se instancia al final para que no interfiera con el diseño
   // Coliciones entre el personaje y el suelo y los recolectables y el suelo
   this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
   this.physics.add.collider(this.minerales, this.floor);
   this.physics.add.collider(this.oxigeno, this.floor);
   this.physics.add.collider(this.siete, this.floor);
   this.physics.add.collider(this.object1, this.floor);
   this.physics.add.collider(this.object2, this.floor);
   this.physics.add.collider(this.object3, this.floor);
   this.physics.add.collider(this.object4, this.floor);

   // Actualizar el estado de las partes recolectadas
   this.instanciaPartesNave.recolectarObjeto(this.object1, this.instanciaPartesNave.object1Collected, "modalObjeto", this.instanciaPartesNave.nave, () => { this.instanciaPartesNave.object1Collected = true; });
   this.instanciaPartesNave.recolectarObjeto(this.object2, this.instanciaPartesNave.object2Collected, "modalObjeto", this.instanciaPartesNave.propulsores, () => { this.instanciaPartesNave.object2Collected = true; });
   this.instanciaPartesNave.recolectarObjeto(this.object3, this.instanciaPartesNave.object3Collected, "modalObjeto", this.instanciaPartesNave.cabina, () => { this.instanciaPartesNave.object3Collected = true; });
   this.instanciaPartesNave.recolectarObjeto(this.object4, this.instanciaPartesNave.object4Collected, "modalObjeto", this.instanciaPartesNave.cubierta, () => { this.instanciaPartesNave.object4Collected = true; });

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

    this.cameras.main.setBounds(0, config.height - 1300, 1450, 1300);

    this.cameras.main.startFollow(this.instanciaPersonaje.jugador);
  }

  update(time, delta) {
    this.estrellasFondo.update();
    if (!this.instanciaPersonaje.jugador.isDead) {
      this.instanciaPersonaje.handleMovement();
    }

    this.meteoritos.forEach((meteorito) => {
      meteorito.x -= meteorito.velocidadX;

      if (meteorito.x < -meteorito.width) {
        meteorito.x = this.cameras.main.width + 100;
        meteorito.y = Phaser.Math.Between(50, this.cameras.main.height - 50);
        meteorito.velocidadX = Phaser.Math.Between(1, 3);
      }
    });
    this.manejoPuntos.update(time, delta);

  }
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: MyScene,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
