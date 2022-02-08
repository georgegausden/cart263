"use strict";

let numCols = 10;
let numRows = 10;
let circles = [];

function setup(){
  createCanvas(500,500);

  for (let i = 0; i<numCols; i++){
    let x = (width/numCols)*(i+0.5);
    for (let j = 0; j<numRows; j++){
      let y = (height/numRows)*(j+0.5);
      let r = random(0,1);
      
      if (r<0.5){
        let increase = true;
        let decrease = false;
      }
      else if (r >= 0.5){
        let increase = false;
        let decrease = true;
      }

      let circle = new Shape(x,y,20,increase,decrease);
      circles.push(circle);
    };
  };
}

function draw(){
  background(0);

  for (let i = 0; i<circles.length; i++){
    let circle = circles[i];

    circle.display();
    circle.grow();
    circle.shrink();

  }
}
