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

// load the sounds used
let themeSong;
let lumosSFX;
let quidditchMusic;

// load the fonts
let classicFont;

let state = 'start';
let title = 'Harry Potter';
let titleSize = 90;
let instructionsSize = 40;

//load the boolean triggers
let lumosCalled = false;
let loadQuidditch = false;

//load the arrays
let hoops = [];
let enemyQuidditchPlayers = [];
let quidditchUser;
let quidditchScore = 0;
let numberOfHoops = 3;
let numberOfQuidditchEnemies = 3;
let goldenSnitch;

let myButton;


/**
Description of preload
*/
function preload() {
  wandImage = loadImage(`assets/images/wand.png`);
  logo = loadImage(`assets/images/logo.png`);
  clouds = loadImage(`assets/images/clouds.png`);
  quidditchBackground = loadImage(`assets/images/quidditchBackground.jpg`);
  goldenSnitchImage = loadImage(`assets/images/goldenSnitchImage.gif`);


  themeSong = loadSound(`assets/sounds/themeSong.mp3`);
  lumosSFX = loadSound(`assets/sounds/lumosSFX.mov`);
  quidditchMusic = loadSound(`assets/sounds/quidditchMusic.mp3`);

  classicFont = loadFont(`assets/fonts/harryPotter.TTF`);
}


/**
Description of setup
*/
function setup() {

  createCanvas(windowWidth,windowHeight);

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
}


/**
Description of draw()
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
    state = 'quidditch';
  }
}

function mouse(){
  noCursor();

  push();
  imageMode(CENTER);
  image(wandImage,mouseX,mouseY,75,75);
  pop();
}

function mousePressed(){
  lumos();
}
