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

  display(){
    if (!this.popped){
      push();
      noStroke();
      fill(150, 150, 250, 200);
      ellipse(this.x, this.y, this.size);
      pop();
    }
  }

  move(){
    this.x = fingerY;
    this.y += this.vy - bubblesSaved;

    //constrain speed
    this.vx = constrain(this.vx, -this.maxSpeed,this.maxSpeed);
    this.vy = constrain(this.vy, -this.maxSpeed,this.maxSpeed);

    //add some randomness to the movement to make it more difficult
    let r = random(0,1);
    if (r<0.2){
      this.vx += random(-1,1);
    }

  }

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

  pushed(){
    if (bubble.x > pin.tip.x){
      this.vx = -this.vx + 10;
    }
    else if (bubble.x <= pin.tip.y){
      this.vx =  -this.vx - 10;
    }


  }


}
