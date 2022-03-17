/**
The Planets
George Gausden

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = 'arrived';
let angle = 0;
let planets = [];
let stars = [];
let numStars = 2000;
let inTransitBackground = 0;
let backgroundFadeSpeed = 3;
let speed;
let suns = [];
let numSuns = 1;
let numPlanets = 5;
let landscapes = [];
let numLandscapeAssets = 5;
let cameraProperties = {
  x:0,
  y:0,
  z:0,
  speed: 10,
}

/**
Description of preload
*/
function preload() {
  for (let i = 0; i<numLandscapeAssets; i++){
    let landscape = loadImage(`assets/images/landscape${i}.jpeg`);
    landscapes.push(landscape);
  }

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  createEasyCam();

  //create our planets in the solar system
  for (let i = 0; i<numPlanets; i++){
    let planet = new Planet(random(50,100),random(landscapes),random(1000,2000),random(100,200));
    planets.push(planet);
  }

  //create the suns in the solar system
  for (let i = 0; i<numSuns; i++){
    let sun = new Sun(100);
    suns.push(sun);
  }

  // Create an array of 1600 star objects
  for (var i = 0; i < numStars; i++) {
        stars[i] = new Star();

      // This also works to populate the array
        // star = new Star();
    // append(stars, star);
  }

}


/**
Description of draw()
*/
function draw() {

  if (state === 'inTransit'){
    inTransit();
  }
  else if (state === 'arrived'){
    arrived();
  }


}

// function setupCamera(){
//
//   //check if the user is moving the camera in the scene
//   if (keyCode === 87){
//     cameraProperties.y += cameraProperties.speed;
//   }
//   else if (keyCode === 83){
//     cameraProperties.y -= cameraProperties.speed;
//   }
//   else if (keyCode === 68){
//     cameraProperties.x += cameraProperties.speed;
//   }
//   else if (keyCode === 65){
//     cameraProperties.x -= cameraProperties.speed;
//   }
//
//   camera(cameraProperties.x,cameraProperties.y,(height/2)/(tan(PI/6)),0,0,0,0,1,0);
// }


//display what the user sees when they are in transit to their new solar system
function inTransit(){
  speed = map(mouseX, 0, width, 5, 100);

  //make the background colour climb after a certain time when the user has kept their mouse past a certain amount of the canvas
  if (frameCount > 100 && mouseX > 5*width/6){
    inTransitBackground += backgroundFadeSpeed;
  }

  if (inTransitBackground > 255){
    state = 'arrived';
  }

  background(inTransitBackground);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
  }
}

function arrived(){
  background(inTransitBackground);
  if (inTransitBackground > 0){
    inTransitBackground -= backgroundFadeSpeed;
  }
  // setupCamera();

  //add lighting to the scene
  pointLight(255,255,200,0,0,0);

  noStroke();

  //display our planets
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];

    planet.display();
    planet.drawPath();
    planet.move();
  }

  //display our suns
  for (let i = 0; i<suns.length; i++){
    let sun = suns[i];

    sun.display();
    sun.shine();
  }
}
