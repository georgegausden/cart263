class Play extends Phaser.Scene {
  constructor() {
    super({
      key: `play`
    });
  }

  create() {

    this.walls = this.physics.add.group({
      key: `wall`,
      immovable: true,
      quantity: 24
    });

    this.walls.children.each(function(wall){
      let x = Math.random()*this.sys.canvas.width;
      let y = Math.random()*this.sys.canvas.height;
      wall.setPosition(x,y);
      wall.setTint(0xdd3333);
    },this);

    this.collectables = this.physics.add.group({
      key: `wall`,
      quantity: 100
    });

    this.collectables.children.each(function(collectable){
      let x = Math.random()*this.sys.canvas.width;
      let y = Math.random()*this.sys.canvas.height;
      collectable.setPosition(x,y);
      collectable.setTint(0x33dd33);
    },this);

    this.avatar = this.physics.add.sprite(200, 200, `avatar`);

    this.createAnimations();

    this.avatar.setCollideWorldBounds(true);
    this.avatar.play(`avatar-idle`);

    this.physics.add.collider(this.avatar,this.walls);
    this.physics.add.overlap(this.avatar,this.collectables,this.collectItem,null,this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createAnimations() {
    let movingAnimationConfig = {
      key: `avatar-moving`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 3
      }),
      frameRate: 30,
      repeat: -1
    };
    this.anims.create(movingAnimationConfig);

    let idleAnimationConfig = {
      // NOTE: We need to use a different animation key of course
      key: `avatar-idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        // NOTE: We're only going to use frame 0, so it's starts and ends there
        start: 0,
        end: 0
      }),
      // NOTE: No need to specify a frame rate for something that doesn't animate!
      // NOTE: We'll repeat 0 times!
      repeat: 0
    };
    this.anims.create(idleAnimationConfig);
  }

  update() {
    this.avatar.setVelocity(0);

    if (this.cursors.left.isDown)
    {
        this.avatar.setVelocityX(-300);
    }
    else if (this.cursors.right.isDown)
    {
        this.avatar.setVelocityX(300);
    }

    if (this.cursors.up.isDown)
    {
        this.avatar.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
        this.avatar.setVelocityY(300);
    }

    if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !==0){
      this.avatar.play(`avatar-moving`, true);
    }
    else{
      this.avatar.play(`avatar-idle`, true);
    }
  }

  collectItem(avatar,collectable){
    collectable.destroy();
  }
}
