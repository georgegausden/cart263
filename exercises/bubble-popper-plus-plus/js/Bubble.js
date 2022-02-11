class Bubble{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = -1;
    this.size = 40;
    this.maxSpeed = 2;
    this.popped = false;
  }

  // displays the bubble on the screen
  display(){
    if (!this.popped){
      push();
      noStroke();
      fill(150, 150, 250, 200);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }

  // moves the bubble according to the finger position and it's velocity
  move(){
    this.x = fingerY;
    this.y += this.vy - bubblesSaved;

    //constrain speed
    this.vx = constrain(this.vx, -this.maxSpeed,this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed,this.maxSpeed);
  }

  //keeps the circle within the bounds of the canvas
  wrap(){
    if (this.y<0){
      //score a point also
      bubblesSaved += 1;
      this.y = height;
      //update the position of the pins
      for (let i = 0; i<pins.length; i++){
        let pin = pins[i];
        pin.update();
      }
    }
  }


}
