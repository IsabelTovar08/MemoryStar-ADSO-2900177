export class creacionRecolectables {
  constructor(scene) {
    this.scene = scene;
  }

  crearSiete(x = config.width * 0.5, y = config.height * 0.5) {
    const cohete = this.scene.physics.add.group();
    cohete.create(x, y, "siete");
    this.configurarSiete(cohete);
    return cohete;
  }

  crearMinerales() {
    const mineralGroup = this.scene.physics.add.group();
    [0, 300, 400].forEach((yPos) => {
      mineralGroup.createMultiple({
        key: "caramelo",
        repeat: 4,
        setXY: { x: Phaser.Math.Between(0, 600), y: yPos, stepX: 150 },
      });
    });
    this.configurarMinerales(mineralGroup);
    return mineralGroup;
  }

  crearCorazones() {
    const mineralGroup = this.scene.physics.add.group();
    [200, 400].forEach((yPos) => {
      mineralGroup.createMultiple({
        key: "corazon",
        repeat: 9,
        setXY: { x: 100, y: yPos, stepX: 150 },
      });
    });
    this.configurarCorazones(mineralGroup);
    return mineralGroup;
  }

  configurarCorazones(mineralGroup) {
    mineralGroup.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.08);
    });
  }

  configurarSiete(cohete) {
    cohete.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.08);
    });
  }

  configurarMinerales(mineralGroup) {
    mineralGroup.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.08);
    });
  }

  crearOxigeno() {
    const oxigenGroup = this.scene.physics.add.group({
      key: "oxigeRecort",
      repeat: 1,
      setXY: { x: Phaser.Math.FloatBetween(400, 500), y: 0, stepX: 600 },
    });
    this.configurarOxigeno(oxigenGroup);
    return oxigenGroup;
  }

  configurarOxigeno(oxigenGroup) {
    oxigenGroup.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.1);
    });
  }

  configurarColisionOxigeno(oxigenGroup) {
    this.scene.physics.add.overlap(
      this.scene.instanciaPersonaje.jugador,
      oxigenGroup,
      this.recolectarOxigeno,
      null,
      this
    );
  }

  recolectarOxigeno(jugador, oxigeno) {
    console.log(this);
    oxigeno.disableBody(true, true);
    this.scene.sound.add("sonidoOxigeno", { volume: 0.2 }).play();
    this.scene.manejoPuntos.resetearTiempo();
    const datos = this.scene.manejoPuntos.obtenerDatos();
    console.log(JSON.stringify(datos));
  }

  configurarColisionSiete(cohete, url) {
    this.scene.physics.add.overlap(
      this.scene.instanciaPersonaje.jugador,
      cohete,
      (jugador, cohete) => this.redirigir(jugador, cohete, url),
      null,
      this
    );
  }

  redirigir(jugador, cohete, url) {
    cohete.disableBody(true, true);
    window.location.href = url;
  }

  configurarColisionMineral(mineralGroup) {
    this.scene.physics.add.overlap(
      this.scene.instanciaPersonaje.jugador,
      mineralGroup,
      this.recolectarMineral,
      null,
      this
    );
  }

  recolectarMineral(jugador, mineral) {
    mineral.disableBody(true, true);
    this.scene.sound.add("soundCoin", { volume: 0.2 }).play();
    this.scene.manejoPuntos.aumentarPuntos();
  }
}