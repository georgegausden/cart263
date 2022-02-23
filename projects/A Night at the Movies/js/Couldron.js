class Couldron{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 200;
    this.potionsInside = [];
    this.currentRecipe = ['water','egg'];
    this.correctPotions = 0;
    this.wrongPotions = 0;
    this.potionsToExplode = 2;
    this.fillR = 0;
    this.fillG = 0;
    this.fillB = 0;
    this.fillA = 255;
    this.potionSentence = '';
    this.couldronCompleted = false;
    this.explodes = false;

  }

  //displays the couldron on the screen
  display(){
    push();
    fill(this.fillR,this.fillG,this.fillB,this.fillA);
    strokeWeight(4);
    circle(this.x,this.y,this.size);
    pop();
  }

  //checks what's been put inside the couldron
  checkContents(){
    for (let i = 0; i<this.potionsInside.length; i++){
      let potion = this.potionsInside[i];

      for (let j = 0; j<this.currentRecipe.length; j++){
        let correctPotionType = this.currentRecipe[j];

        if (potion.typeOfPotion === correctPotionType && !potion.potionCheckedInCouldron){
          this.correctPotions += 1;
          potion.potionCheckedInCouldron = true;
        }
        else if (potion.typeOfPotion != correctPotionType && !potion.potionCheckedInCouldron){
          this.wrongPotions += 1;
          potion.potionCheckedInCouldron = true;
        }
      }
    }

    if (this.correctPotions === this.currentRecipe.length-1){
      this.couldronCompleted = true;
    }
    else if (this.wrongPotions === this.potionsToExplode){
      this.explodes = true;
    }
  }

  //an effect so that the potion animates when the potion is completed
  completed(){
    if (this.couldronCompleted){
      //make the colours alternate in a rainbow way
      this.fillR = random(0,255);
      this.fillG = random(0,255);
      this.fillB = random(0,255);
      this.fillA = random(0,255);
    }
  }


}
