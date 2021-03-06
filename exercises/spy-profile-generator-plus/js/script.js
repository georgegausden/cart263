"use strict";

/*****************

Spy Profile Generator
George Gausden

Asks the user for their name and generates a spy profile for them! Uses
JSON data to create the profile. Generates a password and requires that
password to view the profile when the program is loaded again.

Uses:

Darius Kazemi's corpora project:
https://github.com/dariusk/corpora/

******************/

// URLs to JSON data
const TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`;
const OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`;
const INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
const GENDER_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/genders.json`;
const COLOUR_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/crayola.json`;
const PROJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/governments/nsa_projects.json`;
// The key used to save and load the data for this program
const PROFILE_DATA_KEY = `spy-profile-data`;

// The spy profile data while the program is running
let spyProfile = {
  name: `**REDACTED**`,
  alias: `**REDACTED**`,
  secretWeapon: `**REDACTED**`,
  password: `**REDACTED**`,
  gender: `**REDACTED**`,
  favourite_colour:  `**REDACTED**`,
  secret_project: `**REDACTED**`
};
// Variables to store JSON data for generating the profile
let tarotData;
let objectsData;
let instrumentsData;
let genderData;
let colourData;
let projectData;
// The flashlight the user uses to see the paper
let flashlight = {
  radius: 300,
  fill: 255
};
// The soundtrack playing in the background
let spyMusic = undefined;
/**
Loads the JSON data used to generate the profile
*/
function preload() {
  tarotData = loadJSON(TAROT_DATA_URL);
  objectsData = loadJSON(OBJECT_DATA_URL);
  instrumentsData = loadJSON(INSTRUMENT_DATA_URL);
  genderData = loadJSON(GENDER_DATA_URL);
  colourData = loadJSON(COLOUR_DATA_URL);
  projectData = loadJSON(PROJECT_DATA_URL);

  spyMusic = loadSound(`assets/sounds/SpyMusic.mp3`);
}

/**
Creates a canvas then handles loading profile data, checking password,
and generating a profile as necessary.
*/
function setup() {

  // Create the canvas
  createCanvas(windowWidth, windowHeight);
  // Try to load the data
  let data = JSON.parse(localStorage.getItem(PROFILE_DATA_KEY));
  // Check if there was data to load
  if (data) {
    // If so, ask for the password
    let password = prompt(`What's ya password?`);
    // Check if the password is correct
    if (password === data.password) {
      // If is is, then setup the spy profile with the data
      setupSpyProfile(data);
    }
  }
  else {
    // If there is no data, generate a spy profile for the user
    generateSpyProfile();
  }
}

/**
Assigns across the profile properties from the data to the current profile
*/
function setupSpyProfile(data) {
  spyProfile.name = data.name;
  spyProfile.alias = data.alias;
  spyProfile.secretWeapon = data.secretWeapon;
  spyProfile.password = data.password;
  spyProfile.gender = data.gender;
  spyProfile.favourite_colour = data.colour;
  spyProfile.secret_project = data.project;
}

/**
Generates a spy profile from JSON data
*/
function generateSpyProfile() {
  // Ask for the user's name and store it
  spyProfile.name = prompt(`What's ya name?`);
  // Generate an alias from a random instrument
  spyProfile.alias = `The ${random(instrumentsData.instruments)}`;
  // Generate a secret weapon from a random object
  spyProfile.secretWeapon = random(objectsData.objects);
  // Generate a password from a random keyword for a random tarot card
  let card = random(tarotData.tarot_interpretations);
  spyProfile.password = random(card.keywords);
  // Generate a random gender from the genders list
  let category = random(genderData.genders);
  spyProfile.gender = category.gender;
  // Generate a random colour from the colours data
  let favourite_colour = random(colourData.colors);
  spyProfile.favourite_colour = favourite_colour.color;
  // Generate a random secret project from the NSA projects data
  let secret_project = random(projectData.codenames);
  spyProfile.secret_project = `PROJECT ${secret_project}`;
  // Save the resulting profile to local storage
  localStorage.setItem(PROFILE_DATA_KEY, JSON.stringify(spyProfile));
}

/**
Displays the current spy profile.
*/
function draw() {
  //start playing the spy music
  if (!spyMusic.isPlaying()){
    spyMusic.play();
  }

  background(0);

  push();
  fill(flashlight.fill);
  circle(mouseX,mouseY,flashlight.radius);
  //filter(BLUR,6);
  pop();

  // Generate the profile as a string using the data
  let spyText = `** TOP SECRET SPY PROFILE **

Name: ${spyProfile.name}
Alias: ${spyProfile.alias}
Secret Weapon: ${spyProfile.secretWeapon}
Password: ${spyProfile.password}
Gender: ${spyProfile.gender}
Favourite Colour: ${spyProfile.favourite_colour}
Mission: ${spyProfile.secret_project}`;

  // Display the profile
  push();
  textSize(32);
  textAlign(LEFT, TOP);
  textFont(`Courier, monospace`);
  fill(0);
  text(spyText, 0, 0);
  pop();

  // Generate the instructions to delete the information of the spy profile
  let instructions = `
  **SENSITIVE INFORMATION**

  TO DELETE SPY PROFILE DATA, PRESS THE DELETE KEY`;

  // Display the intructions
  push();
  textSize(25);
  textAlign(LEFT, TOP);
  textFont(`Courier, monospace`);
  fill(255,0,0);
  text(instructions, 0, 400);
  pop();
}

function keyPressed(){
  //delete the local storage data if the delete key is pressed on the keyboard
  if (keyCode === 8){
    localStorage.clear();
  }
}
