// platforms.js
export function createPlatforms(scene) {
  const platformPositions = [
    // { x: 0, y: scene.scale.height - 7, scale: 0.4 },
    { x: 0, y: scene.scale.height , scale: 1, asset: 'rosado' },

    // { x: 193, y: scene.scale.height , scale: 0.4 },
    { x: 430, y: scene.scale.height , scale: 1, asset: 'rosado' },
    // { x: 579, y: scene.scale.height - 7, scale: 0.4},
    // { x: 620, y: scene.scale.height - 7, scale: 0.4 },
    // { x: 775, y: scene.scale.height - 7, scale: 0.4 },
    { x: 990, y: scene.scale.height - 20, scale: 0.6, asset: 'dona' },
    { x: 1250, y: scene.scale.height - 85, scale: 0.6, asset: 'dona' },
    // { x: 1096, y: scene.scale.height - 110, scale: 0.4 },
    // { x: 1200, y: scene.scale.height - 90, scale: 0.06, asset: 'flotante-dos' },
    // { x: 1050, y: scene.scale.height - 240, scale: 0.6, asset: 'dona' },
    { x: 1023, y: scene.scale.height - 233, scale: 1, asset: 'dona-medio' },
    { x: 1353, y: scene.scale.height - 213, scale: 1, asset: 'dona-medio' },

    { x: 690, y: scene.scale.height - 205, scale: 1.1, asset: 'dona-2' },
    { x: 360, y: scene.scale.height - 205, scale: 1.1, asset: 'dona-2' },
    // { x: 298, y: scene.scale.height - 105, scale: 0.06, asset: 'flotante-dos' },
    { x: 155, y: scene.scale.height - 200, scale: 0.06, asset: 'flotante-dos' },
    { x: 10, y: scene.scale.height - 260, scale: 0.06, asset: 'flotante-dos' },
    { x: 160, y: scene.scale.height - 405, scale: 0.5, asset: 'flotante' },
    { x: 400, y: scene.scale.height - 470, scale: 0.6, asset: 'dona' },
    { x: 600, y: scene.scale.height - 500, scale: 0.6, asset: 'dona' },
    { x: 850, y: scene.scale.height - 502, scale: 0.6, asset: 'dona' },
    { x: 1150, y: scene.scale.height - 410, scale: 0.06, asset: 'flotante-dos' },
    { x: 1325, y: scene.scale.height - 480, scale: 0.06, asset: 'flotante-dos' },
    { x: 995, y: scene.scale.height - 580, scale: 0.6, asset: 'flotante' },


    // { x: 600, y: scene.scale.height - 270, scale: 0.4, asset: 'suelo-dos' },

    // { x: 400, y: scene.scale.height - 200, scale: 0.4 },
    // { x: 300, y: scene.scale.height - 280, scale: 0.4 },
    // { x: 700, y: scene.scale.height - 202, scale: 0.4 },
  ];

  platformPositions.forEach(pos => {
    const asset = pos.asset || 'suelo';
    scene.floor.create(pos.x, pos.y, asset).setOrigin(0, 1).setScale(pos.scale).refreshBody();
  });
}
