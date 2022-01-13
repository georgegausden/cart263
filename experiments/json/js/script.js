"use strict";

let tarotData = undefined;
let fortune = undefined;


function setup(){
  createCanvas(windowWidth,windowHeight);
}

function draw(){

  background(255);

  
  push();
  textAlign(CENTER);
  fill(0);
  text(fortune,width/2,height/2);
  pop();

}

function mousePressed(){
  loadJSON('assets/data/tarot_interpretations.json', tarotLoaded);

}

function tarotLoaded(data){
  tarotData = data;

  let card = random(tarotData.tarot_interpretations);
  fortune = random(card.fortune_telling);


}
