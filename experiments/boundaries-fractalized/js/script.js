"use strict";

let numCircles = 1;
let circles = [];

let minR = 100
let minG = 100
let minB = 0
let maxR = 255
let maxG = 200
let maxB = 0
let p5Canvas;

let counter = 0;
let maxCounts = 1364;
let divisionFactor = 2;

function setup(){
  p5Canvas = createCanvas(1920,1920);
  frameRate(30);

  let circle = new Shape(0,0,0,width/2,1,255,0,0);
  circles.push(circle);


  //
  // for (let i = 0; i<numCircles; i++){
  //   let x = random(0,width);
  //   let y = random(0,width);
  //   let fillR = random(minR,maxR);
  //   let fillG = random(minG,maxG);
  //   let fillB = random(minB,maxB);
  //
  //   let circle = new Shape(x,y,i,fillR,fillG,fillB);
  //   circles.push(circle);
  // }
}

function draw(){
  // if (frameCount === 1){
  //   capturer.start();
  // }

  background(0,0,0);

  for (let i = 0; i<circles.length; i++){
    let circle = circles[i];

    circle.display();
    circle.update();
  }


  // capturer.capture(p5Canvas.canvas);
  // if (frameCount === 350){
  //   capturer.save()
  //   capturer.stop()
  // }
}

function createNewCircle(x,y,previousMax,rotationThing,thisR,thisG,thisB){

  let circle = new Shape(x,y,1,previousMax/divisionFactor,-1*rotationThing,thisR*0.5,(thisG+5)*1.5,(thisB+10)*1.5);
  circles.push(circle);
}
