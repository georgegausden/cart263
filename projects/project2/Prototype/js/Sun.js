class Sun{
  constructor(size,fillR,fillG,fillB,distanceFromCenter,rotationalPeriod,selfRotationPeriod,landscape,initialPhase){
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
    this.landscape = landscape;
    this.initialPhase = initialPhase;
  }

  //display the sun on the screen
  display(){
    push();
    texture(this.landscape);
    translate(this.x,this.y);
    rotateZ(1/this.selfRotationPeriod*frameCount);
    sphere(this.size,40,40);
    pop();
  }

  //move the sun around the solar system
  move(){
    //get the planets to move in a circular orbit relative to the center of the solar system
    this.x = this.vx;
    this.y = this.vy;
    angleMode(RADIANS);
    this.vx = this.distanceFromCenter*sin(1/this.rotationalPeriod*frameCount+this.initialPhase);
    this.vy = this.distanceFromCenter*cos(1/this.rotationalPeriod*frameCount+this.initialPhase);
  }
}
