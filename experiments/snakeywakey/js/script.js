"use strict";

let numRects = 1;
let rects = [];

let p5Canvas;


function setup(){
  p5Canvas = createCanvas(1920,1920);
  background(0);

  frameRate(30);



}

function draw(){
  // if (frameCount === 1){
  //   capturer.start();
  // }

  push();
  rectMode(CENTER);
  fill(255);
  rect(mouseX,mouseY,100,100);
  pop();


  capturer.capture(p5Canvas.canvas);
  // if (frameCount === 1500){
  //   capturer.save()
  //   capturer.stop()
  // }
}

function createNewRect(){
  let x = random(0,width);
  let y = random(0,height);
  let fillR = random(minR,maxR);
  let fillG = random(minG,maxG);
  let fillB = random(minB,maxB);
  let index = rects.length;
  let growthHeightFactor = random(1,4);
  let growthWidthFactor = random(1,4);
  let rectPalette = random(colourPalette);

  // for (let i = 0; i<rects.length; i++){
  //   let rectangle1 = rects[i];
  //
  //   let hit = collideRectRect(x, y, 0, 0, rectangle1.x, rectangle1.y, rectangle1.width, rectangle1.height);
  //
  //   if (hit){
  //
  //   }
  //   else{
  //
  //   }
  // }
  let rectangle = new Shape(x,y,index,fillR,fillG,fillB,growthWidthFactor,growthHeightFactor,rectPalette);
  rects.push(rectangle);
}

function borderStrokes(){
  push();
  stroke(0);
  strokeWeight(16);
  line(0,0,width,0);
  line(width,0,width,height);
  line(width,height,0,height);
  line(0,0,0,height);
  pop();
}
