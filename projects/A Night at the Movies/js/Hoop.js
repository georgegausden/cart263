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
    strokeWeight(4);
    stroke(240,212,83);
    circle(this.x,this.y,this.size);
    pop();

    push();
    strokeWeight(4);
    stroke(240,212,83)
    line(this.x,this.y+this.size/2,this.x,this.y+height);
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
