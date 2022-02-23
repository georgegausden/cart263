//a file to define the potions class at Hogwarts

//in this part of the game, the user will have to use different spells and place potions into
//a couldron

//a function to call all of the other functions that are part of this scene
function potionsClass(){
  if (themeSong.isPlaying()) {
    themeSong.stop();
  }
  if (!potionsMusic.isPlaying()) {
    potionsMusic.play();
  }
  background(0,0,200);

  //set the background image for the classroom
  push();
  imageMode(CENTER);
  image(potionClassroomImage,width/2,height/2,width,height);
  pop();

  //set up the table for the potions and the couldron to sit
  push();
  rectMode(CENTER);
  noStroke();
  fill(170,135,107);
  rect(width/2,1.9*height/2,width,300);
  pop();

  //define the starting positions of our potions and our couldron
  if (!loadedPotionsClass){
    for (let i = 0; i<numberOfPotions; i++){
      let potion = new Potion(width/4+i*100,4*height/5,random(100,255),random(0,255),random(0,100),255,random(potionTypes));

      potions.push(potion);
    }

    //load the couldron
    couldron = new Couldron(1.7*width/2,1.5*height/2);


    loadedPotionsClass = true;
  }

  //functions to load all the actions of the different elements in the game
  potionActions();
  couldronActions();
  potionsClassInstructions();

  if (!couldron.couldronCompleted){
    displayPotionToMake();
  }

  if (couldron.explodes){
    if (!potionExplosionSFX.isPlaying()){
      potionExplosionSFX.play();
    }
    explosion();
  }
  else if (couldron.couldronCompleted){
    victory();
  }
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
  couldron.checkContents();
  couldron.completed();

}

//shows the user what to do to mix potions in the couldron
function potionsClassInstructions(){
  push();
  textAlign(CENTER);
  textFont(classicFont);
  fill(200,200,100);
  textSize(80);
  text(`Place your wand on a potion\n and say 'Wingardium Leviosa' to levitate a potion`,width/2,height/5);
  pop();
}

//a function to load the potion needed from our json file
function loadPotion(data){
  potionsData = data;
  potionToMake = random(potionsData);
  potionToMakeName = potionToMake.name;
  potionToMakeDescription = potionToMake.description;
}

//displays which potion to make on the bottom of the screen
function displayPotionToMake(){
  push();
  textAlign(CENTER,RIGHT);
  textFont(classicFont);
  fill(200,200,100);
  textSize(30);
  text(`Potion to make: ${potionToMakeName}
    What it does: ${potionToMakeDescription}`,width/2,1.85*height/2);
  pop();
}

//when the user has the wrong combination of potions, the couldron explodes violently
function explosion(){
  //start a circle that expands from the couldron
  for (let i = 0; i<numberExplosions; i++){
    push();
    fill(255,random(0,255),0);
    circle(couldron.x,couldron.y,1/(i+1)*explosionSize);
    pop();
  }

  explosionSize += 100;
}

//a function to display text when the user has the right potion
function victory(){
  push();
  textAlign(CENTER);
  textFont(classicFont);
  textSize(40);
  text(`Congratulations on your potion young wizard!`,width/2,8.5*height/9);
  pop();
}
