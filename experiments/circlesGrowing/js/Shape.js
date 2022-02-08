class Shape {
  constructor(x,y,size,increase,decrease){
    this.x = x;
    this.y = y;
    this.size = size;
    this.stepSize = 1;
    this.minSize = 10;
    this.maxSize = 60;
    this.increase = increase;
    this.decrease = decrease;
  }

  display(){
    push();
    fill(255);
    circle(this.x,this.y,this.size);
    pop();
  }

  grow(){
    if (this.increase){
      this.size += this.stepSize;
    };

    // this.size = constrain(this.size, this.minSize, this.maxSize);
  }

  shrink(){
    if (this.decrease){
      this.size -= this.stepSize;
    };

    // this.size = constrain(this.size, this.minSize, this.maxSize);
  }
}
