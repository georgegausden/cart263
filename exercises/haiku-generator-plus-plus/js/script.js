/**
Haiku Generator
George Gausden

A program that generates a random haiku based on pre-existing arrays
of lines of the correct syllable length. Also swaps out lines if the user
clicks on them with a fade in and out effect.
*/

"use strict";


// Our pre-made haiku lines
let haikuLines = {
  fiveSyllables: [
    `O, to be a tree`,
    `The cat does not know`,
    `We are all forests`,
    `You have done your best`,
    `They are all gone now`
  ],
  sevenSyllables: [
    `Say the things left unsaid`,
    `Never believe the wind's lies`,
    `The autumn stretches its legs`,
    `Nothing can satisfy you`,
    `They will not come back again`
  ]
};

let meowSFX = new Audio(`assets/sounds/meowSFX.mp3`);
let treeSFX = new Audio(`assets/sounds/treeSFX.mov`);
let bushesSFX = new Audio(`assets/sounds/bushesSFX.mov`);
let windSFX = new Audio(`assets/sounds/windSFX.mov`);
let shSFX = new Audio(`assets/sounds/shSFX.mp3`);



// Our three elements on the page that contain each line of the poem
let line1 = document.getElementById(`line-1`);
let line2 = document.getElementById(`line-2`);
let line3 = document.getElementById(`line-3`);

// Set up the starting lines
setupLines();
// Listen for clicks on each element and respond by changing them
addListeners();

/**
Puts a randomly chosen haiku line in each line of the poem in HTML
*/
function setupLines() {
  line1.innerText = random(haikuLines.fiveSyllables);
  line2.innerText = random(haikuLines.sevenSyllables);
  line3.innerText = random(haikuLines.fiveSyllables);
}

/**
Adds event listeners for changing each line of the poem
*/
function addListeners() {
  line1.addEventListener(`click`, changeLine);
  line2.addEventListener(`click`, changeLine);
  line3.addEventListener(`click`, changeLine);
}

//let the user control the background color using their finger as a colour picker
function pickBackgroundColor(){

}

//create a function to make the last lines letters fall slowly
function lettersFall(element){

}

//create a function to trigger different sounds
function wordSounds(element){
  //check if specific keywords are inside of the sentence
  //get the sentence
  let sentence = element.innerText;
  //an array to store all the words
  let words = sentence.split(" ");

  if (words.includes("cat")){
    meowSFX.play();
  }
  else if (words.includes("forests")){
    treeSFX.play();
  }
  else if (words.includes("tree")){
    bushesSFX.play();
  }
  else if (words.includes("wind's")){
    windSFX.play();
  }
  else if (words.includes("unsaid")){
    shSFX.play();
  }

}

//create a function to move the letters more and more
function increaseLetterSpacing(element, spacing){
  // increase the spacing between letters in the line
  spacing += 0.1;
  element.style[`letter-spacing`] = spacing+`px`;

  if (spacing < 10){
    //keep adding more spacing until they leave the canvas
    requestAnimationFrame(function(){
      increaseLetterSpacing(element,spacing);
    })
  }
  else{
    decreaseLetterSpacing(element,spacing);
  }
}

function decreaseLetterSpacing(element,spacing){
  // decrease the spacing between the letters in the line
  spacing -= 0.1;
  element.style[`letter-spacing`] = spacing+`px`;

  if (spacing > 1){
    requestAnimationFrame(function() {
      decreaseLetterSpacing(element, spacing);
    });
  }
}

/**
Triggers a fade out when a line is clicked
*/
function changeLine(event) {
  //pick a function randomly

  // increaseLetterSpacing(event.target,1);
  // fadeOut(event.target, 1);
  wordSounds(event.target);
}

/**
Reduces the opacity of the provided element until it reaches zero
then changes its line and triggers a fade in
*/
function fadeOut(element, opacity) {
  // Change the opacity of the line
  opacity -= 0.01;
  element.style[`opacity`] = opacity;
  // Check if the opacity is greater than 0...
  if (opacity > 0) {
    // If so, keep fading on the next frame
    // Note the use of an anonymous function here so we can pass
    // arguments to fadeOut()
    requestAnimationFrame(function() {
      fadeOut(element, opacity);
    });
  }
  else {
    // If not, we can switch lines and fade in...
    // Set a new line of poem for the element
    setNewLine(element);
    // Trigger a fade in
    fadeIn(element, 0);
  }
}

/**
Increases the opacity of the provided element until it reaches
1 and then stops.
*/
function fadeIn(element, opacity) {
  // Increase the opacity
  opacity += 0.01;
  element.style[`opacity`] = opacity;
  // Check if opacity is still less than 1
  if (opacity < 1) {
    // Keep fading. Note the use of an anonymous function here so we
    // can pass arguments to fadeIn()
    requestAnimationFrame(function() {
      fadeIn(element, opacity);
    });
  }
  else {
    // Do nothing - we're done!
  }
}

/**
Sets the text of the element to a randomly chosen haiku line, accounting for
syllables
*/
function setNewLine(element) {
  if (element === line1 || element === line3) {
    // If the element is line1 or line3, use five syllables
    element.innerText = random(haikuLines.fiveSyllables);
  }
  else {
    // If the element is line2 use seven
    element.innerText = random(haikuLines.sevenSyllables);
  }
}

/**
A helper function that returns a random element from the provided array
*/
function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}
