/**
A Night at the Movies
George Gausden

Harry Potter!
*/

"use strict";

let bg = 0;


let wand;
let state = 'start';



/**
Description of preload
*/
function preload() {
  wand = loadImage(`assets/images/wand.png`);

}


/**
Description of setup
*/
function setup() {

  createCanvas(windowWidth,windowHeight);

  if (annyang){
    let commands = {
      'wingardium leviosa': levitate,
      'lumos': lumos,
    };

    annyang.addCommands(commands);
    annyang.start();
  }



}


/**
Description of draw()
*/
function draw() {
  background(255);
  
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

}

function keyPressed(){
  if (key === 32){
    state = 'quidditch';
  }
}

function mouse(){
  noCursor();

  push();
  imageMode(CENTER);
  image(wand,mouseX,mouseY,75,75);
  pop();
}
