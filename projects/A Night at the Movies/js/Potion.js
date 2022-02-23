class Potion{
  constructor(x,y,fillR,fillG,fillB,fillA,typeOfPotion){
    this.x = x;
    this.y = y;
    this.xi = x;
    this.yi = y;
    this.size = 100;
    this.fillR = fillR;
    this.fillG = fillG;
    this.fillB = fillB;
    this.fillA = fillA;
    this.wingardiumSFXPlayed = false;
    this.emptyPotionSFXPlayed = false;
    this.selected = false;
    this.inCouldron = false;
    this.fill = 0;
    this.typeOfPotion = typeOfPotion;
    this.potionEmptied = false;
    this.potionCheckedInCouldron = false;
  }

  display(){
    push();
    fill(this.fillR,this.fillG,this.fillB,this.fillA);
    textAlign(CENTER);
    stroke(255);
    strokeWeight(3);
    // text(this.typeOfPotion,this.x,this.y);
    circle(this.x,this.y,this.size);
    pop();
  }

  //checks to see if the potion was selected by the user using the mouse and a spell said
  checkSelection(){
    //first check to see if the mouse is within the bounds of the shape
    let d = dist(mouseX,mouseY,this.x,this.y);

    if (d<this.size/2 && wingardiumCalled && numberOfPotionsInHand === 0){
      if (!wingardiumSFX.isPlaying() && !this.wingardiumSFXPlayed){
        wingardiumSFX.play();
        this.wingardiumSFXPlayed = true;
      }
      this.selected = true;
      numberOfPotionsInHand += 1;
    }
  }

  //moves the potion in space
  move(){

    this.checkSelection();

    if (this.selected){
      //make the position of the potion depend on the wand of the user

      this.x = mouseX + 40*sin(1/16*frameCount);
      //make the potion bounce up and down slowly
      this.y = mouseY - 40*sin(1/12*frameCount);
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

      //empty the potion inside once
      if (!this.potionEmptied){
        couldron.potionsInside.push(this);

        //add the colour of the potion inside
        couldron.fillR += this.fillR;
        couldron.fillG += this.fillG;
        couldron.fillB += this.fillB;
        couldron.fillA += this.fillA;

        this.fillA = 0;

        this.potionEmptied = true;
      }
    }
  }

  emptiedAndPlacedBack(){
    this.x = this.xi;
    this.y = this.yi;
    this.selected = false;
    this.wingardiumSFXPlayed = false;
    wingardiumCalled = false;
    numberOfPotionsInHand = 0;
  }

}
