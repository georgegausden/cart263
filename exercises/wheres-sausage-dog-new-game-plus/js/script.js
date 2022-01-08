/**
Where's Sausage Dog New Game+
George Gausden

This is an exercise where the user must catch the sausage dog by clicking with their mouse on the sausage dog image.
*/

"use strict";

//declare global constants
const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS = 100;
const WINNING_LEVEL = 4;

//create arrays for my images and for my animal objects
let animalImages = [];
let animals = [];

let sausageDogImage;
let sausageDog;

let level = 0;

let state = 'start';

//declare all my sound effect variables
let backgroundMusic = undefined;
let dogFoundSFX = undefined;
let dogSFX = undefined;
let catSFX = undefined;
let monkeySFX = undefined;
let lionSFX = undefined;

//create the sound effect array
let dogFoundSounds = [];


/**
Loads all the assets such as the images and sounds that will be used in the game
*/
function preload() {

  for (let i = 0; i < NUM_ANIMAL_IMAGES; i++) {
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  sausageDogImage = loadImage('assets/images/sausage-dog.png');

  //the background music as well as the sound effects were all taken from YouTube
  backgroundMusic = loadSound('assets/sounds/meow.mp3');
  dogSFX = loadSound('assets/sounds/dogFound.mov');
  catSFX = loadSound('assets/sounds/cat.mp3');
  lionSFX = loadSound('assets/sounds/lion.mov');
  monkeySFX = loadSound('assets/sounds/monkey.mp3');
}


/**
Creates the canvas, the objects used in the game as well as the sound effects array
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

  //create an array of possible ending sounds to the game
  dogFoundSounds = [dogSFX, catSFX, lionSFX, monkeySFX];
  dogFoundSFX = random(dogFoundSounds);

  //create the animals
  setupCharacters();

}


/**
Creates the states of the game (start, simulation, levelDisplay and end)
*/
function draw() {

  if (state === 'start') {
    start();
  } else if (state === 'simulation') {
    simulation();
  } else if (state === 'levelDisplay') {
    levelDisplay();
  } else if (state === 'end') {
    end();
  }

}

//creates the start state of the game, displays some info
function start() {
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Press any key to continue', width / 2, height / 2);
  pop();
}

//creates the simulation state of the game, this is where the user interacts with the animals
function simulation() {

  //play the background music
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
  }

  background(200, 255, 100);

  //update each animal in the array
  for (let i = 0; i < animals.length; i++) {
    let animal = animals[i];

    animal.update();
  }

  sausageDog.update();

}

//displays the levelDisplay state where the user is told what level they're at
function levelDisplay() {
  //display the level of the user if they passed a level
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Level: ' + level + "/" + (WINNING_LEVEL + 1), width / 2, height / 2);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  text('Press any key to continue playing', width / 2, height / 2 + 200);
  pop();

}

//displays the end state of the game to the user, lets the user restart if they want
function end() {
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Congratulations you found him!', width / 2, height / 2 - 100);
  text('To restart, press any key', width / 2, height / 2 + 100);
  pop();

}

//defines what pressing a key does in each state
function keyPressed() {
  if (state === 'start') {
    state = 'simulation';
  } else if (state === 'end') {
    //reset parameters
    resetGame();
    //reset the levels of the game
    level = 0;
    state = 'start';
  } else if (state === 'levelDisplay') {
    sausageDog.found = false;
    state = 'simulation';
  }

}

//lets the user click on the sausage dog and initiates the sausage dog found actions
function mousePressed() {
  sausageDog.mousePressed();
}

//resets most of the parameters in the game, used when we continue after upgrading a level
function resetGame() {
  //reset all the things that need to be reset
  //delete all the previous animals
  animals = [];

  //reset the dog found sound so it changes
  dogFoundSFX = random(dogFoundSounds);

  //make sure the dog is not declared as found again
  sausageDog.found = false;

  //setup the characters again so that it's random again
  setupCharacters();

}

//sets up all the objects (characters) in the game
function setupCharacters() {
  //create the animals
  for (let i = 0; i < NUM_ANIMALS; i++) {
    let x = random(0, width);
    let y = random(0, height);
    let animalImage = random(animalImages);
    let animal = new Animal(x, y, animalImage);
    animals.push(animal);
  }

  let x = random(0, width);
  let y = random(0, height);
  sausageDog = new SausageDog(x, y, sausageDogImage);
}
