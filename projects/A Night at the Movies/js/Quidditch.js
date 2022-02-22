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

    //load the friendly players in the game
    for (let i = 0; i<numberOfQuidditchEnemies; i++){
      let friendlyPlayer = new FriendlyQuidditchPlayer(random(width/2,width),random(height/8,7*height/8));
      friendlyQuidditchPlayers.push(friendlyPlayer);
    }

    //load the user as a player
    quidditchUser = new Player();

    //load the golden snitch
    goldenSnitch = new GoldenSnitch(random(0,width/4),random(height/5,height/1.5));

    //close the loading function
    loadedQuidditch = true;

    quidditchEnemyWonTitlePosition = height/5 + fadeOutQuidditch;

    //add a point to the enemy score after a certain amount of time
    setTimeout(addEnemyPoint, 1000);
  }

  push();
  imageMode(CENTER);
  image(quidditchBackground,width/2,height/2,width,height);
  pop();

  mouse();

  if (quidditchUserWon){
    quidditchUserWinning();
  }
  else if (quidditchEnemyWon){
    quidditchEnemyWinning();
  }
  else {
    // display the score
    displayScore();
    checkWinner();

    //load all the actions that happen in the game
    hoopActions();
    userActions();
    spellActions();
    goldenSnitchActions();
    enemyPlayersActions();
    friendlyPlayersActions();
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
  quidditchUser.checkWonPoint();
  quidditchUser.wearOffImmobulus();
}

function spellActions(){

  for( let i = 0; i<quidditchSpells.length; i++){
    let spell = quidditchSpells[i];
    spell.launch();
    for (let j = 0; j<enemyQuidditchPlayers.length; j++){
      let enemy = enemyQuidditchPlayers[j];
      //check if the spell touches one of the enemy players
      if (checkTouch(spell,enemy) && (spell.provenance === 'user' || spell.provenance === 'friendly')){
        //immobilize the player for a certain amount of time
        let spellSFX = random(immobulusSFX);
        if (!spellSFX.isPlaying()){
          spellSFX.play();
        }
        enemy.immobulus();
        spell.touchedEnemy = true;
      }
      else if (checkTouch(spell,quidditchUser) && spell.provenance === 'enemy'){
        //immobilize the player for a certain amount of time
        let spellSFX = random(immobulusSFX);
        if (!spellSFX.isPlaying()){
          spellSFX.play();
        }
        quidditchUser.immobulus();
        spell.touchedEnemy = true;
      }
    }
  }




}

function enemyPlayersActions(){
  for (let i = 0; i<friendlyQuidditchPlayers.length; i++){
    let friendlyPlayer = friendlyQuidditchPlayers[i];
    friendlyPlayer.display();
    friendlyPlayer.move();
    friendlyPlayer.wrap();
    friendlyPlayer.wearOffImmobulus();

    let r = random(0,1);
    if (r > 0.995){
      //let the enemy player launch an immobilizing spell
      let spell = new Immobulus(friendlyPlayer.x,friendlyPlayer.y,random(0,width),random(0,height),'friendly');
      quidditchSpells.push(spell);
    }
  }



}

function friendlyPlayersActions(){
  for (let i = 0; i<enemyQuidditchPlayers.length; i++){
    let enemyPlayer = enemyQuidditchPlayers[i];
    enemyPlayer.display();
    enemyPlayer.move();
    enemyPlayer.wrap();
    enemyPlayer.wearOffImmobulus();

    let r = random(0,1);
    if (r > 0.995){
      //let the enemy player launch an immobilizing spell
      let spell = new Immobulus(enemyPlayer.x,enemyPlayer.y,random(0,width),random(0,height),'enemy');
      quidditchSpells.push(spell);
    }
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
  textFont(classicFont);
  textAlign(CENTER);
  fill(255);
  text(`Your team's score: ${quidditchUserScore}/5  Enemy team score: ${quidditchEnemyScore}/5`, width/2, height/8);
  pop();
}

//function to check if the spell touches an enemy
function checkTouch(spell,enemy){
  let d = dist(spell.x,spell.y,enemy.x,enemy.y);

  if (d < (spell.size/2 + enemy.size/2)){
    return true
  }
}

//a function to check if the user or the enemy won the game
function checkWinner(){
  if (quidditchUserScore === 5){
    quidditchUserWon = true;
  }
  else if (quidditchEnemyScore === 5){
    quidditchEnemyWon = true;
  }
}

//function to show when the user wins the quidditch match
function quidditchUserWinning(){
  if (!cheeringSFX.isPlaying()){
    cheeringSFX.play();
  }
  //display the text that the user won a new nimbus 2000!
  push();
  textAlign(CENTER);
  textFont(classicFont);
  fill(200,200,100);
  textSize(80);
  text(`Congratulations young wizard, you've just\n won yourself a brand new Nimbus 2000!`,width/2,height/5);
  pop();

  push();
  imageMode(CENTER);
  image(nimbus2000Image,width/2,1.2*height/2+3*sin(1/15*frameCount),800,400);
  pop();
}

function quidditchEnemyWinning(){
  //display the text that the user lost the match
  //fade the background to black
  background(0,0,0,0+fadeOutQuidditch);
  push();
  textAlign(CENTER);
  textFont(classicFont);
  fill(200,200,100);
  textSize(80);
  text(`Unfortunately, you have lost the quidditch match!\n Better luck next time young wizard.`,width/2,height/5 + fadeOutQuidditch);
  pop();

  //make the background fade to black and the title move downwards
  fadeOutQuidditch += 1;

}

function addEnemyPoint(){
  quidditchEnemyScore += 1;
  setTimeout(addEnemyPoint,enemyPointTimer);
}
