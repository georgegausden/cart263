/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let numRect = 10;
let rects = [];

let p5Canvas;

/**
Description of setup
*/
function setup() {
  p5Canvas = createCanvas(1920,1080);
  frameRate(30);

  for (let i = 0; i<numRect; i++){
    let x = random(0,width);
    let y = random(0,height);
    let rectwidth = random(70,800);
    let rectheight = random(50,100);
    let vx = random(1,5);

    let rectangle = new Rectangle(x,y,rectwidth,rectheight,vx);
    rects.push(rectangle);

  }
}


/**
Description of draw()
*/
function draw() {
  if (frameCount === 1){
    capturer.start();
  }

  background(255);

  for (let i = 0; i<rects.length; i++){
    let rectangle = rects[i];
    rectangle.display();
    if (frameCount%17 === 0){
      rectangle.changePos();
    }
    rectangle.move();

  }



  capturer.capture(p5Canvas.canvas);
  if (frameCount === 1500){
    capturer.save()
    capturer.stop()
  }


}
