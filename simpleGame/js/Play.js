class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`
    });
  }

  create() {

    this.player = this.physics.add.sprite(200, 200, `player`);

    this.createAnimations();

    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    let platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(30).refreshBody();
  }

  createAnimations() {
    let movingAnimationConfig = {
      key: `player-moving`,
      frames: this.anims.generateFrameNumbers(`player`, {
        start: 0,
        end: 3
      }),
      frameRate: 30,
      repeat: -1
    };
    this.anims.create(movingAnimationConfig);
  }

  update() {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown)
    {
        this.player.setVelocityX(-300);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(300);
    }

    if (this.cursors.up.isDown)
    {
        this.player.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
        this.player.setVelocityY(300);
    }

    if (this.player.body.velocity.x !== 0 || this.player.body.velocity.y !==0){
      this.player.play(`player-moving`, true);
    }

  }

  collectItem(avatar,collectable){
    collectable.destroy();
  }
}
