import { Personaje } from "../../js/comun/animations.js";
import { ManejarPuntos } from "../../js/comun/crearPuntos.js";
import { estrellasFondo } from "../../js/comun/estrellasFondo.js";
import { createPlatforms } from "../../super-midu-bros-main/plataformas.js";
import { creacionRecolectables } from "../../js/comun/basePuntos.js";
import { UIElementsBarras } from "../../js/comun/crearBarras.js";
import { Boss } from "../../js/comun/boss.js";
import { VidaJugador } from "../../js/comun/vidaa.js";
import { Disparo } from "../../js/comun/disparoJugador.js";


class MyScene extends Phaser.Scene {
  constructor() {
    super({ key: "MyScene" });
  }

  preload() {
    this.load.image("star", "../../super-midu-bros-main/planetas/estrella.png");
    this.load.spritesheet(
      "mario",
      "../../super-midu-bros-main/assets/entities/mario.png",
      { frameWidth: 18, frameHeight: 16 }
    );
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
    this.load.audio('disparo', '../../sonidos/disparo.mp3');
    this.load.audio('daño', '../../sonidos/dañoo.mp3');


    
    this.load.image("projectile", "../../cartas/juegoLuna/imgLuna/bo.png");

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

    this.load.image("button", "../../img/arriba.png");
    this.load.image("leftButton", "../../img/izqui.png");
    this.load.image("rightButton", "../../img/derecha.png");
    this.load.image("siete", "imgDulces/rr.png");

    this.load.image('oxigeRecort', '../../img/oxigen.png');
    this.load.image('diamante', '../../img/diamante.png');
    this.load.image('temporizador', '../../img/tiempo.png');
    this.load.image('estrellaPuntos', '../../img/puntos.png');
    this.load.image('salir', '../../img/salir.png');

    this.load.image("arma", "../../img/arma.png");

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
    this.add.image(700, config.height - 490, "arbol").setScale(0.5).setAlpha(0.9);

    this.add.image(0, config.height - 40, "arma").setScale(0.2);


    this.floor = this.physics.add.staticGroup();
    // Llamar a la función de creación de plataformas
    createPlatforms(this);
    this.elementosSuperiores = new UIElementsBarras(this);

    this.estrellasFondo = new estrellasFondo(this);

    // Crear instancia de Mario
    this.instanciaPersonaje = new Personaje(this);

    this.manejoPuntos = new ManejarPuntos(this);
    this.manejoRecolectables = new creacionRecolectables(this, this.manejoPuntos)
    this.iniciarOxigeno = this.manejoPuntos.drawProgressBar();
    this.manejoPuntos.start(1, 0, 650, 10);
    this.vidaJugador = new VidaJugador(this);

    const boss = new Boss(this, this.jugador, this.manejoPuntos, this.vidaJugador); // Pasar el jugador como referencia
    boss.crearBoss(400, 100);

    // Configurar las colisiones con el jugador
    boss.configurarColisionConJugador();
 
    // Configurar colisiones con las plataformas
    boss.configurarColisionConPlataformas(this.floor);
        
    // Crear un gestor de salud para el jugador




    this.arma =  this.add.image(this.instanciaPersonaje.jugador.x, this.instanciaPersonaje.jugador.y, "arma").setScale(0.09);
      

    // Control del jugador
    this.input.on('pointermove', this.rotarJugador, this);

    // Crear instancia de la clase Disparo
    this.disparo = new Disparo(this, this.arma);

    // Disparo al hacer clic o tocar
    this.input.on('pointerdown', () => {
        this.disparo.disparar();
    });

    // Escuchar la tecla ENTER para disparar
    this.input.keyboard.on('keydown-ENTER', () => {
        this.disparo.disparar();
    });

    this.minerales = this.manejoRecolectables.crearMinerales();
    this.oxigeno = this.manejoRecolectables.crearOxigeno();
    this.siete = this.manejoRecolectables.crearSiete(1200, 300);

    this.manejoRecolectables.configurarColisionOxigeno(this.oxigeno);
    this.manejoRecolectables.configurarColisionMineral(this.minerales);
    // const manejarPuntos = new ManejarPuntos(this);
    // this.mineral = manejarPuntos.crearMinerales();
    // this.oxigeno = manejarPuntos.crearOxigeno();
    // this.siete = manejarPuntos.crearSiete(1200, 300);

    // manejarPuntos.configurarColisionOxigeno(this.oxigeno);
    // manejarPuntos.configurarColisionMineral(this.mineral);
    // manejarPuntos.configurarColisionSiete(this.siete, "../juegoLuna/luna.html");

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

    this.physics.world.setBounds(0, config.height - 1300, 1450, 1300);
    this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
    this.physics.add.collider(this.minerales, this.floor);
    this.physics.add.collider(this.oxigeno, this.floor);
    this.physics.add.collider(this.siete, this.floor);


    this.cameras.main.setBounds(0, config.height - 1300, 1450, 1300);
    this.cameras.main.startFollow(this.instanciaPersonaje.jugador);
  }

  update(time, delta) {
    this.estrellasFondo.update();
    if (!this.instanciaPersonaje.jugador.isDead) {
      this.instanciaPersonaje.handleMovement();
    }
    this.arma.x = this.instanciaPersonaje.jugador.x + 25;
    this.arma.y = this.instanciaPersonaje.jugador.y - 15;
    this.manejoPuntos.update(time, delta);
    // Simulación de recibir disparos (esto debería estar vinculado a alguna colisión o evento)
    // if (/* condición para que el jugador reciba un disparo */) {
    //     this.vidaJugador.receiveShot(); // Aplicar el daño
    // }
  }
  rotarJugador(pointer) {
    // Rotar el jugador hacia el puntero del ratón
    const angulo = Phaser.Math.Angle.Between(this.arma.x, this.arma.y, pointer.x, pointer.y);
    this.arma.setRotation(angulo);
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
