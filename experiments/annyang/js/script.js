"use strict";

let on = false;

function setup(){
  createCanvas(500,500);

  if (annyang){
    let commands = {
      'Turn the light on': function(){
        on = true
      },
      'Turn the light off': off
    };

    annyang.addCommands(commands);
    annyang.start();
  }
}

function draw(){
  //if on is true, make the background white
  if (on){
    background(255);
  }
  else{
    background(0);
  }

  fill(0);
  circle(width/2,height/2,100);

}

function off(){
  on = false;
}
