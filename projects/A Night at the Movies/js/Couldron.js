class Couldron{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.potionsInside = [];
    this.currentRecipe = ['water','egg'];
    this.correctPotions = 0;
    this.fillR = 0;
    this.fillG = 0;
    this.fillB = 0;
    this.fillA = 0;
    this.potionSentence = '';

  }

  display(){
    push();
    fill(this.fillR,this.fillG,this.fillB,this.fillA);
    circle(this.x,this.y,this.size);
    pop();
  }

  checkContents(){
    let potion = this.potionsInside[0];

    for (let i = 0; i<this.potionsInside.length; i++){
      let potion = this.potionsInside[i];


      if (this.currentRecipe.includes(potion)){
        this.correctPotions += 1;
        //remove the potion inside
        this.potionsInside.splice(0,);
        console.log(this.potionsInside);
        console.log(this.correctPotions);
      }

    }

    //
    // //check if the potions inside match the recipe required
    // for (let i = 0; i<this.potionsInside.length; i++){
    //   let potion = this.potionsInside[i];
    //   console.log(potion);
    //   for (let j = 0; j<this.currentRecipe.length; j++){
    //     let matchingPotion = this.currentRecipe[j];
    //
    //     if (potion === matchingPotion && this.correctPotions < this.currentRecipe.length && !potion.potionCheckedInCouldron){
    //       this.correctPotions += 1;
    //
    //
    //     }
    //   }
    // }
    //
    // if (this.correctPotions === this.currentRecipe.length){
    //
    // }
  }

  mix(){

  }
}
