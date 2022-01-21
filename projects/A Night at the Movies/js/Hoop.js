class Hoop {
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 3;
    this.passedThrough = false;
  }

  display(){
    push();
    noFill();
    strokeWeight(2);
    stroke(0);
    circle(this.x,this.y,this.size);
    pop();
  }

  // move the hoop to the left of the canvas
  move(){
    this.x -= this.vx;
  }

  wrap(){
    if (this.x < 0){
      this.x = width;
      this.y = random(0,height);
      this.passedThrough = false;
    }
  }
}
