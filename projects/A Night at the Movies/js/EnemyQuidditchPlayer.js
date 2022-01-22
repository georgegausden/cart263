class EnemyQuidditchPlayer{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0.5;
    this.ay = 0.5;
    this.maxSpeed = 5;
    this.size = 50;
  }

  display(){
    push();
    fill(255);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(){
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
    if (r<0.2){
      this.ax += 0.2;
      this.ay -= 0.1;
    }
    else if (r>0.9){
      this.ax -= 0.3;
      this.ay += 0.2;
    }

    this.x += this.vx;
    this.y += this.vy;

    //constrain the speeds
    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);

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
}
