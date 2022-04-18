/**
The Planets
George Gausden

An interactive solar system model
*/

"use strict";

//set the initial state of the game
let state = 'arrived';

//set the background music
let bgMusic = undefined;

//SFX variables
let typingSFX = undefined;

//planet related variables
let planets = [];
let maxMoonsPerPlanet = 6;
let numPlanets = 5;
let landscapes = [];
let numLandscapeAssets = 24;

//background of solar system variables
let nightSky;
let nightSkyRotation = 0;
let nightSkyRotationSpeed = 0;
let numNightSkyStars = 1000;

//star related variables
let suns = [];
let numSuns = 1;

//inTransit state related variables
let stars = [];
let numStars = 3000;
let inTransitBackground = 0;
let backgroundFadeSpeed = 3;
let speed;

//text related variables
let transitText;
let sunTextFill = 255;
let programFont;
let digitalFont;

//camera related properties
let cameraProperties = {
  x:0,
  y:0,
  z:0,
  speed: 10,
}
let camera;
let cameraAngle;
let cameraStates = [];
let cameraStateCounter = 0;

//mouse clicked variable
let mouseClicked = false;
let mouseInsidePlane = false;

//booleans
let viewingPlanets = false;
let cameraReset = false;

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
  for (let i = 0; i<numLandscapeAssets; i++){
    let landscape = loadImage(`assets/images/landscape${i}.jpeg`);
    landscapes.push(landscape);
  }
  bgMusic = loadSound(`assets/sounds/bgMusic.mp3`);
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
  createCanvas(windowWidth,windowHeight,WEBGL);

  //create the camera and set the minimum/maximum distance
  camera = createEasyCam(p5.RendererGL);
  camera.setDistanceMin(500);
  camera.setDistanceMax(5000);

  //create the background night sky
  nightSky = createGraphics(3000,3000);
  nightSky.background(0);
  nightSky.fill(255);
  nightSky.stars = [];
  for (let i = 0; i<numNightSkyStars; i++){
    nightSky.circle(random(0,3000),random(0,3000),random(0,5));
  }

  //create the text object that is displayed in the inTransit state
  let transitTextSize = width/10000;
  let transitTextRes = 80;
  let transitTextDepth = 20;
  let transitTextBevelled = false;
  let transitTextFont = `Helvetica`;
  let transitTextStyle = `Bold`;
  transitText = createWord3D(`Move the cursor to the right of the screen`,transitTextDepth,transitTextSize,transitTextRes,transitTextBevelled,transitTextFont,transitTextStyle);
  textFont(programFont);
  textAlign(CENTER);

  //create our planets in the solar system
  for (let i = 0; i<numPlanets; i++){
    let planet = new Planet(random(20,50),random(landscapes),random(1000,4000),random(100,600),random(100,120),int(random(0,maxMoonsPerPlanet)),random(-100,100),i,2);
    planets.push(planet);
  }

  //create the moons in our solar system
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];
    for (let j = 0; j<planet.numMoons; j++){
      //(size,landscape,distanceFromCenter,rotationalPeriod,selfRotationPeriod)
      let moon = new Moon(random(2,5),random(landscapes),random(100,200),random(100,600),random(0,100),random(-100,100));
      planet.moons.push(moon);
    }
  }

  //create the suns in the solar system
  for (let i = 0; i<numSuns; i++){
    let size = random(100,200);
    let fill = {
      r: random(200,255),
      g: 200,
      b: 0,
    };

    let distanceFromCenter = 0;

    if (numSuns === 1){
      distanceFromCenter = 0;
    }
    else{
      distanceFromCenter = 500;
    }

    let rotationalPeriod = random(100,1000);
    let selfRotationPeriod = random(100,1000);

    let sun = new Sun(size,fill.r,fill.g,fill.b,distanceFromCenter,rotationalPeriod,selfRotationPeriod);
    suns.push(sun);
  }

  // Create an array of 1600 star objects for the inTransit state
  for (var i = 0; i < numStars; i++) {
        stars[i] = new Star();
  }

  //load all the data for the planets before starting up the program
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];
    planet.loadPlanetData();
  }

}


/**
Plays the possible states in the game
*/
function draw() {

  if (state === 'inTransit'){
    inTransit();
  }
  else if (state === 'arrived'){
    arrived();
  }

}

//display what the user sees when they are in transit to their new solar system
function inTransit(){
  speed = map(mouseX, 0, width, 5, 100);
  cameraAngle = mouseX;
  cameraAngle = map(cameraAngle,0,width,0,0.1);
  camera.rotateZ(cameraAngle)
  //make the background colour climb after a certain time when the user has kept their mouse past a certain amount of the canvas
  if (frameCount > 100 && mouseX > 5*width/6){
    inTransitBackground += backgroundFadeSpeed;
  }

  if (inTransitBackground > 255){
    state = 'arrived';
  }

  background(inTransitBackground);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update(speed);
    stars[i].show();
  }

  displayInTransitIntructions();
}

function arrived(){
  //make sure the camera is back to a normal angle
  if (!cameraReset){
    camera.reset();
    cameraReset = true;
  }


  //setup the music in the background
  if (!bgMusic.isPlaying){
    bgMusic.play();
  }
  background(inTransitBackground);
  if (inTransitBackground > 0){
    inTransitBackground -= backgroundFadeSpeed;
  }

  // pointLight(255,255,255,0,0,0);

  if (!viewingPlanets){
    push();
    textSize(40);
    fill(sunTextFill);
    stroke(sunTextFill);
    text(`Press any key to view a planet`,0,1.5*height/6);
    pop();
  }


  sunTextFill -= 1;

  //make the background stars flicker
  for (let i = 0; i<nightSky.stars.length; i++){
    let star = nightSky.stars[i];
    star.display()
  }

  //set up the night sky
  nightSkyRotationSpeed = mouseX;
  nightSkyRotationSpeed = map(nightSkyRotationSpeed,0,width,-0.001,0.001);
  nightSkyRotation += nightSkyRotationSpeed;


  //create the different camera states for our solar system
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];

    let cameraState = {
      center: [planet.x,planet.y,planet.z],
    }
    cameraStates.push(cameraState);
  }

  push();
  texture(nightSky);
  rotateY(nightSkyRotation);
  sphere(5000,50,50);
  pop();


  noStroke();


  //display our planets
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];
    // planet.createClouds();
    // planet.createRings();

    planet.drawPath();
    planet.display();
    planet.move();
    planet.increaseOpacity();
    planet.reduceOpacity();



    // planet.updateViewing();

    for (let j = 0; j<planet.moons.length; j++){
      let moon = planet.moons[j];
      moon.display();
      // moon.drawPath(planet.x,planet.y);
      moon.move(planet.x,planet.y);
    }
  }

  //display our suns
  for (let i = 0; i<suns.length; i++){
    let sun = suns[i];

    sun.display();
    sun.move();
    sun.shine();
  }
}

function displayInTransitIntructions(){
  let translationX = mouseX;
  translationX = map(translationX, 0, width, 0, 1000);

  translate(0,0,translationX);

  transitText.show();
}

function keyPressed(){
  if (keyCode === 39 && state === 'arrived'){

    viewingPlanets = true;

    console.log(cameraStateCounter);

    let planet = planets[cameraStateCounter];

    //briefly stop the planet from moving
    planet.beingViewed = true;

    for (let i = 0; i<planets.length; i++){
      let planet = planets[i];

      if (cameraStateCounter!=i){
        planet.beingViewed = false;
      }
    }

    let x = planet.x;
    let y = planet.y;
    let z = planet.z;

    let center = [x,y,z];

    camera.setCenter(center,2000);
    camera.setDistance(planet.size*10,1000);
    camera.setDistanceMin(planet.size*6);


    cameraStateCounter += 1;

    if (cameraStateCounter === planets.length){
      cameraStateCounter = 0;
    }

    camera.attachMouseListeners(p5.RendererGL);
  }



}

function mousePressed(){

  //get current planet being viewed
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];

    if (planet.beingViewed){
      let d = dist(width/2,height/2,mouseX,mouseY);

      if (d <= planet.size){
        planet.clicked = true;
        console.log('clicked');
        console.log(planet.planeDisappear);
      }

      if (planet.mouseInsidePlane && planet.typingDone){
        planet.planeClicked = true;

      }
    }
  }




}
