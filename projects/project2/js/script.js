/**
The Planets
George Gausden

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let angle = 0;
let planets = [];
let suns = [];
let numSuns = 1;
let numPlanets = 1;
let landscape;
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
  landscape = loadImage(`assets/images/landscape1.jpeg`);
}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  createEasyCam();

  //create our planets in the solar system
  for (let i = 0; i<numPlanets; i++){
    let planet = new Planet(100,landscape);
    planets.push(planet);
  }

  //create the suns in the solar system
  for (let i = 0; i<numSuns; i++){
    let sun = new Planet(100,landscape);
    suns.push(sun);
  }

}


/**
Description of draw()
*/
function draw() {
  background(0);

  // setupCamera();
  lights();
  noStroke();

  //display our planets
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];

    planet.display();
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
