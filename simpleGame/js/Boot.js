class Boot extends Phaser.Scene{

  constructor(){
    super({
      key: `boot`
    });
  }

  preload(){

    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 32, frameHeight: 32, endFrame: 2 });
    this.load.image('ground', 'assets/images/floor.png');

    this.load.on('complete', () => {
        this.scene.start(`play`);
    });
  }

  create(){
    let style = {
      fontFamily: 'sans-serif',
      fontSize: `40px`,
      color: '#ffffff'
    };
    let loadingString = `Loading...`;
    this.add.text(100, 100, loadingString, style);

  }

  update(){

  }
}
