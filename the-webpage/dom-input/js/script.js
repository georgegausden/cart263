// let button = document.getElementById(`example-button`);
//
// button.addEventListener("click", function(event) {
//   // alert(`nice clicking`);
//   event.target.style[`display`] = `none`;
// })

// let textInput = document.getElementById(`example-text-input`);
// let button = document.getElementById(`example-submit`);
//
// button.addEventListener("click", function(event) {
//   let input = textInput.value;
//   alert(input);
// })
//
// textInput.addEventListener('keydown', function(event){
//   if (event.keyCode === 13){
//     let input = textInput.value;
//     alert(input);
//   }
// })

let slider = getElementById('example-slider');
let button = getElementById('check-button');

button.addEventListener("click", function(event) {
  let value = slider.value;
  alert(value);
})
