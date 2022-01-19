class Player{
  constructor(){
    this.x = 0;
    this.y = height/2;
    this.vx = 1;
    this.vy = 1;
    this.size = 100;
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;
  }

  display(){
    push();
    fill(0);
    circle(this.x,this.y,this.size);
    pop();
  }
}
