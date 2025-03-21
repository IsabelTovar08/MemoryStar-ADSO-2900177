// platforms.js
export function createPlatforms(scene) {
  const platformPositions = [
    { x: 0, y: scene.scale.height - 5, scale: 0.1 , asset: '111'},
    // { x: 90, y: scene.scale.height - 5, scale: 0.1, asset: '111'},
 
    // { x: 386, y: scene.scale.height - 5, scale: 0.4 ,asset: 'lava'},
    // { x: 579, y: scene.scale.height - 5, scale: 0.4,asset: 'lava'},
    { x: 200, y: scene.scale.height - 60, scale: 0.04,asset: 'tr'},
    { x: 400, y: scene.scale.height - 150, scale: 0.04,asset: 'tr'},
    { x: 700, y: scene.scale.height - 100, scale: 0.04,asset: 'tr'},
    { x: 900, y: scene.scale.height - 280, scale: 0.1,asset: '111'},

    { x: 100, y: scene.scale.height - 300, scale: 0.034,asset: 'tr'},
    { x: 400, y: scene.scale.height - 380, scale: 0.034,asset: 'tr'},
    { x: 600, y: scene.scale.height - 470, scale: 0.034,asset: 'tr'},


    { x: 540, y: scene.scale.height - 650, scale: 0.2,asset: 'hielo2'},
    { x: 200, y: scene.scale.height - 650, scale: 0.2,asset: 'hielo2'},

    // { x: 240, y: scene.scale.height - 650, scale: 0.1,asset: '111'},
    // { x: 140, y: scene.scale.height - 650, scale: 0.1,asset: '111'},
    { x: 380, y: scene.scale.height - 650, scale: 0.2,asset: 'hielo2'},
    { x: 0, y: scene.scale.height - 650, scale: 0.2,asset: 'hielo2'},
    // { x: 950, y: scene.scale.height - 110, scale: 0.1,asset: '111'},
    { x: 1000, y: scene.scale.height - 130, scale: 0.1,asset: '111'},
    // { x: 700, y: scene.scale.height - 100, scale: 0.1,asset: '111'},
    { x: 1408, y: scene.scale.height - 310, scale: 0.1,asset: '111'},
    { x: 1000, y: scene.scale.height - 500, scale: 0.2,asset: 'hielo2'},
    
    
    { x: 1300, y: scene.scale.height - 210, scale: 0.1,asset: '111'},    
    { x: 1300, y: scene.scale.height - 425, scale: 0.1,asset: '111'},    
    { x: 1490, y: scene.scale.height - 532, scale: 0.03,asset: 'tr'},
    // { x: 1190, y: scene.scale.height - 532, scale: 0.03,asset: 'isla'},
    { x: 800, y: scene.scale.height - 580, scale: 0.2,asset: 'hielo2'},
    // { x: 1200, y: scene.scale.height - 650, scale: 0.2,asset: 'hielo2'},
    { x: 1130, y: scene.scale.height - 650, scale: 0.2,asset: 'hielo2'},
    { x: 900, y: scene.scale.height - 778, scale: 0.2,asset: 'hielo2'},





    // { x: 775, y: scene.scale.height - 7, scale: 0.4 },
    // { x: 900, y: scene.scale.height - 45, scale: 0.5, asset: '' },
    // { x: 1100, y: scene.scale.height - 85, scale: 0.5, asset: 'dona' },
    // { x: 1096, y: scene.scale.height - 110, scale: 0.4 },  
    // { x: 1200, y: scene.scale.height - 90, scale: 0.05, asset: 'flotante-dos' },
    // { x: 1050, y: scene.scale.height - 240, scale: 0.5, asset: 'dona' },
    // { x: 800, y: scene.scale.height - 185, scale: 0.4, asset: 'suelo-dos' },
    // { x: 500, y: scene.scale.height - 185, scale: 0.4, asset: 'suelo-dos' },
    // { x: 307, y: scene.scale.height - 185, scale: 0.5, asset: 'dona' },
    // { x: 155, y: scene.scale.height - 200, scale: 0.05, asset: 'flotante-dos' },
    // { x: 50, y: scene.scale.height - 260, scale: 0.05, asset: 'flotante-dos' },
    // { x: 170, y: scene.scale.height - 370, scale: 0.5, asset: 'flotante' },
    // { x: 400, y: scene.scale.height - 370, scale: 0.5, asset: 'dona' },
    // { x: 600, y: scene.scale.height - 400, scale: 0.5, asset: 'dona' },
    // { x: 850, y: scene.scale.height - 402, scale: 0.4, asset: 'suelo-dos' },
    // { x: 1100, y: scene.scale.height - 400, scale: 0.05, asset: 'flotante-dos' },
    // { x: 1205, y: scene.scale.height - 470, scale: 0.05, asset: 'flotante-dos' },
    // { x: 995, y: scene.scale.height - 580, scale: 0.5, asset: 'dona' },


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
