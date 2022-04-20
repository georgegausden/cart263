/**
The Planets
George Gausden

An interactive solar system model
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
let numSuns = 5;
let typesOfSuns = [[255,0,0,255],[0,0,255,255],[200,200,255,255],[225,200,0,255]];
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
  x:0,
  y:0,
  z:0,
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
  for (let i = 0; i<numLandscapeAssets; i++){
    let landscape = loadImage(`assets/images/planets/landscape${i}.jpeg`);
    landscapes.push(landscape);
  }
  for (let i = 0; i<numSunLandscapes; i++){
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
  createCanvas(1000,800,WEBGL);

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

  //create the background night sky for our choosing page
  nightSkyChoosing = createGraphics(3000,3000);
  nightSkyChoosing.background(0);
  nightSkyChoosing.fill(255);
  nightSkyChoosing.stars = [];
  for (let i = 0; i<numNightSkyStars; i++){
    nightSkyChoosing.circle(random(0,3000),random(0,3000),random(0,5));
  }


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
      let moon = new Moon(random(2,5),random(landscapes),random(100,200),random(100,600),random(0,50),random(-100,100));
      planet.moons.push(moon);
    }
  }

  //create the suns in the solar system
  for (let i = 0; i<numSuns; i++){
    let size = random(100,200);

    let landscape = random(sunLandscapes);
    let initialPhase = 0;

    let distanceFromCenter = 0;
    let rotationalPeriod;

    if (numSuns === 1){
      distanceFromCenter = 0;
      rotationalPeriod = random(100,1000);
    }
    else{
      rotationalPeriod = 300;
      initialPhase = 2*PI/numSuns*i;
      distanceFromCenter = 500;
    }


    let selfRotationPeriod = random(100,1000);

    let sun = new Sun(size,fill.r,fill.g,fill.b,distanceFromCenter,rotationalPeriod,selfRotationPeriod,landscape,initialPhase);
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

  if (!bgMusic.isPlaying()){

    bgMusic.play();
    bgMusic.setVolume(0.5);
  }

  if (state === 'inTransit'){
    inTransit();
  }
  else if (state === 'arrived'){
    arrived();
  }
  else if (state === 'choose'){
    choose();
  }

}

//display what the user sees when they are in transit to their new solar system
function inTransit(){
  //get current mouseX position
  // speed = map(mouseX, 0, width, 0, 100);
  inTransitFrameCounter += 1;
  speed += 0.2;
  cameraAngle += 0.0001;

  // cameraAngle = mouseX;
  // cameraAngle = map(cameraAngle,0,width,0,0.5);
  camera.rotateZ(cameraAngle);

  //make the background colour climb after a certain time when the user has kept their mouse past a certain amount of the canvas
  if (inTransitFrameCounter > 400){
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

}

function arrived(){

  cameraCounter += 1;
  //make sure the camera is back to a normal angle
  if (!cameraReset){
    camera.reset();
    cameraReset = true;
  }


  background(inTransitBackground);
  if (inTransitBackground > 0){
    inTransitBackground -= backgroundFadeSpeed;
  }

  // pointLight(255,255,255,0,0,0);





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
    planet.createClouds();
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

  //move the camera up to show the whole solar system, then go back down
  if (cameraCounter <= 200){
    let center = [0,0,3000];
    camera.setCenter(center,200);

  }
  else{
    if (!viewingPlanets){
      camera.setCenter([0,0,0],200);
      push();
      textSize(40);
      fill(255);
      stroke(sunTextFill);
      text(`Press the right arrow key to view a planet`,0,2*height/6);
      pop();
    }
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
    if (typingSFX.isPlaying()){
      typingSFX.stop();
    }

    viewingPlanets = true;



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

  if (keyCode === 38 && state === 'choose' && pickingPlanetNumber){
    if (numPlanetsChosen < 12){
      numPlanetsChosen += 1;
    }
  }
  else if (keyCode === 40 && state === 'choose' && pickingPlanetNumber){
    if (numPlanetsChosen > 2){
      numPlanetsChosen -= 1;
    }
  }

  if (keyCode === 38 && state === 'choose' && pickingSunNumber){
    if (numSunsChosen < 3){
      numSunsChosen += 1;
    }
  }
  else if (keyCode === 40 && state === 'choose' && pickingSunNumber){
    if (numSunsChosen > 1){
      numSunsChosen -= 1;
    }
  }

  if (keyCode === 13 && pickingPlanetNumber && state === 'choose'){
    pickingPlanetNumber = false;
    pickingSunNumber = true;
  }

  if (keyCode === 13 && pickingSunNumber && state === 'choose'){
    fadeChoosingBg = true;
  }

  if (keyCode === 13 && state === 'choose'){
    enteredSolarSystemCreation = true;
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

function choose(){
  choosingBackground();
  // background(choosingBg);

  if (fadeChoosingBg){
    choosingBg -= 1;
  }

  if (choosingBg <= -100){
    choosingPlanetY -= 1;
  }

  if (choosingPlanetY <= -300){
    generateNewSolarSystem();
  }
  if (!enteredSolarSystemCreation){
    push();
    textSize(40);
    fill(255/2*sin(frameCount/100)+255/2);
    text(`create a new solar system`,0,0);
    pop();

    push();
    textSize(20);
    fill(255/2*sin(frameCount/100)+255/2);
    text(`press enter to continue`,0,40);
    pop();
  }


  if (enteredSolarSystemCreation && !pickingSunNumber){
    pickingPlanetNumber = true;
  }

  if (pickingPlanetNumber){
    push();
    textSize(30);

    fill(255/2*sin(frameCount/100)+255/2);

    text(`pick how many planets you'd like`,0,-90);
    pop();

    push();
    textSize(25);
    fill(255/2*sin(frameCount/100)+255/2);
    text(`use the up and down arrow keys`,0,-40);
    pop();

    push();
    textSize(20);
    fill(255/2*sin(frameCount/100)+255/2);
    text(`once you've chosen, press enter`,0,10);
    pop();

    push();
    noStroke();
    translate(0,choosingPlanetY);
    rotateZ(1/100*frameCount);
    rotateX(1/200*frameCount);
    texture(choosingPlanetImg);
    sphere(numPlanetsChosen*5,24,24);
    pop();

    numPlanetsChosen = constrain(numPlanetsChosen,2,12);

    push();
    textSize(30);
    fill(255/2*sin(frameCount/100)+255/2);
    text(`${numPlanetsChosen}`,0,200);
    pop();
  }

  if (pickingSunNumber){
    push();
    textSize(30);
    if (fadeChoosingBg){
      fill(choosingBg);
    }
    else{
      fill(255/2*sin(frameCount/100)+255/2);
    }
    text(`pick how many suns you'd like`,0,-90);
    pop();

    push();
    textSize(25);
    if (fadeChoosingBg){
      fill(choosingBg);
    }
    else{
      fill(255/2*sin(frameCount/100)+255/2);
    }
    text(`use the up and down arrow keys`,0,-40);
    pop();

    push();
    textSize(20);
    if (fadeChoosingBg){
      fill(choosingBg);
    }
    else{
      fill(255/2*sin(frameCount/100)+255/2);
    }
    text(`once you've chosen, press enter`,0,10);
    pop();

    push();
    noStroke();
    translate(0,choosingPlanetY);
    rotateZ(1/100*frameCount);
    rotateX(1/200*frameCount);
    texture(sunLandscapes[0]);
    sphere(numSunsChosen*10,24,24);
    pop();

    numSunsChosen = constrain(numSunsChosen,1,3);

    push();
    textSize(30);
    if (fadeChoosingBg){
      fill(choosingBg);
    }
    else{
      fill(255/2*sin(frameCount/100)+255/2);
    }
    text(`${numSunsChosen}`,0,200);
    pop();

  }

}

function generateNewSolarSystem(){

  //generate all the new planets
  numPlanets = numPlanetsChosen;
  planets = [];

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

  //load all the data for the planets before starting up the program
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];
    planet.loadPlanetData();
  }

  numSuns = numSunsChosen;
  suns = [];

  //create the suns in the solar system
  for (let i = 0; i<numSuns; i++){
    let size = random(100,200);

    let landscape = random(sunLandscapes);
    let initialPhase = 0;

    let distanceFromCenter = 0;
    let rotationalPeriod;

    if (numSuns === 1){
      distanceFromCenter = 0;
      rotationalPeriod = random(100,1000);
    }
    else{
      rotationalPeriod = 300;
      initialPhase = 2*PI/numSuns*i;
      distanceFromCenter = 500;
    }


    let selfRotationPeriod = random(100,1000);

    let sun = new Sun(size,fill.r,fill.g,fill.b,distanceFromCenter,rotationalPeriod,selfRotationPeriod,landscape,initialPhase);
    suns.push(sun);
  }




  state = 'inTransit';
}

function choosingBackground(){
  //create a bunch of circles that light and dim
  push();
  texture(nightSkyChoosing);
  rotateY(1/1000*frameCount);
  rotateX(1/1000*frameCount);
  sphere(5000,50,50);
  pop();
}
