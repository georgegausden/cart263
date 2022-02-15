"use strict";

let gifLength = 180;
let canvas;



let numCircles = 10;
let circles = [];

function setup(){
  var p5Canvas = createCanvas(600,600);
  canvas = p5Canvas.canvas;

  for (let i  = 0; i<numCircles; i++){
    let circle = new Shape(width/2, height/(i+1)*i);
    circles.push(circle);
  }

}

function draw(){
  // capturer.start();
  background(255);



  //check the position of the circle
  for (let i = 0; i<circles.length; i++){
    let circle = circles[i];

    circle.display();
    circle.move();
    circle.bounce();
  }

  // if (frameCount < gifLength){
  //   capturer.capture(canvas);
  // }
  // else if (frameCount === gifLength){
  //   capturer.stop();
  //   capturer.save();
  // }




}
