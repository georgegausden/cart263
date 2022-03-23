class Sun{
  constructor(size,fillR,fillG,fillB,distanceFromCenter,rotationalPeriod,selfRotationPeriod){
    this.x = 0;
    this.y = 0;
    this.size = size;
    this.fill = {
      r: fillR,
      g: fillG,
      b: fillB
    }
    this.distanceFromCenter = distanceFromCenter;
    this.rotationalPeriod = rotationalPeriod;
    this.selfRotationPeriod = selfRotationPeriod;
  }

  display(){
    push();
    fill(this.fill.r,this.fill.g,this.fill.b);
    translate(this.x,this.y);
    rotateZ(1/this.selfRotationPeriod*frameCount);
    sphere(this.size,40,40);
    pop();
  }

  move(){
    //get the planets to move in a circular orbit relative to the center of the solar system
    this.x = this.vx;
    this.y = this.vy;
    this.vx = this.distanceFromCenter*sin(1/this.rotationalPeriod*frameCount);
    this.vy = this.distanceFromCenter*cos(1/this.rotationalPeriod*frameCount);
  }

  shine(){
    // pointLight(250,250,250,0,0,0);
  }
}
