class Planet{
  constructor(size,landscape,distanceFromStar,rotationalPeriod){
    this.size = size;
    this.landscape = landscape;
    this.x = 0;
    this.y = 0;
    this.vx = undefined;
    this.vy = undefined;
    this.distanceFromStar = distanceFromStar;
    this.rotationalPeriod = rotationalPeriod;
  }

  display(){
    push();
    texture(this.landscape);
    translate(this.x,this.y);
    sphere(this.size,40,40);
    pop();
  }

  move(){
    //get the planets to move in a circular orbit relative to the center of the solar system
    this.x = this.vx;
    this.y = this.vy;
    this.vx = this.distanceFromStar*sin(1/this.rotationalPeriod*frameCount);
    this.vy = this.distanceFromStar*cos(1/this.rotationalPeriod*frameCount);

  }


}
