//the code for the quidditch game

//function that calls all the functions in the quidditch game, loads the game
function quidditch(){
  background(255);

  if (!loadQuidditch){
    //load the parameters in the game

    //load the hoops in the game
    for (let i = 0; i<numberOfHoops; i++){
      let hoop = new Hoop(random(width,2*width),random(0,height),100);
      hoops.push(hoop);
    }

    //load the user as a player
    quidditchUser = new Player();

    //close the loading function
    loadQuidditch = true;
  }


  // display the score
  displayScore();

  //load all the actions that happen in the game
  hoopActions();
  userActions();

  //check if the user passes through one of the hoops
  for (let i = 0; i<hoops.length; i++){
    let hoop = hoops[i];
    //if user passes through, collect a point
    if (passesThrough(quidditchUser,hoop) && hoop.passedThrough === false){
      quidditchScore += 1
      hoop.passedThrough = true;
    };
  }


}

// function that checks if the user has flown through one of the hoops
function passesThrough(user,hoop){
  let d = dist(user.x,user.y,hoop.x,hoop.y);

  if (d < hoop.size){
    return true;
  };
}

function hoopActions(){
  for (let i = 0; i<hoops.length; i++){
    let hoop = hoops[i];
    hoop.display();
    hoop.move();
    hoop.wrap();
  }
}

function userActions(){
  quidditchUser.display();
  quidditchUser.move();
}

// function to display the current quidditch score
function displayScore(){
  push();
  textSize(40);
  fill(0);
  text(quidditchScore, width/2, height/4);
  pop();
}
