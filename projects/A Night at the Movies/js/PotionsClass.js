//a file to define the potions class at Hogwarts

//in this part of the game, the user will have to use different spells and place potions into
//a couldron

//we will need the Ml5 library and also the voice recognition library

//a function to call all of the other functions that are part of this scene
function potionsClass(){
  background(255);

  //define the starting positions of our potions and our couldron
  if (!loadedPotionsClass){
    for (let i = 0; i<numberOfPotions; i++){
      let potion = new Potion(width/4+i*10,4*height/5);

      potions.push(potion);
    }

    //load the couldron
    couldron = new Couldron(width/2,height/2);


    loadedPotionsClass = true;
  }

  //functions to load all the actions of the different elements in the game
  potionActions();
  couldronActions();

  mouse();

}

//does all the potion related stuff
function potionActions(){
  for (let i = 0; i<potions.length; i++){
    let potion = potions[i];

    potion.display();
    potion.move();
    potion.emptyPotion();
  }
}

//does all the couldron related stuff
function couldronActions(){
  couldron.display();
}
