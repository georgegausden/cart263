class Shape{
  constructor(x,y,index,maxSize,rotationThing,thisR,thisG,thisB){
    this.x = x;
    this.y = y;
    this.size = 0;
    this.growthRate = 6;
    this.index = index;
    this.processusDone = false;
    this.r = thisR;
    this.g = thisG;
    this.b = thisB;
    this.maxSize = maxSize;

    this.topX= undefined;
    this.topY= undefined;
    this.leftX= undefined;
    this.leftY= undefined;
    this.rightX= undefined;
    this.rightY= undefined;
    this.bottomX= undefined;
    this.bottomY = undefined;
    this.rotationThing = rotationThing;

  }

  display(){
    push();
    fill(this.r,this.g,this.b);
    noStroke();
    translate(width/2,height/2);
    // rotate(this.rotationThing*1/100*frameCount);
    circle(this.x,this.y,this.size);
    // rectMode(CENTER);
    // translate(width/2,height/2);

    // rect(this.x,this.y,this.size,this.size);
    pop();
  }

  move(){
    this.x += this.rotationThing*2*sin(1/100*frameCount);
  }

  update(){
    //grow the circle
    if (this.size < this.maxSize){
      this.grow();
    }
    else if (this.size >= this.maxSize || this.touchingOtherCircle()){
      if (!this.processusDone){
        this.topLeftX= this.x - this.maxSize/2;
        this.topLeftY= this.y - this.maxSize/2;
        this.topRightX= this.x + this.maxSize/2;
        this.topRightY= this.y - this.maxSize/2;
        this.bottomLeftX= this.x - this.maxSize/2;
        this.bottomLeftY= this.y + this.maxSize/2;
        this.bottomRightX= this.x + this.maxSize/2;
        this.bottomRightY = this.y + this.maxSize/2;

        if (counter<maxCounts){
          createNewCircle(this.topLeftX,this.topLeftY,this.maxSize,this.rotationThing,this.r,this.g,this.b);
          createNewCircle(this.topRightX,this.topRightY,this.maxSize,this.rotationThing,this.r,this.g,this.b);
          createNewCircle(this.bottomLeftX,this.bottomLeftY,this.maxSize,this.rotationThing,this.r,this.g,this.b);
          createNewCircle(this.bottomRightX,this.bottomRightY,this.maxSize,this.rotationThing,this.r,this.g,this.b);
          counter += 4;
        }

        this.processusDone = true;
      }

      // if (frameCount > 350){
      //   this.move();
      // }

    }
    // //
    // // //check if the circle touches one of the boundaries
    // if ((this.touchesCanvasBorder() || this.touchingOtherCircle())){
    //   //create a new circle shape
    //   // createNewCircle();
    //   if (!this.processusDone){
    //
    //     this.processusDone = true;
    //   }
    //   // this.processusDone = true;
    // }
    // else{
    //   this.grow();
    // }
  }

  touchesCanvasBorder(){

    if (this.x+this.size/2 >= width || this.x-this.size/2 <= 0){
      return true
    }
    else if (this.y+this.size/2 >= height || this.y-this.size/2 <= 0){
      return true
    }
  }

  touchingOtherCircle(){
    for (let i = 0; i<circles.length; i++){
      if (i!=this.index){
        let circle = circles[i];


        let d = dist(circle.x,circle.y,this.x,this.y);

        if (d<=this.size/2+circle.size/2){
          return true
        }

      }
    }
  }
  //
  // createNewCircle(){
  //   let x = random(0,width);
  //   let y = random(0,height);
  //   let length = circles.length;
  //
  //   let circle = new Shape(x,y,length+1);
  //   circles.push(circle);
  // }

  grow(){
    this.size += this.growthRate;
  }
}
