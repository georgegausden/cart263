class GoldenSnitch{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 3;
    this.vy = 3;
    this.size = 30;
    this.maxSpeed = 5;
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;

    let r = random(0,1);
    if (r > 0.6){
      this.vx += random(0,1);
      this.vy -= random(0,1);
    }
    else if (r < 0.5){
      this.vx -= random(0,1);
      this.vy += random(0,1);
    }

    this.vx = constrain(this.vx, -this.maxSpeed, this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed, this.maxSpeed);
  }

  display(){
    push();
    imageMode(CENTER);
    image(goldenSnitchImage,this.x,this.y,this.size,this.size);
    pop();
  }

  wrap(){
    if (this.x > width){
      this.x = 0;
    }
    else if (this.x <= 0){
      this.x = width;
    }

    if (this.y > height){
      this.y = 0
    }
    else if (this.y <= 0){
      this.y = height
    }
  }

}
