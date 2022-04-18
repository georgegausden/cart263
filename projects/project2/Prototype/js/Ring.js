class Ring{
  constructor(x,y,ringRadius,tubeRadius,r,g,b,opacity){
    this.x = x;
    this.y = y;
    this.ringRadius = ringRadius;
    this.tubeRadius = tubeRadius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.opacity = opacity;
  }

  display(){
    push();
    translate(this.x,this.y);
    fill(this.r,this.g,this.b,this.opacity);
    ellipse(0,0,this.r);
    pop();
  }

  update(x,y){
    this.x = x;
    this.y = y;
  }
}
