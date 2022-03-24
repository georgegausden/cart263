"use strict";

let shapes = [];
let numLines = 100;
let camera;


function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
  camera = createEasyCam();

  for (let i = 0; i<numLines; i++){
    let shapeX = 0;
    let shapeY = 0;
    let shapeZ = 0;
    let opacity = 255/numLines;

    let shape = new Shape(shapeX,shapeY,shapeZ,opacity,i);
    shapes.push(shape);
  }

}

function draw(){
  background(0);

  for (let i = 0; i<shapes.length; i++){
    let shape = shapes[i];
    shape.display();
  }

}
