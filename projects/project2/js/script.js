/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let angle = 0;
let planets = [];
let suns = [];
let numSuns = 1;
let numPlanets = 1;

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
    let planet = new Planet(100);
    planets.push(planet);
  }

  //create the suns in the solar system
  for (let i = 0; i<numSuns; i++){
    let sun = new Planet(100);
    suns.push(sun);
  }
  
}


/**
Description of draw()
*/
function draw() {
  background(0);
  lights();
  noStroke();

  //display our planets
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];

    planet.display();
  }
}
