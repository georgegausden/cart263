/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

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

let currentAnimal = '';
let currentAnswer = '';

let state = 'start';

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(500,500);

  if (annyang){
    let commands = {
      'I think it is *animal': guessAnimal
    };

    annyang.addCommands(commands);
    annyang.start();

    textSize(32);
    textStyle(BOLD);
    textAlign(CENTER,CENTER);
  }
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
  background(0);
  if (currentAnswer === currentAnimal){
    fill(0,255,0);
  }
  else {
    fill(255,0,0);
  }

  text(currentAnswer, width/2, height/2);

}

//displays the end state of the game to the user, lets the user restart if they want
function end() {
  background(255);

  push();
  textAlign(CENTER);
  textSize(30);
  text('Congratulations you beat the game!', width / 2, height / 2 - 100);
  text('To restart, press any key', width / 2, height / 2 + 100);
  pop();

}

//defines what pressing a key does in each state
function keyPressed() {
  if (state === 'start') {
    state = 'simulation';
  }
}

function mousePressed(){
  if (state = 'simulation'){
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    responsiveVoice.speak(reverseAnimal);
  }
}

function guessAnimal(animal){
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
