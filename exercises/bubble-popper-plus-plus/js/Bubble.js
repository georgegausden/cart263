class Bubble{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = -0.5;
    this.size = 20;
    this.maxSpeed = 2;
  }

  display(){
    push();
    noStroke();
    fill(150, 150, 250, 200);
    ellipse(this.x, this.y, this.size);
    pop();
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;

    //constrain speed
    this.vx = constrain(this.vx, -this.maxSpeed,this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed,this.maxSpeed);

    //add some randomness to the movement to make it more difficult
    let r = random(0,1);
    if (r<0.2){
      this.vx += random(-1,1);
    }

  }

  wrap(){
    if (this.y<0){
      this.y = height;
    }
  }




}
