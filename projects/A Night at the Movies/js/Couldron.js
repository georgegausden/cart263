class Couldron{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.potionsInside = ['water','egg'];
    this.currentRecipe = ['water','egg'];
    this.correctPotions = 0;
    this.fillR = 0;
    this.fillG = 0;
    this.fillB = 0;
    this.fillA = 0;
  }

  display(){
    push();
    fill(this.fillR,this.fillG,this.fillB,this.fillA);
    circle(this.x,this.y,this.size);
    pop();
  }

  checkContents(){
    //check if the potions inside match the recipe required
    for (let i = 0; i<this.potionsInside.length; i++){
      let potion = this.potionsInside[i];
      for (let j = 0; j<this.currentRecipe.length; j++){
        let matchingPotion = this.currentRecipe[j];

        if (potion === matchingPotion){
          this.correctPotions += 1
          continue

        }
      }
    }

    if (this.correctPotions === this.currentRecipe.length){
      console.log('bravo');
    }
  }

  mix(){

  }
}
