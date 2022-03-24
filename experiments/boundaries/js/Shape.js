class Shape{
  constructor(x,y,index,fillR,fillG,fillB){
    this.x = x;
    this.y = y;
    this.size = 0;
    this.growthRate = 6;
    this.index = index;
    this.processusDone = false;
    this.r = 255;
    this.g = 255;
    this.b = 255;

  }

  display(){
    push();
    fill(this.r,this.g,this.b);
    noStroke();
    circle(this.x,this.y,this.size);
    pop();
  }

  update(){
    //grow the circle


    //check if the circle touches one of the boundaries
    if ((this.touchesCanvasBorder() || this.touchingOtherCircle())){
      //create a new circle shape
      // createNewCircle();
      if (!this.processusDone){
        createNewCircle();
        this.processusDone = true;
      }
      // this.processusDone = true;
    }
    else{
      this.grow();
    }
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
