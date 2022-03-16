class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`
    });
  }

  create() {
    this.matter.world.setBounds();

    this.matter.add.imageStack('alien', null, 0, 500, 50, 2, 0, 0, {
        mass: 1,
        ignorePointer: true
    });

    let sun1 = this.matter.add.image(400, 200, 'wall', null, {
        shape: {
            type: 'circle',
            radius: 64
        },
        plugin: {
            attractors: [
                function (bodyA, bodyB) {
                    return {
                        x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                        y: (bodyA.position.y - bodyB.position.y) * 0.000001
                    };
                }
            ]
        }
    });

    let sun2 = this.matter.add.image(400, 200, 'wall', null, {
        shape: {
            type: 'circle',
            radius: 64
        },
        plugin: {
            attractors: [
                function (bodyA, bodyB) {
                    return {
                        x: (bodyA.position.x - bodyB.position.x) * 0.000001,
                        y: (bodyA.position.y - bodyB.position.y) * 0.000001
                    };
                }
            ]
        }
    });

    this.matter.add.mouseSpring();
  }


  update() {

  }
}
