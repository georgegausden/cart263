/**

Bubble Popper++
George Gausden

Turns the index finger as seen through the webcam into a pin that can pop
a bubble that floats from the bottom of the screen to the top.

Uses:

ml5.js Handpose:
https://learn.ml5js.org/#/reference/handpose

*/

"use strict";

// Current state of program
let state = `loading`; // loading, running
// User's webcam
let video;

//load music
let bgMusic = undefined;
let popSFX = undefined;
// The name of our model
let modelName = `Handpose`;
// Handpose object (using the name of the model for clarity)
let handpose;
// The current set of predictions made by Handpose once it's running
let predictions = [];

let pins = [];
let numberPinsLeftSide = 20;
let numberPinsRightSide = 20;
let pinLength = 100;

let gameData = {
  highScore: 0
}

let bubblesSaved = 0;


// The bubble we will be popping
let bubble;
// The finger
let fingerY;

function preload(){
  bgMusic = loadSound(`assets/sounds/bgMusic.mp3`);
  popSFX = loadSound(`assets/sounds/popSFX.mov`);
}

/**
Starts the webcam and the Handpose, creates a bubble object
*/
function setup() {
  createCanvas(640, 480);

  //create all the pins in the game
  for (let i = 0; i<numberPinsLeftSide; i++){
    let x = width/9;
    let y = height/numberPinsLeftSide * (i+0.5);
    let tipx = (x + pinLength);
    let tipy = y;
    let side = 'left'

    let pin = new Pin(x,y,tipx,tipy,side);
    pins.push(pin);
  }

  for (let i = 0; i<numberPinsRightSide; i++){
    let x = 7*width/9;
    let y = height/numberPinsRightSide * (i+0.5);
    let tipx = x + pinLength;
    let tipy = y;
    let side = 'right';

    let pin = new Pin(tipx,y,x,tipy,side);
    pins.push(pin);
  }


  // Start webcam and hide the resulting HTML element
  video = createCapture(VIDEO);
  video.hide();

  //setup the data to be displayed on the screen
  let data = JSON.parse(localStorage.getItem('bubbles-popped-game-data'));

  if (data != null){
    gameData = data;
  }

  // Start the Handpose model and switch to our running state when it loads
  handpose = ml5.handpose(video, {
    flipHorizontal: true
  }, function() {
    // Switch to the running state
    state = `start`;
  });

  // Listen for prediction events from Handpose and store the results in our
  // predictions array when they occur
  handpose.on(`predict`, function(results) {
    predictions = results;
  });

  // Create our basic bubble
  bubble = new Bubble(width/2,height);
}

/**
Handles the two states of the program: loading, running
*/
function draw() {
  if (state === `loading`) {
    loading();
  }
  else if (state === 'start'){
    start();
  }
  else if (state === `running`) {
    running();
  }
  else if (state === `end`){
    end();
  }
}

/**
Displays a simple loading screen with the loading model's name
*/
function loading() {
  push();
  textSize(32);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(`Loading ${modelName}...`, width / 2, height / 2);
  pop();
}

/**
Displays the webcam.
If there is a hand it outlines it and highlights the tip of the index finger
*/
function running() {
  // Use these lines to see the video feed
  // const flippedVideo = ml5.flipImage(video);
  // image(flippedVideo, 0, 0, width, height);
  //check if the user has scored a point


  if (bubblesSaved > gameData.highScore){
    gameData.highScore = bubblesSaved;
    localStorage.setItem('bubbles-popped-game-data', JSON.stringify(gameData));
  }

  //play music
  if (!bgMusic.isPlaying()){
    bgMusic.play();
  }

  // Use this line to just see a black background. More theatrical!
  background(0);


  //display all the pins in the game
  for (let i = 0; i<pins.length; i++){
    let pin = pins[i];
    pin.display();
  }

  // Check if there currently predictions to display
  if (predictions.length > 0) {
    // If yes, then get the positions of the tip and base of the index finger
    updateFinger(predictions[0]);
  }

  // Handle the bubble's movement and display (independent of hand detection
  // so it doesn't need to be inside the predictions check)
  bubble.display();
  bubble.move();
  bubble.wrap();
  //check if the bubble touches one of the pins
  for (let i = 0; i<pins.length ;i++){
    let pin = pins[i];
    if (touching(pin,bubble)){
      //the bubble should pop
      if (!bubble.popped){
        popSFX.play();
      }
      bubble.popped = true;
      state = 'end';
    }
  }



}


/**
Updates the position of the pin according to the latest prediction
*/
function updateFinger(prediction) {

  fingerY = prediction.annotations.indexFinger[3][1];

  fingerY = map(fingerY, 0,height,0,width);

}

/**
Resets the bubble to the bottom of the screen in a new x position
*/
function resetBubble() {
  bubble.x = random(width);
  bubble.y = height;
}

/**
Moves the bubble according to its velocity
*/
function moveBubble() {
  bubble.x += bubble.vx;
  bubble.y += bubble.vy;
}

/**
Resets the bubble if it moves off the top of the canvas
*/
function checkOutOfBounds() {
  if (bubble < 0) {
    resetBubble();
  }
}



function keyPressed(){
  if (key === 'c'){
    localStorage.removeItem('bubbles-popped-game-data');
  }
}

function mousePressed(){
  if (state === `start`){
    state = `running`;
  }
}

function touching(object1,object2){
  let d = dist(object1.tipx, object1.tipy, object2.x, object2.y);
  if (d < object2.size / 2) {
    return true
  }
}

function start(){
  background(255);
  push();
  textAlign(CENTER);
  textSize(30);
  text('Bubble Popper++', width/2,height/9);
  pop();


  push();
  textAlign(CENTER);
  textSize(30);
  text(`Current high score: ${gameData.highScore}`, width/2,height/9+50);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  text(`Move your index finger\n up and down to move\n the ball left and right`, width/2,1.5*height/4);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  text(`Click to continue`, width/2,3*height/4);
  pop();


}

function end(){
  background(0);
  push();
  textAlign(CENTER);
  textSize(30);
  fill(255);
  text(`High Score: ${gameData.highScore}`, width/2,height/3);
  pop();

  push();
  textAlign(CENTER);
  textSize(30);
  fill(255);
  text(`Score: ${bubblesSaved}`, width/2,2*height/3);
  pop();


}
