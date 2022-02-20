class Couldron{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.potionsInside = [];
  }

  display(){
    push();
    fill(0,255,0);
    circle(this.x,this.y,this.size);
    pop();
  }

  checkContents(){
    //check if the potions inside match the recipe required
  }
}
