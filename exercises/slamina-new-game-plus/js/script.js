/**
Slamina New Game+
George Gausden

In Slamina New Game+, the user must correctly guess the animal names the computer tells them backwards.
*/

"use strict";

//declare all my constants and variables
const animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "reptile",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
const WINNING_SCORE = 5;
const LOSING_SCORE = 5;
const MAX_TIME = 10;

let currentAnimal = '';
let currentAnswer = '';
let score = 0;
let losses = 0;
let state = 'start';
let simulationState = 'instructions';
let timeElapsed = 0;
let timer = MAX_TIME;

//declare my boolean variables
let pointTaken = false;
let pointWon = false;
let wrongAnswer = false;

//declare the assets used
let yaySFX = undefined;
let booSFX = undefined;
let disappointedSFX = undefined;
let clappingSFX = undefined;


/**
Preloads all the sounds used in the game
*/
function preload() {

  yaySFX = loadSound('assets/sounds/yaySFX.mp3');
  booSFX = loadSound('assets/sounds/booSFX.mp3');
  clappingSFX = loadSound('assets/sounds/clappingSFX.mp3');
  disappointedSFX = loadSound('assets/sounds/disappointedSFX.mp3');
}


/**
Creates the canvas, sets up annyang and its functions
*/
function setup() {
  createCanvas(500, 500);

  if (annyang) {
    let commands = {
      'I think it is *animal': guessAnimal,
    };

    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
  }
}


/**
Creates the states of the game (start, simulation and end)
*/
function draw() {

  if (state === 'start') {
    start();
  } else if (state === 'simulation') {
    simulation();
  } else if (state === 'endWin') {
    endWin();
  } else if (state === 'endLose') {
    endLose();
  }
}

//creates the start state of the game, displays some info
function start() {
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 450, 450);
  fill(255);
  rect(width / 2, height / 2, 500, 500);


  push();
  textAlign(CENTER);
  textSize(30);
  fill(0);
  text('Guess the animal name game!', width / 2, height / 2 - 50);
  text('Click with the mouse to start', width / 2, height / 2 + 50);
  pop();
}

//creates the simulation state of the game, this is where the program compares the user's input with the expected input
function simulation() {
  background(0);

  //change the state if the user has a certain amount of wins or losses
  if (score === WINNING_SCORE) {
    state = 'endWin';
  } else if (losses === LOSING_SCORE) {
    state = 'endLose';
  }

  //display the time
  push();
  textSize(100);
  fill(255);
  text(timer, width / 2, height / 2);
  pop();

  //this part of the code was taken from an example by Mary Notari at the following link
  // https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
  //makes the timer count down
  if (frameCount % 60 == 0 && timer > 0 && wrongAnswer == false) {
    timer -= 1;
  }

  //in game, the guess is processed and evaluated, it also displays the scores
  game();

}

//displays the end state of the game to the user if they win, lets the user restart if they want
function endWin() {
  background(255);

  if (!clappingSFX.isPlaying()) {
    clappingSFX.play();
  }

  push();
  textAlign(CENTER);
  textSize(30);
  fill(0);
  text('Congratulations,\n you beat the game!', width / 2, height / 2 - 100);
  text('To restart, press any key', width / 2, height / 2 + 100);
  pop();

}

//displays the end state of the game to the user if they lose, lets the user restart if they want
function endLose() {
  background(255);

  if (!disappointedSFX.isPlaying()) {
    disappointedSFX.play();
  }

  push();
  textAlign(CENTER);
  fill(255, 0, 0);
  textSize(30);
  text('Oh no!\n you lose the game!', width / 2, height / 2 - 100);
  text('To restart, press any key', width / 2, height / 2 + 100);
  pop();

}

//defines what pressing a key does in each state
function keyPressed() {
  if (state === 'endWin') {
    score = 0;
    losses = 0;
    state = 'start';
  } else if (state === 'endLose') {
    score = 0;
    losses = 0;
    state = 'start';
  }
}

//defines what the mouse pressed does, in this case it triggers events in simulation
function mousePressed() {
  if (state = 'simulation') {
    //reset timer, as well as boolean variables. Sets the currrent answer as empty and picks a new word
    timer = MAX_TIME;
    wrongAnswer = false;
    pointWon = false;
    currentAnswer = '';
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal);

    //if the user clicks again during the game even if the game started, we give them another chance
    if (pointTaken == true) {
      pointTaken = false;
      timer = MAX_TIME;
    }
  } else if (state = 'start') {
    state = 'simulation';
  }
}

//converts the answer into lower case letters
function guessAnimal(animal) {
  currentAnswer = animal.toLowerCase();
}

/**
Reverses the provided string
*/
function reverseString(string) {
  // Split the string into an array of characters
  let characters = string.split('');
  // Reverse the array of characters
  let reverseCharacters = characters.reverse();
  // Join the array of characters back into a string
  let result = reverseCharacters.join('');
  // Return the result
  return result;
}

//the main game, the users guesses are evaluated against the answer, also displays the score and losses
function game() {

  //either the user guesses right in time, doesn't guess at all or guesses wrong in time
  if (currentAnswer === currentAnimal && timer != 0 && pointWon === false) {
    winPoint();
    pointWon = true;
  } else if (currentAnswer != currentAnimal && timer === 0 && pointTaken === false && pointWon === false) {
    losePoint();
    pointTaken = true;
  } else if (currentAnswer != '' && currentAnswer != currentAnimal && pointTaken === false && pointWon === false) {
    losePoint();
    wrongAnswer = true;
    pointTaken = true;
  }

  displayScore();
}

//triggers a sound when the user loses and entails a loss of 1 point
function losePoint() {
  if (!booSFX.isPlaying()) {
    booSFX.play();
  }
  losses += 1;
}

//triggers a sound when the user wins and entails a win of 1 point
function winPoint() {
  if (!yaySFX.isPlaying()) {
    yaySFX.play();
  }
  score += 1;
}

//displays the current score of the user as well as how many points the user has lost
function displayScore() {
  push();
  textAlign(CENTER);
  textSize(30);
  fill(255);
  text("Score", width / 2, height / 2 - 200);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  fill(0, 255, 0);
  text(score + "/" + WINNING_SCORE, width / 2 - 100, height / 2 - 100);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  fill(255, 0, 0);
  text(losses + "/" + LOSING_SCORE, width / 2 + 100, height / 2 - 100);
  pop();
}
