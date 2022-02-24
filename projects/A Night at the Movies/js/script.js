/**
A Night at the Movies
George Gausden

Harry Potter!
*/

"use strict";

//define the background colours
let bg = 0;
let bgStart = 0;
let quidditchBackground;

// define the wand object
let wand;

// load the images used
let wandImage;
let logo;
let clouds;
let goldenSnitchImage;
let nimbus2000Image;
let quidditchPlayerImage;
let quidditchPlayerImageRight;
let enemyQuidditchPlayerImage;
let enemyQuidditchPlayerImageRight;
let potionClassroomImage;
let spell1Image;
let spell2Image;
let spell3Image;

//load the json files used
let potionsData = undefined;

// load the sounds used
let themeSong;
let lumosSFX;
let quidditchMusic;
let potionsMusic;
let cheeringSFX;
let wingardiumSFX;
let emptyPotionSFX;
let immobulus1SFX;
let immobulus2SFX;
let immobulus3SFX;
let immobulus4SFX;
let immobulus5SFX;
let immobulusSFX = [];
let potionExplosionSFX;
let quidditchEndMusic;
let correctPotionSFX;

// load the fonts
let classicFont;

let state = 'start';
let title = 'Harry Potter';
let titleSize = 90;
let instructionsSize = 40;

//load the boolean triggers
let lumosCalled = false;
let wingardiumCalled = false;
let loadedQuidditch = false;
let loadedPotionsClass = false;

//load the arrays and variables for the quidditch game
let hoops = [];
let spellImages = [];
let enemyQuidditchPlayers = [];
let friendlyQuidditchPlayers = [];
let quidditchUser;
let quidditchScore = 0;
let numberOfHoops = 3;
let numberOfQuidditchEnemies = 4;
let quidditchSpells = [];
let goldenSnitch;
let quidditchUserScore = 0;
let quidditchEnemyScore = 0;
let quidditchUserWon = false;
let quidditchEnemyWon = false;
let quidditchBackgroundMovement = 10;
let fadeOutQuidditch = 0;
let enemyPointTimer = 9000;
let movingClouds = [];
let numClouds = 4;


//load the arrays and variables for our potions class
let couldron;
let potions = [];
let numberOfPotions = 5;
let numberOfPotionsInHand = 0;
let potionTypes = ['water','egg','mouse'];
let potionToMakeName;
let potionToMake;
let potionToMakeDescription;
let explosionSize = 0;
let numberExplosions = 10;

let myButton;


/**
Description of preload
*/
function preload() {
  wandImage = loadImage(`assets/images/wand.png`);
  logo = loadImage(`assets/images/logo.png`);
  nimbus2000Image = loadImage(`assets/images/nimbus2000.png`);
  quidditchPlayerImage = loadImage(`assets/images/quidditchPlayer.png`);
  enemyQuidditchPlayerImage = loadImage(`assets/images/enemyQuidditchPlayer.png`);
  quidditchPlayerImageRight = loadImage(`assets/images/quidditchPlayerRight.png`);
  spell1Image = loadImage(`assets/images/spell1.png`);
  spell2Image = loadImage(`assets/images/spell2.png`);
  spell3Image = loadImage(`assets/images/spell3.png`);
  enemyQuidditchPlayerImageRight = loadImage(`assets/images/enemyQuidditchPlayerRight.png`);
  clouds = loadImage(`assets/images/clouds.png`);
  quidditchBackground = loadImage(`assets/images/quidditchBackground.jpg`);
  potionClassroomImage= loadImage(`assets/images/potionClassroomImage.jpg`);
  goldenSnitchImage = loadImage(`assets/images/goldenSnitchImage.gif`);


  themeSong = loadSound(`assets/sounds/themeSong.mp3`);
  potionsMusic = loadSound(`assets/sounds/potionsMusic.mp3`);
  quidditchEndMusic = loadSound(`assets/sounds/quidditchEndMusic.mp3`);
  lumosSFX = loadSound(`assets/sounds/lumosSFX.mov`);
  quidditchMusic = loadSound(`assets/sounds/quidditchMusic.mp3`);
  cheeringSFX = loadSound(`assets/sounds/cheeringSFX.mov`);
  wingardiumSFX = loadSound(`assets/sounds/wingardiumSFX.mov`);
  immobulus1SFX = loadSound(`assets/sounds/immobulus1SFX.mov`);
  immobulus2SFX = loadSound(`assets/sounds/immobulus2SFX.mov`);
  immobulus3SFX = loadSound(`assets/sounds/immobulus3SFX.mov`);
  immobulus4SFX = loadSound(`assets/sounds/immobulus4SFX.mov`);
  immobulus5SFX = loadSound(`assets/sounds/immobulus5SFX.mov`);
  emptyPotionSFX = loadSound(`assets/sounds/emptyPotionSFX.mp3`);
  potionExplosionSFX = loadSound(`assets/sounds/potionExplosionSFX.mp3`);
  correctPotionSFX = loadSound(`assets/sounds/correctPotionSFX.mp3`);

  classicFont = loadFont(`assets/fonts/harryPotter.TTF`);
}


/**
Description of setup
*/
function setup() {

  createCanvas(windowWidth,windowHeight);

  //load the potions data into our potions data variable
  loadJSON('assets/data/potions.json', loadPotion);

  wand = new Wand(mouseX,mouseY);

  //load the buttons we want to use in the game
  myButton = new Clickable();
  myButton.locate(100, 200);

  myButton.onRelease = function(){
  state = 'quidditch';
  }

  if (annyang){
    let commands = {
      'wingardium leviosa': levitate,
      'lumos': lumos,
      'lumos maxima': lumosMaxima,
    };

    annyang.addCommands(commands);
    annyang.start();
  }

  immobulusSFX = [immobulus1SFX,immobulus2SFX,immobulus3SFX,immobulus4SFX,immobulus5SFX];
  spellImages = [spell1Image,spell2Image,spell3Image];
}


/**
deals with the different states of the program
*/
function draw() {


  wand.update();
  mouse();

  if (state === 'start'){
    start();
  }
  else if (state === 'quidditch'){
    quidditch();
  }
  else if (state === 'potionsClass'){
    potionsClass();
  }
}

//the starting screen to the game, shows the black screen where the user needs to say lumos
function start(){

  if (!themeSong.isPlaying()){
    themeSong.play();
  }

  background(bgStart);

  mouse();

  if (!lumosCalled){
    push();
    textAlign(CENTER);
    textFont(classicFont);
    fill(255);
    textSize(instructionsSize);
    text(`Wave your wand and say 'lumos' for some light`,width/2,height/2);
    pop();
  };


  //let the user call lumos to see the start page
  if (lumosCalled){

    wand.lumos();

    push();
    textAlign(CENTER);
    textFont(classicFont);
    textSize(titleSize);
    text(title,width/2,height/2);
    pop();

    //display what to press to play each game
    push();
    textAlign(CENTER);
    textFont(classicFont);
    textSize(titleSize/2);
    text(`To play Quidditch, press 'q'
    To go to Potions Class, press 'p'`,width/2,1.5*height/2);
    pop();

    //display the buttons
    myButton.draw();
  };


  // expand the title slowly then constrain
  titleSize+=0.1;
  titleSize = constrain(titleSize,90,200);
  instructionsSize +=0.1;
  instructionsSize = constrain(instructionsSize,40,70);

}

function keyPressed(){
  if (keyCode === 32){
    state = 'potionsClass';
  }
  else if (keyCode === 78){
    levitate();
  }
  else if (keyCode === 65){
    lumos();
  }
  else if (keyCode === 81){
    state = 'quidditch'
  }
  else if (keyCode === 80){
    state = 'potionsClass';
  }

}

//changes the mouse look to a wand
function mouse(){
  noCursor();

  push();
  imageMode(CENTER);
  image(wandImage,mouseX,mouseY,75,75);
  pop();
}

//deals with what mousePressed does when the game is in different states
function mousePressed(){
  if (state === 'quidditch'){
    //create an immobulus spell
    let immobulus = new Immobulus(quidditchUser.x,quidditchUser.y,mouseX,mouseY,'user');
    //push it into the spells array to keep tab of where it is
    quidditchSpells.push(immobulus);
  }
  else if (state === `potionsClass`){
    //lets go of the potion currently in the user's hand
    for (let i = 0; i<potions.length; i++){
      let potion = potions[i];

      if (potion.selected){
        //release the potion
        potion.emptiedAndPlacedBack();
      }
    }
  }
}
