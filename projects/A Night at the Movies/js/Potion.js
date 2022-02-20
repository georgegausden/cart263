class Potion{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.xi = x;
    this.yi = y;
    this.size = 100;
    this.wingardiumSFXPlayed = false;
    this.emptyPotionSFXPlayed = false;
    this.selected = false;
    this.inCouldron = false;
    this.fill = 0;
  }

  display(){
    push();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();
  }

  //checks to see if the potion was selected by the user using the mouse and a spell said
  checkSelection(){
    //first check to see if the mouse is within the bounds of the shape
    let d = dist(mouseX,mouseY,this.x,this.y);

    if (d<this.size/2 && wingardiumCalled){
      if (!wingardiumSFX.isPlaying() && !this.wingardiumSFXPlayed){
        wingardiumSFX.play();
        this.wingardiumSFXPlayed = true;
      }
      this.selected = true;
    }
  }

  //moves the potion in space
  move(){

    this.checkSelection();

    if (this.selected){
      //make the position of the potion depend on the wand of the user

      this.x = mouseX;
      this.y = mouseY;
    }
  }

  //check to see if the potion has entered the couldron
  checkTouch(){
    let d = dist(this.x,this.y,couldron.x,couldron.y);

    if (d < (this.size/2 + couldron.size/2)){
      this.inCouldron = true;
    }
  }

  emptyPotion(){
    this.checkTouch();

    if (this.inCouldron){
      if (!emptyPotionSFX.isPlaying() && !this.emptyPotionSFXPlayed){
        emptyPotionSFX.play();
        this.emptyPotionSFXPlayed = true;
      }
      this.fill = 255;
    }
  }

  emptiedAndPlacedBack(){
    this.x = this.xi;
    this.y = this.yi;
    this.selected = false;
    this.wingardiumSFXPlayed = false;
    wingardiumCalled = false;
  }

}
