/**
The Planets
George Gausden

An interactive solar system model!
*/

"use strict";

//set the initial state of the game
let state = 'choose';

//set the background music
let bgMusic = undefined;

//SFX variables
let typingSFX = undefined;

//planet related variables
let planets = [];
let maxMoonsPerPlanet = 6;
let numPlanets = 5;
let landscapes = [];
let numLandscapeAssets = 21;

//background of solar system variables
let nightSky;
let nightSkyRotation = 0;
let nightSkyRotationSpeed = 0;
let numNightSkyStars = 1000;
let nightSkyChoosing;

//star related variables
let suns = [];
let numSuns = 1;
let typesOfSuns = [
  [255, 0, 0, 255],
  [0, 0, 255, 255],
  [200, 200, 255, 255],
  [225, 200, 0, 255]
];
let sunLandscapes = [];
let numSunLandscapes = 3;

//inTransit state related variables
let stars = [];
let numStars = 3000;
let inTransitBackground = 0;
let backgroundFadeSpeed = 3;
let speed = 0;
let inTransitFrameCounter = 0;

//text related variables
let transitText;
let sunTextFill = 255;
let programFont;
let digitalFont;

//camera related properties
let cameraProperties = {
  x: 0,
  y: 0,
  z: 0,
  speed: 10,
}
let camera;
let cameraAngle = 0;
let cameraStates = [];
let cameraCounter = 0;
let cameraStateCounter = 0;

//mouse clicked variable
let mouseClicked = false;
let mouseInsidePlane = false;

//booleans
let viewingPlanets = false;
let cameraReset = false;
let pickingPlanetNumber = false;
let pickingSunNumber = false;
let enteredSolarSystemCreation = false;
let fadeChoosingBg = false;

//creating a new solar system
let numPlanetsChosen = 2;
let numSunsChosen = 1;
let choosingPlanetImg = undefined;
let choosingPlanetY = 100;
let choosingBg = 255;

//load the data set for the planets
const PLANET_NAME_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/science/minor_planets.json`;
const ELEMENTS_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/science/elements.json`;
let planetNamesData;
let elementsData;

//loading screen variables
let loading = true;
let loadingCounter = 0;
let totalNumAssets = 30;


/**
Preload all the images used for the planets as well as music, fonts, sound effects...
*/
function preload() {
  for (let i = 0; i < numLandscapeAssets; i++) {
    let landscape = loadImage(`assets/images/planets/landscape${i}.jpeg`);
    landscapes.push(landscape);
  }
  for (let i = 0; i < numSunLandscapes; i++) {
    let landscape = loadImage(`assets/images/sunLandscape${i}.png`);
    sunLandscapes.push(landscape);
  }
  choosingPlanetImg = loadImage(`assets/images/choosingPlanet.jpg`);

  bgMusic = loadSound(`assets/sounds/score.mov`);
  typingSFX = loadSound(`assets/sounds/typingSFX.mov`);

  programFont = loadFont(`assets/fonts/ubuntu.ttf`);
  digitalFont = loadFont(`assets/fonts/digital-7.ttf`);

  //preload all the data for the planets
  planetNamesData = loadJSON(PLANET_NAME_DATA_URL);
  elementsData = loadJSON(ELEMENTS_DATA_URL);

}


/**
Setup the camera system, load all the objects (planets,moons,suns)
*/
function setup() {
  createCanvas(1000, 800, WEBGL);

  //create the camera and set the minimum/maximum distance
  camera = createEasyCam(p5.RendererGL);
  camera.setDistanceMin(500);
  camera.setDistanceMax(5000);

  //create the background night sky
  nightSky = createGraphics(3000, 3000);
  nightSky.background(0);
  nightSky.fill(255);
  nightSky.stars = [];
  for (let i = 0; i < numNightSkyStars; i++) {
    nightSky.circle(random(0, 3000), random(0, 3000), random(0, 5));
  }

  //create the background night sky for our choosing page
  nightSkyChoosing = createGraphics(3000, 3000);
  nightSkyChoosing.background(0);
  nightSkyChoosing.fill(255);
  nightSkyChoosing.stars = [];
  for (let i = 0; i < numNightSkyStars; i++) {
    nightSkyChoosing.circle(random(0, 3000), random(0, 3000), random(0, 5));
  }

  //set the font for the program
  textFont(programFont);
  textAlign(CENTER);

  // Create an array of 1600 star objects for the inTransit state
  for (var i = 0; i < numStars; i++) {
    stars[i] = new Star();
  }

}


/**
Plays the possible states in the game. Sets the bg music
*/
function draw() {

  if (!bgMusic.isPlaying()) {
    bgMusic.play();
    bgMusic.setVolume(0.5);
  }

  if (state === 'inTransit') {
    inTransit();
  } else if (state === 'arrived') {
    arrived();
  } else if (state === 'choose') {
    choose();
  }

}

//display what the user sees when they are in transit to their new solar system
function inTransit() {
  background(inTransitBackground);

  inTransitFrameCounter += 1;

  //increase the speed of the particles
  speed += 0.2;

  //change the angle of the camera dynamically
  cameraAngle += 0.0001;

  camera.rotateZ(cameraAngle);

  //make the background colour climb after a certain time
  if (inTransitFrameCounter > 400) {
    inTransitBackground += backgroundFadeSpeed;
  }

  //transition to the arrived state
  if (inTransitBackground > 255) {
    state = 'arrived';
  }

  //display the stars moving through space
  //this code was taken from http://bluegalaxy.info/codewalk/2018/01/04/p5-js-build-starfield/ the original code was by Chris Nielsen
  for (let i = 0; i < stars.length; i++) {
    stars[i].update(speed);
    stars[i].show();
  }

}

//display the planets, suns, rings... of the solar system
function arrived() {
  //fade the background
  background(inTransitBackground);
  if (inTransitBackground > 0) {
    inTransitBackground -= backgroundFadeSpeed;
  }

  //make sure the camera is back to a normal angle
  if (!cameraReset) {
    camera.reset();
    cameraReset = true;
  }

  cameraCounter += 1;

  //create the different camera states for our solar system
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    let cameraState = {
      center: [planet.x, planet.y, planet.z],
    }
    cameraStates.push(cameraState);
  }

  //set up the night sky and make it move depending on the mouse position
  nightSkyRotationSpeed = mouseX;
  nightSkyRotationSpeed = map(nightSkyRotationSpeed, 0, width, -0.001, 0.001);
  nightSkyRotation += nightSkyRotationSpeed;

  //display the night sky as a sphere
  push();
  texture(nightSky);
  rotateY(nightSkyRotation);
  sphere(5000, 50, 50);
  pop();


  //display our planets and our moons
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    planet.drawPath();
    planet.display();
    planet.move();
    planet.increaseOpacity();
    planet.reduceOpacity();

    for (let j = 0; j < planet.moons.length; j++) {
      let moon = planet.moons[j];
      moon.display();
      moon.move(planet.x, planet.y);
    }
  }

  //display our suns
  for (let i = 0; i < suns.length; i++) {
    let sun = suns[i];
    sun.display();
    sun.move();
  }

  //move the camera up to show the whole solar system, then go back down
  if (cameraCounter <= 200) {
    let center = [0, 0, 3000];
    camera.setCenter(center, 200);

  } else {
    if (!viewingPlanets) {
      camera.setCenter([0, 0, 0], 200);
      push();
      textSize(30);
      fill(255);
      stroke(sunTextFill);
      if (numSuns > 1) {
        text(`Press the right arrow key to view a planet`, 0, 0);
      } else {
        text(`Press the right arrow key to view a planet`, 0, 1.65 * height / 6);
      }

      pop();
    }
  }
}

//define what each key does in the program
function keyPressed() {
  //if we press the right arrow key, move to a planet
  if (keyCode === 39 && state === 'arrived') {
    if (typingSFX.isPlaying()) {
      typingSFX.stop();
    }

    viewingPlanets = true;

    let planet = planets[cameraStateCounter];

    //briefly stop the planet from moving
    planet.beingViewed = true;

    //make sure to stop other planets from being viewed
    for (let i = 0; i < planets.length; i++) {
      let planet = planets[i];

      if (cameraStateCounter != i) {
        planet.beingViewed = false;
      }
    }

    //set the camera's center as the planet's position
    let x = planet.x;
    let y = planet.y;
    let z = planet.z;

    let center = [x, y, z];

    camera.setCenter(center, 2000);
    camera.setDistance(planet.size * 10, 1000);
    camera.setDistanceMin(planet.size * 6);

    cameraStateCounter += 1;

    //if we reach the last planet, go back to the first
    if (cameraStateCounter === planets.length) {
      cameraStateCounter = 0;
    }
  }

  //if we press up or down, increase the number of planets chosen
  if (keyCode === 38 && state === 'choose' && pickingPlanetNumber) {
    if (numPlanetsChosen < 12) {
      numPlanetsChosen += 1;
    }
  } else if (keyCode === 40 && state === 'choose' && pickingPlanetNumber) {
    if (numPlanetsChosen > 2) {
      numPlanetsChosen -= 1;
    }
  }

  //if we press up or down, increase the number of suns chosen
  if (keyCode === 38 && state === 'choose' && pickingSunNumber) {
    if (numSunsChosen < 3) {
      numSunsChosen += 1;
    }
  } else if (keyCode === 40 && state === 'choose' && pickingSunNumber) {
    if (numSunsChosen > 1) {
      numSunsChosen -= 1;
    }
  }

  //if we press enter, change certain booleans
  if (keyCode === 13 && pickingPlanetNumber && state === 'choose') {
    pickingPlanetNumber = false;
    pickingSunNumber = true;
  }

  if (keyCode === 13 && pickingSunNumber && state === 'choose') {
    fadeChoosingBg = true;
  }

  if (keyCode === 13 && state === 'choose') {
    enteredSolarSystemCreation = true;
  }
}

//if we press the mouse, check if we are clicking a planet or if we're clicking the plane
function mousePressed() {

  //get current planet being viewed
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];

    if (planet.beingViewed) {
      let d = dist(width / 2, height / 2, mouseX, mouseY);

      if (d <= planet.size) {
        planet.clicked = true;
        console.log('clicked');
        console.log(planet.planeDisappear);
      }

      if (planet.mouseInsidePlane && planet.typingDone) {
        planet.planeClicked = true;

      }
    }
  }
}

//the choose state let's the user pick the number of planets/suns in the game
function choose() {
  choosingBackground();

  //fade the background if we've done certain things
  if (fadeChoosingBg) {
    choosingBg -= 1;
  }

  //change the position of the planet if we're done choosing
  if (choosingBg <= -100) {
    choosingPlanetY -= 1;
  }

  //generate the solar system when the planet has left the canvas
  if (choosingPlanetY <= -300) {
    generateNewSolarSystem();
  }

  //display all the information that the user can do stuff with
  if (!enteredSolarSystemCreation) {
    push();
    textSize(40);
    fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    text(`Create a new solar system`, 0, 0);
    pop();

    push();
    textSize(20);
    fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    text(`Press enter to continue`, 0, 40);
    pop();
  }

  if (enteredSolarSystemCreation && !pickingSunNumber) {
    pickingPlanetNumber = true;
  }

  if (pickingPlanetNumber) {
    push();
    textSize(30);

    fill(255 / 2 * sin(frameCount / 100) + 255 / 2);

    text(`Pick how many planets you'd like`, 0, -90);
    pop();

    push();
    textSize(25);
    fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    text(`Use the up and down arrow keys`, 0, -40);
    pop();

    push();
    textSize(20);
    fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    text(`Once you've chosen, press enter`, 0, 10);
    pop();

    push();
    noStroke();
    translate(0, choosingPlanetY);
    rotateZ(1 / 100 * frameCount);
    rotateX(1 / 200 * frameCount);
    texture(choosingPlanetImg);
    sphere(numPlanetsChosen * 5, 24, 24);
    pop();

    numPlanetsChosen = constrain(numPlanetsChosen, 2, 12);

    push();
    textSize(30);
    fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    text(`${numPlanetsChosen}`, 0, 200);
    pop();
  }

  if (pickingSunNumber) {
    push();
    textSize(30);
    if (fadeChoosingBg) {
      fill(choosingBg);
    } else {
      fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    }
    text(`Pick how many suns you'd like`, 0, -90);
    pop();

    push();
    textSize(25);
    if (fadeChoosingBg) {
      fill(choosingBg);
    } else {
      fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    }
    text(`Use the up and down arrow keys`, 0, -40);
    pop();

    push();
    textSize(20);
    if (fadeChoosingBg) {
      fill(choosingBg);
    } else {
      fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    }
    text(`Once you've chosen, press enter`, 0, 10);
    pop();

    push();
    noStroke();
    translate(0, choosingPlanetY);
    rotateZ(1 / 100 * frameCount);
    rotateX(1 / 200 * frameCount);
    texture(sunLandscapes[0]);
    sphere(numSunsChosen * 10, 24, 24);
    pop();

    numSunsChosen = constrain(numSunsChosen, 1, 3);

    push();
    textSize(30);
    if (fadeChoosingBg) {
      fill(choosingBg);
    } else {
      fill(255 / 2 * sin(frameCount / 100) + 255 / 2);
    }
    text(`${numSunsChosen}`, 0, 200);
    pop();
  }
}

//generate the solar system based on what the user has chosen
function generateNewSolarSystem() {
  //generate all the new planets
  numPlanets = numPlanetsChosen;
  planets = [];

  for (let i = 0; i < numPlanets; i++) {
    let planet = new Planet(random(20, 50), random(landscapes), random(1000, 4000), random(100, 600), random(100, 120), int(random(0, maxMoonsPerPlanet)), random(-100, 100), i, 2);
    planets.push(planet);
  }

  //create the moons in our solar system
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    for (let j = 0; j < planet.numMoons; j++) {
      //(size,landscape,distanceFromCenter,rotationalPeriod,selfRotationPeriod)
      let moon = new Moon(random(2, 5), random(landscapes), random(100, 200), random(100, 600), random(0, 100), random(-100, 100));
      planet.moons.push(moon);
    }
  }

  //load all the data for the planets before starting up the program
  for (let i = 0; i < planets.length; i++) {
    let planet = planets[i];
    planet.loadPlanetData();
  }

  numSuns = numSunsChosen;
  suns = [];

  //create the suns in the solar system
  for (let i = 0; i < numSuns; i++) {
    let size = random(100, 200);

    let landscape = random(sunLandscapes);
    let initialPhase = 0;

    let distanceFromCenter = 0;
    let rotationalPeriod;

    if (numSuns === 1) {
      distanceFromCenter = 0;
      rotationalPeriod = random(100, 1000);
    } else {
      rotationalPeriod = 300;
      initialPhase = 2 * PI / numSuns * i;
      distanceFromCenter = 500;
    }

    let selfRotationPeriod = random(100, 1000);

    let sun = new Sun(size, fill.r, fill.g, fill.b, distanceFromCenter, rotationalPeriod, selfRotationPeriod, landscape, initialPhase);
    suns.push(sun);
  }

  state = 'inTransit';
}

//create the background for the choosing page
function choosingBackground() {
  //create a bunch of circles that light and dim
  push();
  texture(nightSkyChoosing);
  rotateY(1 / 1000 * frameCount);
  rotateX(1 / 1000 * frameCount);
  sphere(5000, 50, 50);
  pop();
}
