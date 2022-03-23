class Planet{
  constructor(size,landscape,distanceFromStar,rotationalPeriod,selfRotationPeriod,numMoons,initialPhase,index){
    this.size = size;
    this.landscape = landscape;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vx = undefined;
    this.vy = undefined;
    this.distanceFromStar = distanceFromStar;
    this.rotationalPeriod = rotationalPeriod;
    this.selfRotationPeriod = selfRotationPeriod;
    this.numMoons = numMoons;
    this.moons = [];
    this.phase = initialPhase;
    this.beingViewed = false;
    this.currentFrame = undefined;
    this.index = index;
  }

  display(){
    push();
    texture(this.landscape);
    translate(this.x,this.y);
    rotateZ(1/this.selfRotationPeriod*frameCount);
    sphere(this.size,40,40);
    pop();
  }

  move(){
    //get the planets to move in a circular orbit relative to the center of the solar system
    this.x = this.vx;
    this.y = this.vy;

    if (!this.beingViewed){
      this.currentFrame = frameCount;
    }

    if (this.beingViewed){
      this.vx = this.distanceFromStar*sin(1/this.rotationalPeriod*this.currentFrame+this.phase);
      this.vy = this.distanceFromStar*cos(1/this.rotationalPeriod*this.currentFrame+this.phase);
    }
    else{
      this.vx = this.distanceFromStar*sin(1/this.rotationalPeriod*frameCount+this.phase);
      this.vy = this.distanceFromStar*cos(1/this.rotationalPeriod*frameCount+this.phase);
    }

  }

  drawPath(){
    //draw the path of the planet with an ellipse
    push();
    noFill();
    stroke(255,255,255);
    ellipseMode(CENTER);
    ellipse(0,0,2*this.distanceFromStar,2*this.distanceFromStar,50);
    pop();
  }

  updateViewing(){
    if (counter-1 != this.index){
      this.beingViewed = false;
    }
  }


}
