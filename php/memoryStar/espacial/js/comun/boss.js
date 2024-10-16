export class Boss {
  constructor(scene, jugador, manejarPuntos, vidaJugador) {
    this.scene = scene;
    this.vidaJugador = vidaJugador;
    this.jugador = jugador;
    this.manejarPuntos = manejarPuntos;
    this.boss = null;
    this.bossSpeed = 100;
    this.bossDirection = "left";
    
    this.maxHealth = 100; // Vida máxima del boss
    this.bossHealthBar = null; // Barra de vida del boss

    this.projectileGroup = this.scene.physics.add.group();
    this.configurarColisionConJugador();
  }

  crearBoss(x, y) {
    this.boss = this.scene.physics.add
      .sprite(x, y, "boss")
      .setScale(0.05)
      .setCollideWorldBounds(true);

    this.boss.body.setAllowGravity(false);

    this.boss.health = this.maxHealth; // Vida inicial del boss
    this.crearBarraDeVida(); // Crear la barra de vida
    this.moverBoss();
    this.dispararProyectiles();
  }

  crearBarraDeVida() {
    // Crear la barra de vida en la parte superior del boss
    this.bossHealthBar = this.scene.add.graphics();
    this.actualizarBarraDeVida();
  }

  actualizarBarraDeVida() {
    // Limpiar el gráfico antes de redibujarlo
    this.bossHealthBar.clear();

    // Definir las dimensiones de la barra
    const x = this.boss.x - 40; // Posición en X
    const y = this.boss.y - 60; // Posición en Y (por encima del boss)
    const width = 80; // Ancho total de la barra
    const height = 10; // Altura de la barra

    // Porcentaje de vida restante
    const healthPercentage = this.boss.health / this.maxHealth;

    // Fondo de la barra (rojo)
    this.bossHealthBar.fillStyle(0xff0000, 1);
    this.bossHealthBar.fillRect(x, y, width, height);

    // Parte de la barra correspondiente a la vida restante (verde)
    this.bossHealthBar.fillStyle(0x00ff00, 1);
    this.bossHealthBar.fillRect(x, y, width * healthPercentage, height);
  }

  reducirVida(cantidad) {
    this.boss.health -= cantidad; // Reducir la vida del boss
    console.log(`Boss ha recibido daño, salud restante: ${this.boss.health}`);

    // Actualizar la barra de vida
    this.actualizarBarraDeVida();

    if (this.boss.health <= 0) {
      console.log("¡El Boss ha sido derrotado!");
      this.boss.disableBody(true, true); // Destruir el boss cuando su vida llegue a 0
      this.bossHealthBar.destroy(); // Destruir la barra de vida
    }
  }

  moverBoss() {
    this.scene.time.addEvent({
      delay: 70,
      callback: () => {
        if (this.boss && this.boss.body) {  // Verificar que this.boss existe y tiene un cuerpo
          if (this.bossDirection === "left") {
            this.boss.setVelocityX(-this.bossSpeed);
            if (this.boss.x < 100) {
              this.bossDirection = "right";
            }
          } else {
            this.boss.setVelocityX(this.bossSpeed);
            if (this.boss.x > 1200) {
              this.bossDirection = "left";
            }
          }
          this.actualizarBarraDeVida(); // Asegurarse de que la barra de vida se mueva con el boss
        }
      },
      loop: true,
    });
  }
  

  dispararProyectiles() {
    this.scene.time.addEvent({
      delay: 2000, // Intervalo entre cada ráfaga
      callback: () => {
        if (this.boss && this.boss.active) {
          for (let i = 0; i < 2; i++) {
            this.scene.time.addEvent({
              delay: i * 200, // Retrasar cada proyectil para que no se lancen todos al mismo tiempo
              callback: () => {
                if (this.boss && this.boss.active) {
                  let projectile = this.projectileGroup.create(this.boss.x, this.boss.y, "projectile");
                  projectile.setScale(0.09); // Escala el proyectil
                  this.scene.sound.add("disparo", { volume: 1 }).play();
                  // Velocidad del proyectil, con una desviación aleatoria en el eje X
                  let randomXVelocity = Phaser.Math.Between(-100, 100); // Variación en la dirección
                  projectile.setVelocity(randomXVelocity, 200); // Hacer que caigan hacia abajo
                }
              }
            });
          }
        }
      },
      loop: true,
    });
  }

  reducirTiempoPorProyectil(jugador, projectile) {
    projectile.disableBody(true, true);
    this.scene.sound.add("daño", { volume: 1 }).play();
    console.log('colision yaaaaa');
    this.vidaJugador.dañoJugador(15);
    if (this.scene.tiempo <= 0) {
      this.jugador.deteriorarJugador();
    }
  }

  configurarColisionConJugador() {
    this.scene.physics.add.overlap(
      this.scene.instanciaPersonaje.jugador,
      this.projectileGroup,
      this.reducirTiempoPorProyectil,
      null,
      this
    );
  }

  configurarColisionConPlataformas(plataformas) {
    this.scene.physics.add.collider(this.boss, plataformas);
  }
}