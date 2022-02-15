class Shape {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 20;
    this.fill = 0;
    this.vx = 1;
    this.vy = 1;
  }

  checkBooleans(){
    if (this.increase === false && this.decrease === false){
      this.increase = true
    }
  }
  display(){
    push();
    noStroke();
    fill(this.fill);
    circle(this.x,this.y,this.size);
    pop();
  }

  grow(){
    if (this.increase){
      this.size += this.stepSize;
    };

    this.size = constrain(this.size, this.minSize, this.maxSize);

    if (this.size === this.maxSize){
      this.increase = false;
      this.decrease = true;
    }
  }

  shrink(){
    if (this.decrease){
      this.size -= this.stepSize;
    };

    this.size = constrain(this.size, this.minSize, this.maxSize);

    if (this.size === this.minSize){
      this.decrease = false;
      this.increase = true;
    }
  }

  checkMouse(){
    let d = dist(this.x,this.y,mouseX,mouseY)/10;

    this.size += 1/(d+1);

    this.size = constrain(this.size, this.minSize, this.maxSize);

  }

  move(){

    this.x += this.vx;
    this.y += this.vy;



  //   this.vx += sin(this.ax);
  //   this.vy += sin(this.ay);
   }

  bounce(){

    if (this.y >= height){
      this.vy = -this.vy;
    }
    else if (this.y < 0){
      this.vy = -this.vy;
    }

    if (this.x >= width){
      this.vx = -this.vx;
    }
    else if (this.x < 0){
      this.vx = -this.vx;
    }
  }


}
