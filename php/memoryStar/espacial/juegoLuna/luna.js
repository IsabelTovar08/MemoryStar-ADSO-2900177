import { Personaje } from "../js/comun/animations.js";
import { ManejarPuntos } from "../js/comun/crearPuntos.js";
import { estrellasFondo } from "../js/comun/estrellasFondo.js";
import { createPlatforms } from "./plataformas.js";

class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: "MyScene" });
  }

  preload() {
    this.load.image("button", "imgLava/arriba.png");
    this.load.image("leftButton", "imgLava/izqui.png");
    this.load.image("rightButton", "imgLava/derecha.png");
    this.load.image("star", "imgLuna/estrella.png");
    this.load.spritesheet(
      "mario",
      "../super-midu-bros-main/assets/entities/mario.png",
      { frameWidth: 18, frameHeight: 16 }
    );
    this.load.image("caramelo", "../super-midu-bros-main/planetas/cristal.png");
    this.load.audio(
      "gameover",
      "../super-midu-bros-main/assets/sound/music/gameover.mp3"
    );
    this.load.image("oxigeno", "../super-midu-bros-main/assets/oxigeno.png");

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
    this.load.image("ob", "imgLuna/ob.png");
    this.load.image("uno", "imgLuna/1.png");
    this.load.image("dos", "imgLuna/2.png");
    this.load.image("tres", "imgLuna/3.png");
    this.load.image("cuatro", "imgLuna/4.png");
    this.load.image("cinco", "imgLuna/5.png");
    this.load.image("seis", "imgLuna/6.png");
    this.load.image("siete", "imgLuna/7.png");
    this.load.image("cohete", "imgLuna/98.png");
  }

  create() {
    this.add.image(700, config.height - 300, "we").setScale(0.3);
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
    // this.add.image(1250, config.height - 270, 'siete').setScale(0.19)
    this.add.image(930, config.height - 310, "seis").setScale(0.07);

    this.tweens.add({
      targets: planetas,
      y: "+=6",
      duration: 2000,
      ease: "Sine.easeInOut",
      yoyo: true,
      repeat: -1,
    });
    this.floor = this.physics.add.staticGroup();

    createPlatforms(this);

    this.estrellasFondo = new estrellasFondo(this);
    this.instanciaPersonaje = new Personaje(this);

    const manejarPuntos = new ManejarPuntos(this);
    this.mineral = manejarPuntos.crearMinerales();
    this.oxigeno = manejarPuntos.crearOxigeno();
    this.siete = manejarPuntos.crearSiete(400, 300);

    manejarPuntos.configurarColisionOxigeno(this.oxigeno);
    manejarPuntos.configurarColisionMineral(this.mineral);
    manejarPuntos.configurarColisionSiete(this.siete);

    this.physics.world.setBounds(0, config.height - 1300, 1450, 1300);
    this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
    this.physics.add.collider(this.mineral, this.floor);
    this.physics.add.collider(this.oxigeno, this.floor);
    this.physics.add.collider(this.siete, this.floor);

    this.cameras.main.setBounds(0, config.height - 1300, 1450, 1300);

    this.cameras.main.startFollow(this.instanciaPersonaje.jugador);
  }

  update() {
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
