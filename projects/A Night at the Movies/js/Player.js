class Player{
  constructor(){
    this.x = width/6;
    this.y = height/2;
    this.vy = 0;
    this.vx = 0;
    this.ax = 0.5;
    this.ay = 0.5;
    this.maxSpeed = 7;
    this.size = 50;
    this.hasGoldenSnitch = false;
  }

  move(){
    //make the user's character follow the mouse
    if (this.x < mouseX){
      this.vx += this.ax;
    }
    else if (this.x >= mouseX){
      this.vx -= this.ax;
    }

    if (this.y < mouseY){
      this.vy += this.ay;
    }
    else if (this.y >= mouseY){
      this.vy -= this.ay;
    }

    //constrain the speeds
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

    this.x += this.vx;
    this.y += this.vy;
  }

  display(){
    push();
    fill(0);
    circle(this.x,this.y,this.size);
    pop();
  }

  checkWonPoint(){
    //check if the user has the snitch and passes through one of the hoops
    for (let i = 0; i<hoops.length; i++){
      let hoop = hoops[i];

      if (this.hasGoldenSnitch && passesThrough(quidditchUser,hoop)){
        quidditchScore += 1;
      }
    }

  }


}
