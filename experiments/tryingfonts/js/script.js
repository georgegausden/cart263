/**
Title of Project
Author Name

This is a template. You must fill in the title,
author, and this description to match your project!
*/

"use strict";

let grid = [];
let chars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
let numRows = 30;
let numCols = 30;

let p5Canvas;

/**
Description of setup
*/
function setup() {
  p5Canvas = createCanvas(800,800);
  frameRate(30);


  for (let i = 0; i<numRows; i++){
    for (let j = 0; j<numCols; j++){
      let letter = random(chars);
      let x = width/(numCols)*j;
      let y = height/(numRows)*i;
      let rate = Math.floor(random(1,3));

      let letterObj = new Letter(letter,x,y,rate);
      grid.push(letterObj);
    }
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

  for (let i = 0; i<grid.length; i++){
    let letter = grid[i];
    letter.display();
    letter.changeLetter();
    letter.increaseOpacity();
  }

  capturer.capture(p5Canvas.canvas);
  if (frameCount === 300){
    capturer.save()
    capturer.stop()
  }


}
