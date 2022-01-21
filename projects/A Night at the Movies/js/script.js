/**
A Night at the Movies
George Gausden

Harry Potter!
*/

"use strict";

//define the background colours
let bg = 0;
let bgStart = 0;

// define the wand object
let wand;

// load the images used
let wandImage;
let logo;
let clouds;

// load the sounds used
let themeSong;
let lumosSFX;

// load the fonts
let classicFont;

let state = 'quidditch';
let title = 'Harry Potter';
let titleSize = 90;

//load the boolean triggers
let lumosCalled = false;
let loadQuidditch = false;

//load the arrays
let hoops = [];
let quidditchUser;
let quidditchScore = 0;
let numberOfHoops = 10;

let myButton;


/**
Description of preload
*/
function preload() {
  wandImage = loadImage(`assets/images/wand.png`);
  logo = loadImage(`assets/images/logo.png`);
  clouds = loadImage(`assets/images/clouds.png`);


  themeSong = loadSound(`assets/sounds/themeSong.mp3`);
  lumosSFX = loadSound(`assets/sounds/lumosSFX.mov`);

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
  if (!themeSong.isPlaying()){
    themeSong.play();
  }

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

  background(bgStart);

  mouse();

  if (!lumosCalled){
    push();
    textAlign(CENTER);
    textFont(classicFont);
    fill(255);
    textSize(40);
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
