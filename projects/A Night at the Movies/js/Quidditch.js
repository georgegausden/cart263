//the code for the quidditch game

//function that calls all the functions in the quidditch game, loads the game
function quidditch(){
  //load the quidditchMusic
  if (themeSong.isPlaying()){
    themeSong.stop();
  }
  if (!quidditchMusic.isPlaying()){
    quidditchMusic.play();
  }

  push();
  imageMode(CENTER);
  image(quidditchBackground,width/2,height/2,width,height);
  pop();

  if (!loadQuidditch){
    //load the parameters in the game

    //load the hoops in the game
    for (let i = 0; i<numberOfHoops; i++){
      let hoop = new Hoop(width/9*(i+1),height/8*(i+1),100);
      hoops.push(hoop);
    }

    //load the user as a player
    quidditchUser = new Player();

    //load the golden snitch
    goldenSnitch = new GoldenSnitch(random(0,width/4),random(height/5,height/1.5));

    //close the loading function
    loadQuidditch = true;
  }


  // display the score
  displayScore();

  //load all the actions that happen in the game
  hoopActions();
  userActions();
  goldenSnitchActions();

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
    //hoop.move();
    hoop.wrap();
  }
}

function userActions(){
  quidditchUser.display();
  quidditchUser.move();
}

function goldenSnitchActions(){
  goldenSnitch.display();
  goldenSnitch.move();
  goldenSnitch.wrap();
}

// function to display the current quidditch score
function displayScore(){
  push();
  textSize(40);
  fill(0);
  text(quidditchScore, width/2, height/4);
  pop();
}
