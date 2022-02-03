class Immobulus {
  //a class to represent the immobulus spell that the user can use in the quidditch match

  constructor(x,y){
    this.xi = undefined;
    this.yi = undefined;
    this.xf = undefined;
    this.yf = undefined;
    this.x = undefined;
    this.y = undefined;
    this.size = 100;
    this.image = undefined;
    this.vx = undefined;
    this.vy = undefined;
    this.touchedEnemy = false;
    this.calculatedVelocities = false;

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
    fill(0);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(){
    //update the position of the particle
    this.x += this.vx;
    this.y += this.vy;
  }

  calculateVelocities(){
    //based on where the user clicks, calculate the x and y velocities. Try to normalize so that they always move in the same speed
    this.vx = (this.xf - this.xi) / this.time;
    this.vy = (this.yf - this.yi) / this.time;

    //once that's calculated, switch the boolean value
    this.calculatedVelocities = true;
  }

  



}
