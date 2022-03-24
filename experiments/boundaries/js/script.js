"use strict";

let numCircles = 4;
let circles = [];

let minR = 100
let minG = 100
let minB = 0
let maxR = 255
let maxG = 200
let maxB = 0
let p5Canvas;

function setup(){
  p5Canvas = createCanvas(1920,1920);
  frameRate(30);


  for (let i = 0; i<numCircles; i++){
    let x = random(0,width);
    let y = random(0,width);
    let fillR = random(minR,maxR);
    let fillG = random(minG,maxG);
    let fillB = random(minB,maxB);

    let circle = new Shape(x,y,i,fillR,fillG,fillB);
    circles.push(circle);
  }
}

function draw(){
  if (frameCount === 1){
    capturer.start();
  }

  background(255,0,0);

  for (let i = 0; i<circles.length; i++){
    let circle = circles[i];

    circle.display();
    circle.update();
  }


  capturer.capture(p5Canvas.canvas);
  if (frameCount === 1500){
    capturer.save()
    capturer.stop()
  }
}

function createNewCircle(){
  let x = random(0,width);
  let y = random(0,height);
  let fillR = random(minR,maxR);
  let fillG = random(minG,maxG);
  let fillB = random(minB,maxB);
  let index = circles.length;

  let circle = new Shape(x,y,index,fillR,fillG,fillB);
  circles.push(circle);
}
