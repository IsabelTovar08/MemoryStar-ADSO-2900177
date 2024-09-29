import { Personaje } from "../js/comun/animations.js";
import { ManejarPuntos } from "../js/comun/crearPuntos.js";
import { estrellasFondo } from "../js/comun/estrellasFondo.js";
import { createPlatforms } from "../super-midu-bros-main/plataformas.js";

class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: "MyScene" });
  }

  preload() {
    this.load.image("star", "../super-midu-bros-main/planetas/estrella.png");
    this.load.spritesheet(
      "mario",
      "../super-midu-bros-main/assets/entities/mario.png",
      { frameWidth: 18, frameHeight: 16 }
    );
    this.load.image(
      "floorbricks",
      "../super-midu-bros-main/assets/scenery/overworld/floorbricks.png"
    );
    this.load.image("mineral", "../super-midu-bros-main/planetas/cristal.png");
    this.load.audio(
      "gameover",
      "../super-midu-bros-main/assets/sound/music/gameover.mp3"
    );
    this.load.image("oxigeno", "../super-midu-bros-main/assets/oxigeno.png");
    this.load.image("suelo", "imgDulces/suelo.png");
    this.load.image("suelo-dos", "imgDulces/suelo-dos.png");
    this.load.image("flotante", "imgDulces/flotante-1.png");
    this.load.image("dona", "imgDulces/flotante-dulce.png");
    this.load.image("flotante-dos", "imgDulces/1.png");
    this.load.image("planetaC", "imgDulces/pCaramel.png");
    this.load.image("planetaCh", "imgDulces/pChocolate.png");
    this.load.image("queso", "imgDulces/queso.png");
    this.load.image("planetaC", "imgDulces/pCaramel.png");
    this.load.image("planetaT", "imgDulces/pTorta.png");
    this.load.image("planetaP", "imgDulces/pPastel2.png");
    this.load.image("caramelo", "imgDulces/caramelo.png");
    this.load.image("caramelo-o", "imgDulces/2.png");
    this.load.image("piedra", "imgDulces/3.png");
    this.load.image("piedraC", "imgDulces/piedra.png");

    this.load.image("dulce", "imgDulces/4.png");
    this.load.image("arbol", "imgDulces/caramel.png");
    this.load.image("arbol-verde", "imgDulces/arbol-verde.png");
    this.load.image("gallo", "imgDulces/gallo-2.png");
    this.load.image("rosado", "imgDulces/rosado.png");
    this.load.image("galleta", "imgDulces/galleta.png");
    this.load.image("arbusto", "imgDulces/arbusto.png");
    this.load.image("arbGalletas", "imgDulces/galletas.png");

    this.load.image("chispas", "imgDulces/arbol-chispas.png");
    this.load.image("casa", "imgDulces/casa.png");
    this.load.image("dona-2", "imgDulces/dona-2.png");
    this.load.image("media-dona", "imgDulces/media-dona.png");
    this.load.image("flor", "imgDulces/flor.png");
    this.load.image("fondo", "imgDulces/fondoo.png");
    this.load.image("fondo2", "imgDulces/fondo-2.png");
    this.load.image("fondo3", "imgDulces/fondo-3.png");
    this.load.image("button", "../juegoLava/imgLava/arriba.png");
    this.load.image("leftButton", "../juegoLava/imgLava/izqui.png");
    this.load.image("rightButton", "../juegoLava/imgLava/derecha.png");
    this.load.image("siete", "imgDulces/rr.png");
  }

  create() {
    //   this.add.image(400, 300, 'fondo').setScale(0.5);
    this.add.image(0, -500, "fondo3").setOrigin(0, 0).setScale(2);
    this.add.image(400, 300, "planetaC").setScale(0.3);
    this.add.image(350, -100, "planetaT").setScale(0.4).setAlpha(0.8);
    this.add.image(1300, 400, "planetaCh").setScale(0.4).setAlpha(0.8);
    this.add.image(900, 100, "queso").setScale(0.4).setAlpha(0.8);
    this.add.image(1300, -200, "planetaP").setScale(0.4).setAlpha(0.7);
    this.add
      .image(1150, config.height - 95, "caramelo-o")
      .setScale(0.04)
      .setOrigin(0, 1);
    this.add
      .image(850, config.height - 190, "caramelo-o")
      .setScale(0.04)
      .setOrigin(0, 1);
    this.add.image(270, config.height - 425, "piedra").setScale(0.05);
    this.add
      .image(540, config.height - 246, "dulce")
      .setScale(0.03)
      .setAlpha(0.8);
    this.add
      .image(600, config.height - 108, "chispas")
      .setScale(0.2)
      .setAlpha(0.9);
    this.add
      .image(700, config.height - 240, "piedraC")
      .setScale(0.07)
      .setAlpha(0.8);
    this.add.image(200, config.height - 85, "media-dona").setScale(0.6);

    this.add.image(300, config.height - 85, "media-dona").setScale(0.6);

    this.add.image(400, config.height - 85, "media-dona").setScale(0.6);
    this.add.image(500, config.height - 85, "media-dona").setScale(0.6);
    this.add
      .image(250, config.height - 108, "arbol-verde")
      .setScale(0.2)
      .setAlpha(0.9);
    this.add.image(510, config.height - 440, "flor").setScale(0.1);
    //   this.add.image(750, config.height -90, 'flor').setScale(0.1);
    this.add.image(750, config.height - 85, "arbusto").setScale(0.1);
    this.add.image(80, config.height - 340, "arbusto").setScale(0.07);
    this.add
      .image(680, config.height - 260, "arbGalletas")
      .setScale(0.1)
      .setAlpha(0.8);
    this.add
      .image(880, config.height - 470, "arbusto")
      .setScale(0.1)
      .setAlpha(0.8);

    this.add
      .image(20, config.height - 90, "arbol")
      .setScale(0.35)
      .setAlpha(0.9);
    this.add
      .image(490, config.height - 425, "piedraC")
      .setScale(0.07)
      .setAlpha(0.8);

    this.add.image(1050, config.height - 650, "flor").setScale(0.1);
    this.add.image(1065, config.height - 630, "piedra").setScale(0.03);

    this.add.image(650, config.height - 66, "piedra").setScale(0.05);
    this.add
      .image(100, config.height - 143, "casa")
      .setScale(0.9)
      .setAlpha(0.9);

    this.add
      .image(170, config.height - 287, "gallo")
      .setScale(0.3)
      .setAlpha(0.8);
    this.add
      .image(700, config.height - 490, "arbol")
      .setScale(0.5)
      .setAlpha(0.9);

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
    this.physics.add.collider(this.siete, this.floor);

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
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
