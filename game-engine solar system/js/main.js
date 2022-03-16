"use strict";

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: `matter`,
    matter: {
      gravity:{
        scale:0
      },
      plugins:{
        attractors: true
      }
    }
  },
  scene: [Boot,Play]
};

let game = new Phaser.Game(config);
