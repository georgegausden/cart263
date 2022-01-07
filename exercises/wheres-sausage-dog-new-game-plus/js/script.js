/**
Where's Sausage Dog New Game Plus
George Gausden

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

//declare global constants
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;
const WINNING_LEVEL = 5;

let animalImages = [];
let animals = [];

let sausageDogImage;
let sausageDog;

let level = 0;

let state = 'start';

let backgroundMusic = undefined;
let dogFoundSFX = undefined;


/**
Description of preload
*/
function preload() {

  for (let i = 0; i<NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  sausageDogImage = loadImage('assets/images/sausage-dog.png');

  backgroundMusic = loadSound('assets/sounds/meow.mp3');
  dogFoundSFX = loadSound('assets/sounds/dogFound.mov');
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create the animals
  setupCharacters();

}


/**
Description of draw()
*/
function draw() {

  if (state === 'start'){
    start();
  }
  else if (state === 'simulation'){
    simulation();
  }
  else if (state === 'levelDisplay'){
    levelDisplay();
  }
  else if (state === 'end'){
    end();
  }

}


function start(){
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Press any key to continue',width/2,height/2);
  pop();
}

function simulation(){

  if (!backgroundMusic.isPlaying()){
    backgroundMusic.play();
  }

  background(255,255,0);

  for (let i = 0; i<animals.length; i++){
    let animal = animals[i];

    animal.update();
  }
  sausageDog.update();

  setTimeout(function (){
    background(255,0,0,200)},5000);
}

function levelDisplay(){
  //display the level of the user if they passed a level
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Level: '+level,width/2,height/2);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  text('Press any key to continue playing',width/2,height/2+200);
  pop();

}

function end(){
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Congratulations you found him!',width/2,height/2);
  pop();


  //allow the user to be able to restart the game if they choose to
}

function keyPressed(){
  if (state === 'start'){
    state = 'simulation';
  }
  else if (state === 'end'){
    //reset parameters
    resetGame();
    state = 'start';
  }
  else if (state === 'levelDisplay'){
    sausageDog.found = false;
    state = 'simulation';
  }

}

function mousePressed(){
  sausageDog.mousePressed();
}

function resetGame(){
  //reset all the things that need to be reset
  //delete all the previous animals
  animals = [];

  sausageDog.found = false;
  sausageDog.angle = 0;

  setupCharacters();

}

function setupCharacters(){
  //create the animals
  for (let i = 0; i<NUM_ANIMALS; i++){
    let x = random(0,width);
    let y = random(0,height);
    let animalImage = random(animalImages);
    let animal = new Animal(x,y,animalImage);
    animals.push(animal);
  }

  let x = random(0,width);
  let y = random(0,height);
  sausageDog = new SausageDog(x,y,sausageDogImage);
}

function strobingLight(){
  //create a strobing light effect
  setTimeout(function (){
    background(255,0,0,50)},5000);

}
