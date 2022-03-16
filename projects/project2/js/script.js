/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let angle = 0;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  createEasyCam();

  //create our planets in the solar system
  for (let i = 0; i<numPlanets; i++){
    
  }
}


/**
Description of draw()
*/
function draw() {
  background(0);
  lights();
  noStroke();
  rotateY(angle);
  sphere(100);
  angle+=0.1;
}
