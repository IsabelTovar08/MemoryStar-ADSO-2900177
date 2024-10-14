// MineralManager.js
export class ManejarPuntos {
  constructor(scene) {
    this.scene = scene;
    // Tiempo
    this.tiempo = 25;
    this.score =0;
    this.diamantes = 0;
    this.tiempoText = this.scene.add.text(0, 0, "TIEMPO DE VIDA: 25", {
      fontSize: "32px",
      fill: "#fff",
    });
    this.tiempoText.setScrollFactor(0);

    // Puntuación
    
    this.scoreText = this.scene.add.text(
      this.scene.scale.width - 200,
      0,
      "Score: " + this.score,
      { fontSize: "32px", fill: "#fff" }
    );
    this.scoreText.setScrollFactor(0);
    this.modalVisible = false;

    
    this.diamantesText = this.scene.add.text(
      this.scene.scale.width - 300,
      100,
      "Diamantes: " + this.diamantes,
      { fontSize: "32px", fill: "#fff" }
    );
    this.diamantesText.setScrollFactor(0);

    
    // Temporizador
    this.scene.time.addEvent({
      delay: 1000,
      callback: this.decrementarTiempo,
      callbackScope: this,
      loop: true,
    });
  }

  obtenerDatos() {
    return {
      diamantes: this.diamantes,
      puntuacion: this.score,
      tiempo: this.tiempo,
    };
  }

  crearSiete(x = config.width * 0.5, y = config.height * 0.5) {
    // Crear un grupo de objetos físicos para el cohete
    const cohete = this.scene.physics.add.group();

    // Crear solo un objeto 'siete' en coordenadas dinámicas (pasadas como parámetros)
    cohete.create(x, y, "siete");

    // Configurar las propiedades o físicas adicionales para 'siete'
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
    [0, 300, 400].forEach((yPos) => {
      mineralGroup.createMultiple({
        key: "corazon",
        repeat: 4,
        setXY: { x: Phaser.Math.Between(0, 600), y: yPos, stepX: 150 },
      });
    });

    this.configurarCorazones(mineralGroup);
    return mineralGroup;
  }
  configurarCorazones(mineralGroup) {
    mineralGroup.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.08); // Escala del mineral
    });
  }

  configurarSiete(cohete) {
    cohete.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.08); // Escala del mineral
    });
  }
  configurarMinerales(mineralGroup) {
    mineralGroup.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.08);
    });
  }

  crearOxigeno() {
    const oxigenGroup = this.scene.physics.add.group({
      key: "oxigeno",
      repeat: 4,
      setXY: { x: 200, y: 0, stepX: 200 },
    });

    this.configurarOxigeno(oxigenGroup);
    return oxigenGroup;
  }
  configurarOxigeno(oxigenGroup) {
    oxigenGroup.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
      child.setScale(0.1);
    });
  }
  confirmAction() {
    console.log("uuu");
    this.tiempo = 25;
    this.tiempoText.setText("TIEMPO DE VIDA: " + this.tiempo);
  }
  decrementarTiempo() {
    if (this.tiempo > 0) {
      this.tiempo -= 1;
      this.tiempoText.setText("TIEMPO DE VIDA: " + this.tiempo);
    }

    if (this.tiempo <= 0 && !this.scene.instanciaPersonaje.jugador.isDead) {
      this.mostrarModal();
    }
  }

  mostrarModal() {
    if (!this.modalVisible) {
      this.modalVisible = true;
      var modalOxigeno = new bootstrap.Modal(document.getElementById("modal"));
      modalOxigeno.show();

      this.iniciarTemporizador(modalOxigeno);
    }
  }

  iniciarTemporizador(modalOxigeno) {
    var aceptar = document.getElementById("comprarOxigeno");
    var temporizador = document.getElementById("temporizador");
    var diamantesIndex = document.getElementById("diamantes");
    let contador = 5;
    diamantesIndex.textContent = this.diamantes;
    temporizador.textContent = contador;

    aceptar.onclick = () => {
      modalOxigeno.hide();
      this.confirmAction();
      this.modalVisible = false;
      clearInterval(tiempoModal);
    };

    const tiempoModal = setInterval(() => {
      contador--;
      temporizador.textContent = contador;

      if (contador <= 0) {
        clearInterval(tiempoModal);
        modalOxigeno.hide();
        this.modalVisible = false;
        this.deteriorarJugador();
      }
    }, 1000);
  }

  deteriorarJugador() {
    this.scene.instanciaPersonaje.jugador.isDead = true;
    this.scene.instanciaPersonaje.jugador.anims.play("mario-dead");
    this.scene.instanciaPersonaje.jugador.setCollideWorldBounds(false);
    this.scene.sound.add("gameover", { volume: 0.2 }).play();
    this.scene.add.text(400, this.scene.scale.height - 400, "¡MORISTEEEEE!", {
      fontSize: "60px",
      fill: "#fff",
    });
    setTimeout(() => {
      this.scene.instanciaPersonaje.jugador.setVelocityY(-350);
    }, 100);
  }

  recolectarOxigeno(jugador, oxigeno) {
    oxigeno.disableBody(true, true);
    this.tiempo = 25;
    this.tiempoText.setText("TIEMPO DE VIDA: " + this.tiempo);

    // Actualiza el JSON también aquí
    const datos = this.obtenerDatos();
    const datosJSON = JSON.stringify(datos);
    console.log(datosJSON); // Aquí puedes ver el estado actualizado
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


recolectarMineral(jugador, mineral) {
  mineral.disableBody(true, true);
  this.score += 10;
  this.diamantes += 1;
  this.scoreText.setText("Score: " + this.score);
  this.diamantesText.setText("Diamantes: " + this.diamantes);


  // Guarda los datos en un JSON
  const datos = this.obtenerDatos();
  const datosJSON = JSON.stringify(datos);
  console.log(datosJSON); // Aquí puedes ver el estado actualizado

  // Mostrar modal si se cumple la condición
  if (this.score >= 60) {
      this.scoreText.setText("Score: " + this.score + " - NIVEL COMPLETADO");
      this.showModal();
  }
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

  showModal() {
    console.log("¡Nivel Completado!");
  }
}
