class Player{
  constructor(){
    this.x = width/6;
    this.y = height/2;
    this.vy = 2;
    this.size = 50;
  }

  move(){
    //let the user move up and down
    if (keyCode === 83 && this.y + this.size/2 <= height){
      this.y += this.vy;
    }
    else if (keyCode === 87 && this.y - this.size/2 >= 0){
      this.y -= this.vy;
    }
    else if (this.y === 0 || this.y === height){
      this.y = this.y;
    }
  }

  display(){
    push();
    fill(0);
    circle(this.x,this.y,this.size);
    pop();
  }


}
