/**
Spy Profile Generator
George Gausden

Generates a randomized spy profile for the user, and password protects it.
*/

"use strict";

let spyProfile = {
  name: `**REDACTED**`,
  alis: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`
}

let instrumentData = undefined;
let objectData = undefined;
let tarotData = undefined;
/**
Description of preload
*/
function preload() {
  tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
  instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
  objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);

}



/**
Description of setup
*/
function setup() {
  createCanvas(windowWidth,windowHeight);

  let data = JSON.parse(localStorage.getItem('spy-profile-data'));

  if (data !== null){

    //ask for the password
    let password = prompt(`Agent! What is your password?`);
    if (password === data.password){
      spyProfile.name = data.name;
      spyProfile.alias = data.alias;
      spyProfile.secretWeapon = data.secretWeapon;
      spyProfile.password = data.password;
    }

  }
  else{
    generateSpyProfile();
  }

}

function generateSpyProfile(){
  spyProfile.name = prompt('Agent! What is your name?');

  let instrument = random((instrumentData.instruments))
  spyProfile.alis = `The ${instrument}`;

  spyProfile.secretWeapon = random(objectData.objects);

  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);

  //save the spy profile

  localStorage.setItem('spy-profile-data', JSON.stringify(spyProfile));
}

/**
Description of draw()
*/
function draw() {
  background(255);

  let profile = `** SPY PROFILE! DO NOT DISTRIBUTE **

  Name: ${spyProfile.name}
  Alias: ${spyProfile.alis}
  Secret Weapon: ${spyProfile.secretWeapon}
  Password: ${spyProfile.password}`;

  push();
  textFont('Courier, monospace');
  textSize(24);
  textAlign(LEFT,TOP);
  text(profile, 100, 100);
  pop();
}
