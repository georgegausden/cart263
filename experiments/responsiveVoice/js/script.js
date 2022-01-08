"use strict";

function setup(){
  createCanvas(500,500);
}

function draw(){

  background(0);
}

function mousePressed(){
  responsiveVoice.speak("how are you today?", "UK English Male", {
    pitch: 2,
    rate: 1,
    volume: 1
  });
}
