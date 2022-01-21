//the code for the quidditch game

//function that calls all the functions in the quidditch game, loads the game
function quidditch(){
  background(255);

  if (!loadQuidditch){
    //load the parameters in the game
    for (let i = 0; i<numberOfHoops; i++){
      let hoop = new Hoop(random(width,2*width),random(0,height),100);
      hoops.
    }
  }

  hoops();

}

// function that checks if the user has flown through one of the hoops
function checkThrough(){

}

function hoops(){
  for (let i = 0; i<hoops.length; i++){
    let hoop = hoops[i];
    hoop.display();
    hoop.move();
  }
}
