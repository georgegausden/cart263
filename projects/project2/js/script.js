/**
The Planets
George Gausden

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";
let state = 'arrived';
let transitText;
let nightSky;
let nightSkyRotation = 0;
let nightSkyRotationSpeed = 0;
let numNightSkyStars = 1000;
let angle = 0;
let planets = [];
let maxMoonsPerPlanet = 6;
let stars = [];
let numStars = 5000;
let nightSkyImg = undefined;
let inTransitBackground = 0;
let backgroundFadeSpeed = 3;
let speed;
let suns = [];
let distanceBetweenStars = 1000;
let numSuns = 1;
let numPlanets = 20;
let landscapes = [];
let numLandscapeAssets = 5;
let cameraProperties = {
  x:0,
  y:0,
  z:0,
  speed: 10,
}
let camera;
let cameraStates = [];
let counter = 0;

/**
Description of preload
*/
function preload() {
  for (let i = 0; i<numLandscapeAssets; i++){
    let landscape = loadImage(`assets/images/landscape${i}.jpeg`);
    landscapes.push(landscape);
  }
  nightSkyImg = loadImage(`assets/images/nightSky.jpeg`);

}


/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight,WEBGL);
  camera = createEasyCam();
  camera.setDistanceMin(500);
  camera.setDistanceMax(5000);

  // camera.setCenter([0,0,4000],10000);




  nightSky = createGraphics(3000,3000);
  nightSky.background(0);
  nightSky.fill(255);
  nightSky.stars = [];
  for (let i = 0; i<numNightSkyStars; i++){
    nightSky.circle(random(0,3000),random(0,3000),random(0,5));
  }


  let transitTextSize = width/10000;
  let transitTextRes = 80;
  let transitTextDepth = 20;
  let transitTextBevelled = false;
  let transitTextFont = `Helvetica`;
  let transitTextStyle = `Bold`;
  transitText = createWord3D(`Move the cursor to the right of the screen`,transitTextDepth,transitTextSize,transitTextRes,transitTextBevelled,transitTextFont,transitTextStyle);



  //create our planets in the solar system
  for (let i = 0; i<numPlanets; i++){
    let planet = new Planet(random(20,50),random(landscapes),random(1000,4000),random(100,600),random(100,120),random(0,maxMoonsPerPlanet),random(-100,100));
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

  displayInTransitIntructions();
}

function arrived(){
  background(inTransitBackground);
  if (inTransitBackground > 0){
    inTransitBackground -= backgroundFadeSpeed;
  }

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


  // setupCamera();

  //add lighting to the scene
  // pointLight(255,255,200,0,0,0);

  noStroke();


  //display our planets
  for (let i = 0; i<planets.length; i++){
    let planet = planets[i];
    planet.display();
    planet.drawPath();
    planet.move();

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


  //
  // push();
  // texture(transitText);
  // angleMode(DEGREES);
  // // rotateY(instructionRotationZ);
  // translate(0,0,translationX);
  // plane(width,height);
  // // textFont('Helvetica');
  // // textSize(40);
  // // fill(255);
  // // text(`Move the cursor to the right of the screen`);
  // pop();
}

function keyPressed(){
  counter += 1;

  let planet = planets[counter];

  //briefly stop the planet from moving
  planet.beingViewed = true;

  let x = planet.x;
  let y = planet.y;
  let z = planet.z;

  let center = [x,y,z];




  camera.setCenter(center,1000);
}
