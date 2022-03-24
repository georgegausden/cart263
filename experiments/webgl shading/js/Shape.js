class Shape{
  constructor(x,y,z,opacity,index){
    this.x = x;
    this.y = y;
    this.z = z;
    this.opacity = opacity;
    this.fillR = 255;
    this.fillG =255;
    this.fillB =255;
    this.width = 100;
    this.height = 100;
    this.index = index;
    this.distance = 4;
  }

  display(){
    push();
    fill(this.fillR,this.fillG,this.fillB,this.opacity);
    translate(0,0,this.index*this.distance*abs(sin(1/100*frameCount)));
    rotateZ(1/100*this.index/30*frameCount+this.index*50);
    plane(this.width,this.height,30,30);
    pop();
  }
}
