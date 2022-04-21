"use strict";

function setup(){
  createCanvas(500,500);
  background(0);
}

function draw(){


  push();
  fill(255);
  circle(mouseX,mouseY,50);
  pop();
}
