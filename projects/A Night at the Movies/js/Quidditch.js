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

  mouse();

  console.log(quidditchSpells);
  //load all the parameters in the game
  if (!loadedQuidditch){
    //load the parameters in the game

    //load the hoops in the game
    for (let i = 0; i<numberOfHoops; i++){
      let hoop = new Hoop(width/9*(i+1),height/8*(i+1),100);
      hoops.push(hoop);
    }

    //load the enemies in the game
    for (let i = 0; i<numberOfQuidditchEnemies; i++){
      let enemyPlayer = new EnemyQuidditchPlayer(random(0,width/2),random(height/8,7*height/8));
      enemyQuidditchPlayers.push(enemyPlayer);
    }

    //load the user as a player
    quidditchUser = new Player();

    //load the golden snitch
    goldenSnitch = new GoldenSnitch(random(0,width/4),random(height/5,height/1.5));

    //close the loading function
    loadedQuidditch = true;
  }


  // display the score
  displayScore();

  //load all the actions that happen in the game
  hoopActions();
  userActions();
  spellActions();
  goldenSnitchActions();
  enemyPlayersActions();



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
  quidditchUser.checkWonPoint();
}

function spellActions(){
  //load the spells launched
  if (quidditchSpells.length > 0){
    for( let i = 0; i<quidditchSpells.length; i++){
      let spell = quidditchSpells[i];
      spell.launch();
    }

  }
}

function enemyPlayersActions(){
  for (let i = 0; i<enemyQuidditchPlayers.length; i++){
    let enemyPlayer = enemyQuidditchPlayers[i];
    enemyPlayer.display();
    enemyPlayer.move();
    enemyPlayer.wrap();

  }
}

function goldenSnitchActions(){
  goldenSnitch.display();
  goldenSnitch.move();
  goldenSnitch.wrap();

  //check to see if the user touches the golden snitch
  if (snitchCaught(quidditchUser,goldenSnitch)){
    goldenSnitch.caught();
    quidditchUser.hasGoldenSnitch = true;
  }
  else{
    quidditchUser.hasGoldenSnitch = false;
  }
}

function snitchCaught(user,snitch){
  let d = dist(user.x,user.y,snitch.x,snitch.y);

  if (d < snitch.size/2){
    return true
  }
}

// function to display the current quidditch score
function displayScore(){
  push();
  textSize(40);
  fill(0);
  text(quidditchScore, width/2, height/4);
  pop();
}
