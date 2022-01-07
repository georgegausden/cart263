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

let animalImages = [];
let animals = [];

let sausageDogImage;
let sausageDog;

let state = 'start';


/**
Description of preload
*/
function preload() {

  for (let i = 0; i<NUM_ANIMAL_IMAGES; i++){
    let animalImage = loadImage(`assets/images/animal${i}.png`);
    animalImages.push(animalImage);
  }
  sausageDogImage = loadImage('assets/images/sausage-dog.png');
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth, windowHeight);

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
  else if (state === 'end'){
    end();
  }

}


function start(){
  push();
  textAlign(CENTER);
  textSize(30);
  text('Press any key to continue',width/2,height/2);
  pop();
}

function simulation(){

  background(255,255,0);

  for (let i = 0; i<animals.length; i++){
    let animal = animals[i];

    animal.update();
  }

  sausageDog.update();


}

function end(){
  push();
  textAlign(CENTER);
  textSize(30);
  text('Congratulations you found him!',width/2,height/2);
  pop();
}

function keyPressed(){
  state = 'simulation';
}

function mousePressed(){
  sausageDog.mousePressed();
}
