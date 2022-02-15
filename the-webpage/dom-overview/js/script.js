let mainHeading = document.getElementById(`main-heading`);

// mainHeading.style.color = `#339966`;
// mainHeading.style.fontSize = `4rem`;
// mainHeading.style.fontFamily = `Courier, monospace`;
// mainHeading.style.backgroundColor = `red`;

mainHeading.innerText = `I feel great!`;

//change attributes like images
let image = document.getElementById(`clown-image`);

image.setAttribute(`src`,`http://loremflickr.com/320/240/clown`);


//change elements by class
let headers = document.getElementsByClassName(`header`);

for (let i = 0; i<headers.length; i++){
  let header = headers[i];

  header.style.color = `#ff0000`;
}

//get elements by tag name
let h2s = document.getElementsByTagName(`h2`);

for (let i = 0; i<h2s.length; i++){
  h2s[i].style.color = `#ff0000`
}

// let headers = document.querySelectorAll(`h1`);
//
// for (let i = 0; i<headers.length; i++){
//   headers[i].style.color = `#ff0000`
// }


let newP = document.createElement(`p`);

newP.innerText = `Gosh, I sure do like clowns`;

let clownSection = document.getElementById(`clown-section`);

clownSection.appendChild(newP);
