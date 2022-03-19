class Moon{
  constructor(size,landscape,distanceFromCenter,rotationalPeriod,selfRotationPeriod,initialPhase){
    this.size = size;
    this.landscape = landscape;
    this.x = 0;
    this.y = 0;
    this.vx = undefined;
    this.vy = undefined;
    this.vz = undefined;
    this.distanceFromCenter = distanceFromCenter;
    this.rotationalPeriod = rotationalPeriod;
    this.selfRotationPeriod = selfRotationPeriod;
    this.phase = initialPhase;
    this.angle = angle;
  }

  display(){
    push();
    texture(this.landscape);
    translate(this.x,this.y,this.z);
    rotateZ(1/this.selfRotationPeriod*frameCount);
    sphere(this.size,40,40);
    pop();
  }

  move(planetX,planetY){
    //get the planets to move in a circular orbit relative to the center of the planet
    this.x = this.vx+planetX;
    this.y = this.vy+planetY;
    this.z = this.vz;
    this.vx = this.distanceFromCenter*sin(1/this.rotationalPeriod*frameCount+this.phase);
    this.vy = this.distanceFromCenter*cos(1/this.rotationalPeriod*frameCount+this.phase);
    this.vz = this.distanceFromCenter*cos(1/this.rotationalPeriod*frameCount+this.phase);
  }

  drawPath(planetX,planetY){
    //draw the path of the planet with an ellipse
    push();
    noFill();
    stroke(255,0,255,100);
    translate(planetX,planetY);
    rotateX(mouseX);
    ellipseMode(CENTER);
    ellipse(0,0,2*this.distanceFromCenter,2*this.distanceFromCenter,50);
    pop();
  }

}
