class Potion{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 100;
  }

  display(){
    push();
    fill(0);
    circle(this.x,this.y,this.size);
    pop();
  }
}
