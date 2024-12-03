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
    // Lista de posibles sprites para el jefe
    const spritesBoss = ["boss1", "boss2", "boss3","boss4","boss5","boss6"]; // Cambia los nombres según tus sprites disponibles

    // Selecciona un sprite aleatorio de la lista
    const spriteAleatorio = spritesBoss[Math.floor(Math.random() * spritesBoss.length)];

    this.boss = this.scene.physics.add
      .sprite(x, y, spriteAleatorio)
      .setScale(0.1)
      .setCollideWorldBounds(true);

    this.boss.body.setAllowGravity(false);

    console.log(spriteAleatorio)
    fetch("..//php/almacenar_enemigo.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boss: spriteAleatorio }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data.status));

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
      this.scene.add.text(300, this.scene.scale.height - 500, "¡FELICIDADES, DERROTASTE AL ENEMIGO!", { fontSize: "60px", fill: "#fff", stroke: "#000", strokeThickness: 3 });
      
<<<<<<< HEAD
      const modal = new bootstrap.Modal(document.getElementById('modalRedireccion'));
      modal.show();

        const boton = document.getElementById('aceptarRedireccion');
        boton.addEventListener('click', () => {
        this.redirigir(); // Redirigir o realizar cualquier acción necesaria
        this.scene.resume(); // Reanudar la escena si es necesario después de redirigir
      });
      this.scene.pause();   


          // setTimeout(() => {
          //   window.location.href=("../../../../juego/espacial/armas/enemigo.html")
          // }, 2000);
        
=======
        setTimeout(() => {
          window.location.href=("../../../../aCohete/animacion4.html");
          //("../../../../juego/espacial/armas/enemigo.html")
        }, 2000);
      
>>>>>>> main
      

  }
}



redirigir() {
  //Obtener datos del juego de la escena
  const datosJuego = this.scene.manejoPuntos.obtenerDatos();
  
  fetch('../../../../procesos/puntuacionmario/datos.php', {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosJuego)
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.mensaje);
      console.log('envidado 2 armas enemigo ')
      window.location.href=("../../../../juego/espacial/armas/enemigo.html")
  })
  .catch(error => {
      console.error('Error al enviar datos:', error);
      alert("error amigo al enviar la puntuacion ")
  });
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
                  projectile.setScale(0.05); // Escala el proyectil
                  const disparo = this.scene.sound.add("disparo", { volume: 1 });
                  disparo.play();
                  // Velocidad del proyectil, con una desviación aleatoria en el eje X
                  let randomXVelocity = Phaser.Math.Between(-100, 100); // Variación en la dirección
                  projectile.setVelocity(randomXVelocity, 200); // Hacer que caigan hacia abajo
                  if (this.scene.instanciaPersonaje.jugador.isDead) {
                    projectile.destroy();
                    disparo.stop();
                    console.log("jahdxsikj")
                  }
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