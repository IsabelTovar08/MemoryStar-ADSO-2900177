// platforms.js
export function createPlatforms(scene) {
  const platformPositions = [
    { x: 50, y: scene.scale.height - 16, scale: 0.1 },
    { x: 250, y: scene.scale.height - 16, scale: 0.1 },
    { x: 420, y: scene.scale.height - 116, scale: 0.1 },
    { x: 650, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 820, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 990, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 1116, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 1400, y: scene.scale.height - 280, scale: 0.09 },
    { x: 1500, y: scene.scale.height - 350, scale: 0.09 },
    { x: 1250, y: scene.scale.height - 420, scale: 0.09, asset: 'suelo-flo' },
    { x: 820, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 990, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 1116, y: scene.scale.height - 185, scale: 0.09, asset: 'suelo-flo' },
    { x: 155, y: scene.scale.height - 200, scale: 0.05, asset: 'flotante' },
    { x: 50, y: scene.scale.height - 260, scale: 0.05, asset: 'flotante' },
    { x: 1050, y: scene.scale.height - 400, scale: 0.1 },
    { x: 400, y: scene.scale.height - 370, scale: 0.1 },
    { x: 600, y: scene.scale.height - 400, scale: 0.1 },
    { x: 850, y: scene.scale.height - 402, scale: 0.1 },
    { x: 150, y: scene.scale.height - 402, scale: 0.1 },
  ];

  platformPositions.forEach(pos => {
    const asset = pos.asset || 'suelo-flotante';
    scene.floor.create(pos.x, pos.y, asset).setOrigin(0, 1).setScale(pos.scale).refreshBody();
  });
}