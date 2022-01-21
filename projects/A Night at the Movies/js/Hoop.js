class Hoop {
  constructor(x,y,size){
    this.x = x;
    this.y = y;
    this.size = size;
    this.vx = 1;
  }

  display(){
    push();
    noFill();
    noStroke();
    circle(this.x,this.y,this.size);
    pop();
  }

  // move the hoop to the left of the canvas
  move(){
    this.x -= this.vx;
  }
}
