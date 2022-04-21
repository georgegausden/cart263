class NightStar{
  constructor(x,y,size,r,g,b){
    this.x = x;
    this.y = y;
    this.size = size;
    this.fillR = r;
    this.fillG = g;
    this.fillB = b;
  }

  display(){
    push();
    fill(this.fillR,this.fillG,this.fillB);
    circle(this.x,this.y,this.size);
    pop();
  }

}
