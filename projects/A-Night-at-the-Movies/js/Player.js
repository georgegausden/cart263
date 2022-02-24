class Player {
  constructor() {
    this.x = width / 6;
    this.y = height / 2;
    this.vy = 0;
    this.vx = 0;
    this.ax = 0.5;
    this.ay = 0.5;
    this.maxSpeed = 7;
    this.size = 50;
    this.hasGoldenSnitch = false;
    this.immobilized = false;
    this.immobilizedTimer = 0;
    this.immobilizedTimerLength = 100;
    this.image = quidditchPlayerImage;
  }

  //moves the player according to the position of the mouse
  move() {
    if (!this.immobilized) {
      //make the user's character follow the mouse
      if (this.x < mouseX) {
        this.vx += this.ax;
      } else if (this.x >= mouseX) {
        this.vx -= this.ax;
      }

      if (this.y < mouseY) {
        this.vy += this.ay;
      } else if (this.y >= mouseY) {
        this.vy -= this.ay;
      }

      //constrain the speeds
      this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
      this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

      this.x += this.vx;
      this.y += this.vy;
    }
  }

  //displays the user
  display() {
    push();
    fill(0);
    image(this.image, this.x, this.y, this.size + 20, this.size + 20);
    pop();

    if (this.vx > 0) {
      this.image = quidditchPlayerImageRight;
    } else if (this.vx <= 0) {
      this.image = quidditchPlayerImage;
    }
  }

  //checks if the user has scored a point
  checkWonPoint() {
    //check if the user passes through one of the hoops
    for (let i = 0; i < hoops.length; i++) {
      let hoop = hoops[i];
      //if user passes through, collect a point
      if (passesThrough(quidditchUser, hoop) && this.hasGoldenSnitch) {
        //play a sound to indicate they won a point
        cheeringSFX.play();
        quidditchUserScore += 1;

        //place the snitch at a random location
        goldenSnitch.x = random(0, width);
        goldenSnitch.y = random(0, height);

        //reset the position of the user
        this.x = 5 * width / 6;
        this.y = height / 2;
        //reset the position of the enemies
        for (let i = 0; i < enemyQuidditchPlayers.length; i++) {
          let enemyPlayer = enemyQuidditchPlayers[i];
          enemyPlayer.x = random(0, width / 2);
          enemyPlayer.y = random(height / 8, 7 * height / 8);
          enemyPlayer.immobilized = false;
        }
      }
    }
  }

  immobulus() {
    //immobilize the user since they've been hit
    this.immobilized = true;
  }


  //if the player has been immobilized, start a timer and defreeze the player after a few seconds
  wearOffImmobulus() {
    if (this.immobilized) {
      this.immobilizedTimer += 1;

      if (this.immobilizedTimer >= this.immobilizedTimerLength) {
        this.immobilized = false;
        this.immobilizedTimer = 0;
      }
    }
  }


}
