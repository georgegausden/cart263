// let mainHeading = document.getElementById(`main-heading`);
// let subHeading = document.getElementById(`sub-heading`);
let paragraph = document.getElementById(`paragraph`);
let originalText = paragraph.innerText;

paragraph.addEventListener(`mouseleave`,function(event){
  event.target.innerText = originalText;
})

paragraph.addEventListener(`mouseenter`,function(event){
  event.target.innerText = `SECRET MESSAGE`;
})
//
// mainHeading.addEventListener(`click`,setRedTextColor);
// subHeading.addEventListener(`click`,setRedTextColor);
// paragraph.addEventListener(`click`,setRedTextColor);
//
// function setRedTextColor(event){
//   event.target.style[`color`] = `#ff0000`;
// }
// paragraph.addEventListener(`click`,function(event){
//   paragraph.style[`background-color`] = `#ff0000`;
// });


// let paragraph = document.getElementById(`paragraph`);
// let opacity = 1;
//
// fadeOut();
//
// function fadeOut(){
//   opacity -= 0.01;
//   paragraph.style[`opacity`] = opacity;
//
//   if (opacity > 0){
//     requestAnimationFrame(fadeOut);
//   }
// }

// setTimeout(function() {
//   paragraph.style[`color`] = `#ff0000`;
// }, 3000);

//
// setInterval(blink,500);
//
// function blink(){
//   let opacity = paragraph.style[`opacity`];
//
//   if (opacity === `1`){
//     paragraph.style[`opacity`] = `0`;
//   }
//   else {
//     paragraph.style[`opacity`] = `1`;
//   }
// }
