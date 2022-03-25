class Planet{
  constructor(size,landscape,distanceFromStar,rotationalPeriod,selfRotationPeriod,numMoons,initialPhase,index,numRings){
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
    this.clouds = [];
    this.numClouds = 0;
    this.cloudsCreated = false;
    this.rings = [];
    this.numRings = numRings;
    this.ringsCreated = false;

  }

  display(){
    push();
    texture(this.landscape);
    translate(this.x,this.y);
    rotateZ(1/this.selfRotationPeriod*frameCount);
    sphere(this.size,40,40);
    pop();

    this.cloudActions();
    this.ringActions();
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
    // fill(250,205,188,10);
    noFill();
    stroke(250,205,188);
    ellipseMode(CENTER);
    translate(0,0,this.index)
    ellipse(0,0,2*this.distanceFromStar,2*this.distanceFromStar,50);
    pop();
  }

  updateViewing(){
    if (counter-1 != this.index){
      this.beingViewed = false;
    }
  }

  createClouds(){
    if (!this.cloudsCreated){
      for (let i = 0; i<this.numClouds;i++){
        let opacity = random(1,10);
        let rotationSpeed = random(-10,10);
        let height = random(1,1.6);
        let cloud = new Cloud(this.size,height,this.x,this.y,opacity,rotationSpeed);
        this.clouds.push(cloud);
      }
      this.cloudsCreated = true;
    }
  }

  cloudActions(){
    for (let i = 0; i<this.clouds.length; i++){
      let cloud = this.clouds[i];
      cloud.update(this.x,this.y);
      cloud.display();

    }
  }

  createRings(){
    if (!this.ringsCreated){
      for (let i = 0; i<this.numRings; i++){
        let x = this.x;
        let y = this.y;
        let ringRadius = random(0,20);
        let tubeRadius = random(1,20);
        let r = random(100,200);
        let g = random(100,200);
        let b = random(100,200);
        let opacity = random(0,200);

        let ring = new Ring(x,y,ringRadius,tubeRadius,r,g,b,opacity);
        this.rings.push(ring);
      }
    }
  }

  ringActions(){
    for (let i = 0; i<this.rings.length; i++){
      let ring = this.rings[i];
      ring.display();
      ring.update(this.x,this.y);

    }
  }


}
