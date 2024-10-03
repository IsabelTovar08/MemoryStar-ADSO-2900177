// platforms.js
export function createPlatforms(scene) {
  const platformPositions = [
    { x: 90, y: scene.scale.height - 0 , scale: 0.1, asset: 'n'},
    { x: 170, y: scene.scale.height - 0 , scale: 0.1, asset: 'n'},
    { x: 1000, y: scene.scale.height - 0, scale: 0.1,asset: 'n'},
 
    // { x: 790, y: scene.scale.height - 0, scale: 0.1,asset: 'n'},
    { x: 900, y: scene.scale.height - 0, scale: 0.1,asset: 'n'},
    { x: 300, y: scene.scale.height - 320, scale: 0.1,asset: 'n'},
    // { x: 790, y: scene.scale.height - 180, scale: 0.03,asset:'2'},
    { x: 0, y: scene.scale.height - 250, scale: 0.1,asset: 'n'},
    { x: 400, y: scene.scale.height - 100, scale: 0.1,asset: 'n'},
    { x: 600, y: scene.scale.height - 310, scale: 0.1,asset: 'n'},
    { x: 900, y: scene.scale.height - 250, scale: 0.1,asset: 'n'},
    { x: 150, y: scene.scale.height - 180, scale: 0.1,asset: 'n'},    
    { x: 1200, y: scene.scale.height - 170, scale: 0.1,asset: 'n'},    
  ];

  platformPositions.forEach(pos => {
    const asset = pos.asset || 'suelo';
    scene.floor.create(pos.x, pos.y, asset).setOrigin(0, 1).setScale(pos.scale).refreshBody();
  });
}
