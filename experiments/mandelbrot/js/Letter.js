class Rectangle {
  constructor(x,y,rectwidth,rectheight,vx){
    this.x = x;
    this.y = y;
    this.width = rectwidth;
    this.height = rectheight;
    this.vx = vx;
  }

  display(){
    push();
    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

  changePos(){
    this.x = random(0,width);
    this.y = random(0,height);
  }

  move(){
    this.x += this.vx;
  }
}
