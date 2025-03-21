import { Personaje } from "../../js/comun/animations.js";
import { ManejarPuntos } from "../../js/comun/crearPuntos.js";
import { estrellasFondo } from "../../js/comun/estrellasFondo.js";
import { createPlatforms } from "./plataformas.js";
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
    this.load.image("1112", "imgLava/isla.png");
    this.load.image("hola", "imgLava/lo.png");
    this.load.image("111", "imgLava/looo.png");
    this.load.image("star", "imgLava/bo.png");
    this.load.spritesheet("mario","../../img/vacaUltima.png", { frameWidth: 365, frameHeight: 412 });
    this.load.image("boss1", "../../img/enemigo.png");
    // this.load.image('caramelo', 'imgLava/oro.png');

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


    this.load.image("volcan", "imgLava/ki.png");
    this.load.image("lava", "imgLava/lava.png");
    this.load.image("lavita", "imgLava/lavita.png");
    this.load.image("fondoLava", "imgLava/deco.png");
    this.load.image("portal", "imgLava/portal.png");
    this.load.image("sec2", "imgLava/sec2.png");
    this.load.image("sec1", "imgLava/sec1.png");
    this.load.image("fondo", "imgLava/fondo2.jpg");
    this.load.image("tr", "imglava/tr.png");
    this.load.image("hielo", "imgLava/hielo.png");
    this.load.image("hielo2", "imgLava/hielo2.png");

    this.load.image("piedra", "imgLava/ed.png");
    this.load.image("pd", "imgLava/pd.png");
    this.load.image("iglu", "imgLava/iglu.png");
    this.load.image("iglu2", "imgLava/iglu2.png");

    this.load.image("caramelo", "imgLava/w.png");
    this.load.image("isla", "imgLava/isla.png");

    this.load.image("siete", "imgLava/rr.png");

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
    this.add.image(0, config.height, "fondo").setOrigin(0,1).setScale(0.4);
    // this.add.image(600, config.height -130, 'sec1').setScale(1)

    this.add.image(570, config.height - 248, "piedra").setScale(0.04);
    this.add.image(870, config.height - 195, "piedra").setScale(0.04);
    this.add.image(900, config.height - 195, "piedra").setScale(0.04);

    this.add.image(350, config.height - 160, "volcan").setScale(0.06);
    this.add.image(1100, config.height - 190, "volcan").setScale(0.06);
    this.add.image(40, config.height - 135, "portal").setScale(0.2);
    this.add.image(300, config.height - 1, "lavita").setScale(0.14);
    this.add.image(500, config.height - 1, "lavita").setScale(0.14);
    this.add.image(700, config.height - 1, "lavita").setScale(0.14);
    this.add.image(900, config.height - 1, "lavita").setScale(0.14);
    this.add.image(1100, config.height - 1, "lavita").setScale(0.14);
    this.add.image(1300, config.height - 1, "lavita").setScale(0.14);
    this.add.image(1400, config.height - 1, "lavita").setScale(0.14);
    this.add.image(100, config.height - 1, "lavita").setScale(0.14);
    this.add.image(1340, config.height - 470, "pd").setScale(0.05);
    this.add.image(1150, config.height - 562, "pd").setScale(0.05);
    this.add.image(1300, config.height - 280, "pd").setScale(0.05);

    this.floor = this.physics.add.staticGroup();

    // Llamar a la función de creación de plataformas
    createPlatforms(this);
    this.add.image(120, config.height - 755, "iglu2").setScale(0.2);

    this.elementosSuperiores = new UIElementsBarras(this);

    this.estrellasFondo = new estrellasFondo(this);

    // Crear instancia de Mario
    this.instanciaPersonaje = new Personaje(this);
    this.manejoPuntos = new ManejarPuntos(this);
    this.manejoRecolectables = new creacionRecolectables(this, this.manejoPuntos)
    this.iniciarOxigeno = this.manejoPuntos.drawProgressBar();
    this.manejoPuntos.start(1, 0, 650, 10);
    this.vidaJugador = new VidaJugador(this);

    this.boss = new Boss(this, this.jugador, this.manejoPuntos, this.vidaJugador); // Pasar el jugador como referencia
    this.boss.crearBoss(400, 300);

    // Configurar las colisiones con el jugador
    this.boss.configurarColisionConJugador();
 
    // Configurar colisiones con las plataformas
        
    // Crear un gestor de salud para el jugador




    this.arma =  this.add.image(this.instanciaPersonaje.jugador.x, this.instanciaPersonaje.jugador.y, "arma").setScale(0.08);
      

    // Control del jugador
    this.input.on('pointermove', this.rotarJugador, this);

    // Crear instancia de la clase Disparo

    // Disparo al hacer clic o tocar
    this.input.on('pointerdown', () => {
        this.disparo.disparar();
    });

    // Escuchar la tecla ENTER para disparar
    this.input.keyboard.on('keydown-ENTER', () => {
        this.disparo.disparar();
    });
    this.disparo = new Disparo(this, this.arma, this.boss);

    this.manejoPuntos = new ManejarPuntos(this);
    this.manejoRecolectables = new creacionRecolectables(this, this.manejoPuntos)
    this.iniciarOxigeno = this.manejoPuntos.drawProgressBar();
    this.manejoPuntos.start(1, 0, 650, 10);
    
    this.minerales = this.manejoRecolectables.crearMinerales();
    this.oxigeno = this.manejoRecolectables.crearOxigeno();
    this.siete = this.manejoRecolectables.crearSiete(1200, 300);

    this.manejoRecolectables.configurarColisionOxigeno(this.oxigeno);
    this.manejoRecolectables.configurarColisionMineral(this.minerales);

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

    this.physics.world.setBounds(0, config.height - 1300, 1650, 1300);
    this.physics.add.collider(this.instanciaPersonaje.jugador, this.floor);
    this.physics.add.collider(this.minerales, this.floor);
    this.physics.add.collider(this.oxigeno, this.floor);
    this.physics.add.collider(this.siete, this.floor);

    this.cameras.main.setBounds(0, config.height - 1300, 1650, 1300);
    this.cameras.main.startFollow(this.instanciaPersonaje.jugador);
  }

  update(time, delta) {
    this.estrellasFondo.update();
    if (!this.instanciaPersonaje.jugador.isDead) {
      this.instanciaPersonaje.handleMovement();
    }
    this.arma.x = this.instanciaPersonaje.jugador.x + 35;
    this.arma.y = this.instanciaPersonaje.jugador.y - 20;
    this.manejoPuntos.update(time, delta);

  }
  rotarJugador(pointer) {
    // Rotar el jugador hacia el puntero del ratón
    let angulo = Phaser.Math.Angle.Between(this.arma.x, this.arma.y, pointer.x, pointer.y);

    // Limitar el ángulo para que solo gire hacia arriba (entre -90° y 90°)
    const anguloMaximo = Phaser.Math.DegToRad(0);  // 90° en radianes
    const anguloMinimo = Phaser.Math.DegToRad(-180); // -90° en radianes

    // Limitar el ángulo entre -π/2 y π/2 (entre -90° y 90°)
    angulo = Phaser.Math.Clamp(angulo, anguloMinimo, anguloMaximo);

    // Aplicar la rotación al arma
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
