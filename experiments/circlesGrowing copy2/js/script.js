"use strict";

let numCols = 40;
let numRows = 40;
let circles = [];
let state = [true,false];
let colour = [255,0];
let speed = [0.5,-0.5,1,-1];
let vx;
let vy;


function setup(){
  createCanvas(600,600);

  for (let i = 0; i<numCols; i++){
    let x = (width/numCols)*(i+0.5);
    let column = i;
    if (column%2 === 0){
      vy = -speed;
    }
    else{
      vy = speed;
    }
    for (let j = 0; j<numRows; j++){
      let y = (height/numRows)*(j+0.5);
      let row = j;
      if (row%2 === 0){
        vx = -random(-1,1);
      }
      else{
        vx = random(-1,1);
      }
      let circle = new Shape(x,y,10,false,true,10,0,vx,0,row,column);
      circles.push(circle);
    };
  };
}

function draw(){
  if (frameCount === 1){
    capturer.start();
  }
  background(255);

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

  if (frameCount < 60*2){
    capturer.capture(canvas);
  }
  else if (frameCount === 60){
    capturer.save()
    capturer.stop()
  }


}
