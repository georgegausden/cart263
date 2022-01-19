/**
A Night at the Movies
George Gausden

Harry Potter!
*/

"use strict";

let bg = 0;

/**
Description of preload
*/
function preload() {

}


/**
Description of setup
*/
function setup() {

  createCanvas(500,500);

  if (annyang){
    let commands = {
      'wingardium leviosa': levitate,
      'lumos': lumos,
    };

    annyang.addCommands(commands);
    annyang.start();
  }
}


/**
Description of draw()
*/
function draw() {
  background(bg);
}
