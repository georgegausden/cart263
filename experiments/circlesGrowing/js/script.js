"use strict";

let numCols = 40;
let numRows = 40;
let circles = [];
let state = [true,false];
let colour = [255,0];
let speed = [0.5,-0.5,1,-1];
let vx;
let vy;

let gifLength = 1300;
let canvas;


function setup(){
  var p5Canvas = createCanvas(600,600);
  canvas = p5Canvas.canvas;



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
        vx = -random(-1,1)/5;
      }
      else{
        vx = random(-1,1)/5;
      }
      let circle = new Shape(x,y,10,false,true,10,0,vx,0,row,column);
      circles.push(circle);
    };
  };
  background(255);

}

function draw(){
  capturer.start();


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
  //
  if (frameCount < gifLength){
    capturer.capture(canvas);
  }
  else if (frameCount === gifLength){
    capturer.stop();
    capturer.save();
  }




}
