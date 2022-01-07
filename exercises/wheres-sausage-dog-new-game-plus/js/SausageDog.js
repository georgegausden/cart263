class SausageDog extends Animal{
  constructor(x,y,image){
    super(x,y,image);
    this.found = false;
    this.rotationSpeed = 0.25;
  }


  update(){
    super.update();

    if (this.found && level < WINNING_LEVEL){
      if (!dogFoundSFX.isPlaying()){
        dogFoundSFX.play();
      }
      this.angle += this.rotationSpeed;
      level += 1;
      resetGame();
      state = 'levelDisplay';
    }
    else if (this.found && level === WINNING_LEVEL){
      if (!dogFoundSFX.isPlaying()){
        dogFoundSFX.play();
      }
      state = 'end';
    }
  }

  mousePressed(){
    //set the bounds of the sausage dog image
    if (this.overlap(mouseX,mouseY)){
      this.found = true;
    }
  }
}
