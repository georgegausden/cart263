class Snake {
  constructor(x,y){
    this.x = x
    this.y = y
    this.vx = 1;
    this.vy = 0;
  }

  display(){
    rectMode(CENTER);
    
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;
  }
}
