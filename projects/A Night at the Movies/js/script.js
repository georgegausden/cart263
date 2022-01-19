/**
A Night at the Movies
George Gausden

Harry Potter!
*/

"use strict";

let bg = 0;

let book;


/**
Description of preload
*/
function preload() {

  book = loadModel(`assets/objects/book.obj`, false);

}


/**
Description of setup
*/
function setup() {

  createCanvas(500,500,WEBGL);

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
  background(255);

  scale(100);
  normalMaterial();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  model(book);
}
