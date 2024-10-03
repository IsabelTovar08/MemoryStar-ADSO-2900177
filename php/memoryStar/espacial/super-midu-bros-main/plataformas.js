// platforms.js
export function createPlatforms(scene) {
  const platformPositions = [
    // { x: 0, y: scene.scale.height - 7, scale: 0.4 },
    { x: 0, y: scene.scale.height - 7, scale: 0.8, asset: 'rosado' },

    // { x: 193, y: scene.scale.height - 7, scale: 0.4 },
    { x: 399, y: scene.scale.height - 7, scale: 0.8, asset: 'rosado' },
    // { x: 579, y: scene.scale.height - 7, scale: 0.4},
    // { x: 620, y: scene.scale.height - 7, scale: 0.4 },
    // { x: 775, y: scene.scale.height - 7, scale: 0.4 },
    { x: 900, y: scene.scale.height - 45, scale: 0.5, asset: 'dona' },
    { x: 1070, y: scene.scale.height - 85, scale: 0.5, asset: 'dona' },
    // { x: 1096, y: scene.scale.height - 110, scale: 0.4 },
    // { x: 1200, y: scene.scale.height - 90, scale: 0.05, asset: 'flotante-dos' },
    // { x: 1050, y: scene.scale.height - 240, scale: 0.5, asset: 'dona' },
    { x: 850, y: scene.scale.height - 180, scale: 1, asset: 'dona-2' },
    { x: 650, y: scene.scale.height - 185, scale: 1, asset: 'dona-2' },
    { x: 450, y: scene.scale.height - 185, scale: 1, asset: 'dona-2' },
    { x: 298, y: scene.scale.height - 185, scale: 0.05, asset: 'flotante-dos' },
    { x: 155, y: scene.scale.height - 200, scale: 0.05, asset: 'flotante-dos' },
    { x: 50, y: scene.scale.height - 260, scale: 0.05, asset: 'flotante-dos' },
    { x: 170, y: scene.scale.height - 370, scale: 0.5, asset: 'flotante' },
    { x: 400, y: scene.scale.height - 370, scale: 0.5, asset: 'dona' },
    { x: 600, y: scene.scale.height - 400, scale: 0.5, asset: 'dona' },
    { x: 850, y: scene.scale.height - 402, scale: 0.5, asset: 'dona' },
    { x: 1100, y: scene.scale.height - 400, scale: 0.05, asset: 'flotante-dos' },
    { x: 1205, y: scene.scale.height - 470, scale: 0.05, asset: 'flotante-dos' },
    { x: 995, y: scene.scale.height - 580, scale: 0.5, asset: 'flotante' },


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
