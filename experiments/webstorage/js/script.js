"use strict";

let clicks = 0;

let gameData = {
  highScore: 0
}

//the data is loaded on the domain

function setup(){
  createCanvas(windowWidth,windowHeight);

  let data = JSON.parse(localStorage.getItem('click-attack-game-data'));

  if (data != null){
    gameData = data;
  }
}

function draw(){

  background(255);

  push();
  textSize(40);
  text(clicks,width/2,height/2);
  pop();


  push();
  textAlign(LEFT,TOP);
  textSize(40);
  text('High Score: '+gameData.highScore,100,100);
  pop();

}

function mousePressed(){
  clicks += 1;

  if (clicks > gameData.highScore){
    gameData.highScore = clicks;
    localStorage.setItem('click-attack-game-data', JSON.stringify(gameData));
  }
}

function keyPressed(){
  if (key === 'c'){
    localStorage.removeItem('click-attack-game-data');

    //localStorage.clear() removes all the data of everything
  }
}
