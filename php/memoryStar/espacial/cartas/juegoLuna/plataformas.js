// platforms.js
export function createPlatforms(scene) {
  const platformPositions = [
    { x: 90, y: scene.scale.height - 0, scale: 0.1, asset: "n" },
    { x: 170, y: scene.scale.height - 0, scale: 0.1, asset: "n" },

    { x: 420, y: scene.scale.height - 0, scale: 0.1, asset: "n" },
    { x: 700, y: scene.scale.height - 0, scale: 0.1, asset: "n" },

    { x: 1000, y: scene.scale.height - 0, scale: 0.1, asset: "n" },

    // { x: 790, y: scene.scale.height - 0, scale: 0.1,asset: 'n'},
    { x: 900, y: scene.scale.height - 0, scale: 0.1, asset: "n" },

    { x: 190, y: scene.scale.height - 320, scale: 0.1, asset: "n" },
    { x: 1300, y: scene.scale.height - 450, scale: 0.1, asset: "n" },
    { x: 400, y: scene.scale.height - 580, scale: 0.1, asset: "n" },
    { x: 580, y: scene.scale.height - 460, scale: 0.03, asset: "sueloF" },
    { x: 300, y: scene.scale.height - 460, scale: 0.03, asset: "sueloF" },
    { x: 1200, y: scene.scale.height - 490, scale: 0.03, asset: "sueloF" },


    { x: 1035, y: scene.scale.height - 350, scale: 0.1, asset: "n" },
    { x: 1290, y: scene.scale.height - 290, scale: 0.1, asset: "n" },

    // { x: 790, y: scene.scale.height - 180, scale: 0.03,asset:'2'},
    { x: 0, y: scene.scale.height - 250, scale: 0.1, asset: "n" },
    { x: 400, y: scene.scale.height - 200, scale: 0.1, asset: "n" },
    { x: 700, y: scene.scale.height - 390, scale: 0.1, asset: "n" },
    { x: 750, y: scene.scale.height - 250, scale: 0.1, asset: "n" },
    { x: 150, y: scene.scale.height - 180, scale: 0.1, asset: "n" },
    { x: 980, y: scene.scale.height - 220, scale: 0.03, asset: "sueloF" },

    { x: 1200, y: scene.scale.height - 170, scale: 0.03, asset: "sueloF" },
    { x: 1150, y: scene.scale.height - 80, scale: 0.03, asset: "sueloF" },

  ];

  platformPositions.forEach((pos) => {
    const asset = pos.asset || "suelo";
    scene.floor
      .create(pos.x, pos.y, asset)
      .setOrigin(0, 1)
      .setScale(pos.scale)
      .refreshBody();
  });
}
