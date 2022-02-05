class EnemyQuidditchPlayer{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0.5;
    this.ay = 0.5;
    this.maxSpeed = 2;
    this.size = 50;
    this.immobilized = false;
    this.immobilizedTimer = 0;
    this.immobilizedTimerLength = 100;
  }

  display(){
    push();
    fill(255);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(){
    if (!this.immobilized){
      //make the enemy's character follow the user
      if (this.x < quidditchUser.x){
        this.vx += this.ax;
      }
      else if (this.x >= quidditchUser.x){
        this.vx -= this.ax;
      }

      if (this.y < quidditchUser.y){
        this.vy += this.ay;
      }
      else if (this.y >= quidditchUser.y){
        this.vy -= this.ay;
      }

      //add some randomness to the enemies movements
      let r = random(0,1);
      if (r<0.1){
        this.ax += 0.2;
        this.ay -= 0.1;
      }
      else if (r>0.95){
        this.ax -= 0.3;
        this.ay += 0.2;
      }

      this.x += this.vx;
      this.y += this.vy;

      //constrain the speeds
      this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
      this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
    }


  }

  wrap(){
    if (this.x >= width){
      this.x = 0;
    }
    else if (this.x < 0){
      this.x = width;
    }

    if (this.y >= height){
      this.y = 0;
    }
    else if (this.y <0){
      this.y = height;
    }
  }

  //the player has been touched by the spell, freeze for a few seconds
  immobulus(){
    this.immobilized = true;
    this.ax = 0;
    this.ay = 0;
    this.vx = 0;
    this.vy = 0;
  }

  //if the player has been immobilized, start a timer and defreeze the player after a few seconds
  wearOffImmobulus(){
    if (this.immobilized){
      this.immobilizedTimer += 1;

      if (this.immobilizedTimer >= this.immobilizedTimerLength){
        this.immobilized = false;
        this.immobilizedTimer = 0;
      }
    }
  }
}
