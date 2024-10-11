export class Boss {
  constructor(scene, jugador, manejarPuntos) {
    this.scene = scene;
    this.jugador = jugador; // Referencia al jugador
    this.manejarPuntos = manejarPuntos; // Recibe instancia de ManejarPuntos
    this.boss = null; // Inicializamos el boss como null
    this.bossSpeed = 100;
    this.bossDirection = "left";

    // Crear grupo de proyectiles
    this.projectileGroup = this.scene.physics.add.group();
  }

  crearBoss(x, y) {
    // Crear el sprite del boss en la posición dada
    this.boss = this.scene.physics.add
      .sprite(x, y, "boss")
      .setScale(2)
      .setCollideWorldBounds(true);

    this.boss.body.setAllowGravity(false); // Deshabilitar la gravedad
    this.boss.setY(100); // Ajustar la posición en la parte superior

    this.boss.health = 100;

    // Configurar movimiento del boss
    this.moverBoss();

    // Generar proyectiles periódicamente
    this.dispararProyectiles();
  }

  moverBoss() {
    this.scene.time.addEvent({
      delay: 70, // Reduce este valor para que el movimiento sea más fluido
      callback: () => {
        if (this.bossDirection === "left") {
          this.boss.setVelocityX(-this.bossSpeed);
          // Cambia de dirección si llega al borde izquierdo deseado
          if (this.boss.x < 100) {
            // Cambia este valor para ajustar el borde izquierdo
            this.bossDirection = "right";
          }
        } else {
          this.boss.setVelocityX(this.bossSpeed);
          // Cambia de dirección si llega al borde derecho deseado
          if (this.boss.x > 1200) {
            // Cambia este valor para ajustar el borde derecho
            this.bossDirection = "left";
          }
        }
      },
      loop: true,
    });
  }

  dispararProyectiles() {
    this.scene.time.addEvent({
      delay: 2000, // Intervalo entre cada ráfaga
      callback: () => {
        for (let i = 0; i < 5; i++) {
          // Generar 5 proyectiles
          let projectile = this.projectileGroup.create(
            this.boss.x,
            this.boss.y,
            "projectile"
          );
          projectile.setScale(0.09); // Escala el proyectil

          // Velocidad del proyectil, con una desviación aleatoria en el eje X
          let randomXVelocity = Phaser.Math.Between(-100, 100); // Variación en la dirección
          projectile.setVelocity(randomXVelocity, 200); // Hacer que caigan hacia abajo
        }

        // Configurar colisión de los proyectiles con el jugador
        this.configurarColisionConJugador();
      },
      loop: true,
    });
  }

  // Función para reducir tiempo cuando el jugador es golpeado por un proyectil
  reducirTiempoPorProyectil(jugador, projectile) {
    projectile.disableBody(true, true);

    // Reducir tiempo de ManejarPuntos
    this.manejarPuntos.tiempo -= 5;
    this.manejarPuntos.tiempoText.setText(
      "TIEMPO DE VIDA: " + this.manejarPuntos.tiempo
    );

    console.log("¡Colisión! Tiempo restante: " + this.manejarPuntos.tiempo);

    if (this.scene.tiempo <= 0) {
      this.jugador.deteriorarJugador();
    }
  }

  configurarColisionConJugador() {
    this.scene.physics.add.overlap(
      this.projectileGroup,
      this.jugador,
      (jugador, projectile) =>
        this.reducirTiempoPorProyectil(jugador, projectile),
      null,
      this
    );
  }

  configurarColisionConPlataformas(plataformas) {
    this.scene.physics.add.collider(this.boss, plataformas);
  }
}
