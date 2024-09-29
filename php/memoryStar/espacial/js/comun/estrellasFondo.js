export class estrellasFondo {
  constructor(scene) {
    this.scene = scene;
    
    // Acceder al ancho y alto de la escena
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    // Crear grupo de estrellas
    this.stars = this.scene.add.group({
      key: 'star',
      repeat: 100, // Número de estrellas a crear
      setXY: { 
        x: Phaser.Math.Between(0, width), 
        y: Phaser.Math.Between(0, height), 
        stepX: 500, 
        stepY: 5 
      }
    });

    // Configuración para cada estrella
    this.stars.children.iterate(function (child) {
      child.setScale(Phaser.Math.FloatBetween(0.03, 0.05)); // Variar tamaño de las estrellas
      child.speed = Phaser.Math.FloatBetween(0.5, 1.3); // Fijar la velocidad
    });
  }

  update() {
    const height = this.scene.scale.height;
    const width = this.scene.scale.width;

    this.stars.children.iterate(function (child) {
      child.y += child.speed; // Mover cada estrella hacia abajo lentamente

      // Reposicionar las estrellas que salen de la pantalla
      if (child.y > height) {
        child.y = 0; // Colocar la estrella de nuevo en la parte superior
        child.x = Phaser.Math.Between(0, width); // Cambiar la posición horizontal al azar
      }
    });
  }
}
