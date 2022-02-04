class Immobulus {
  //a class to represent the immobulus spell that the user can use in the quidditch match

  constructor(userX,userY,targetX,targetY){
    this.xi = userX;
    this.yi = userY;
    this.xf = targetX;
    this.yf = targetY;
    this.x = userX;
    this.y = userY;
    this.size = 50;
    this.image = undefined;
    this.vx = undefined;
    this.vy = undefined;
    this.time = undefined;
    this.touchedEnemy = false;
    this.calculatedVelocities = false;
    this.maxSpeed = 20;

  }

  launch(){
    //encapsulate all the functions
    this.display();
    if (!this.calculatedVelocities){
      this.calculateVelocities();
    }
    this.move();

  }

  display(){
    push();
    fill(255,0,0);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(){
    //update the position of the particle
    this.x += this.vx;
    this.y += this.vy;
  }

  calculateVelocities(){
    //calculate the distance of the target from the user
    let d = dist(this.x,this.y,this.xf,this.yf);
    //calculate the velocity using the distance
    this.time = d/(this.maxSpeed);
    //based on where the user clicks, calculate the x and y velocities. Try to normalize so that they always move in the same speed
    this.vx = (this.xf - this.xi) / this.time;
    this.vy = (this.yf - this.yi) / this.time;

    //once that's calculated, switch the boolean value
    this.calculatedVelocities = true;
  }





}
