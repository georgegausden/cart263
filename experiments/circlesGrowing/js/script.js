"use strict";

let numCols = 100;
let numRows = 60;
let circles = [];
let state = [true,false];
let colour = [255,0];
let speed = [0.5,-0.5,1,-1];
let vx;
let vy;
let maxSpeed = 3;

let gifLength = 1300;
let canvas;
let p5Canvas;


function setup(){
  p5Canvas = createCanvas(1920,1080);
  frameRate(30);



  for (let i = 0; i<numCols; i++){
    let x = (width/numCols)*(i+0.5);
    let column = i;
    if (column%2 === 0){
      vy = -speed/5;
    }
    else{
      vy = speed/5;
    }
    for (let j = 0; j<numRows; j++){
      let y = (height/numRows)*(j+0.5);
      let row = j;
      if (row%2 === 0){
        vx = -random(-maxSpeed,maxSpeed)/5;
      }
      else{
        vx = random(-maxSpeed,maxSpeed)/5;
      }
      let circle = new Shape(x,y,10,false,true,10,random(colour),vx,0,row,column);
      circles.push(circle);
    };
  };


}

function draw(){
  if (frameCount === 1){
    capturer.start();
  }

  background(255);
  // capturer.start();


  for (let i = 0; i<circles.length; i++){
    let circle = circles[i];
    circle.checkMouse();
    circle.checkBooleans();
    circle.display();
    circle.move();
    circle.bounce();

    // circle.grow();
    // circle.shrink();

  }

  capturer.capture(p5Canvas.canvas);
  if (frameCount === 600){
    capturer.save()
    capturer.stop()
  }




}
