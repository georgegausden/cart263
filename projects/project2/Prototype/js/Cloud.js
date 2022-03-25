class Cloud {
  constructor(size,height,x,y,opacity,rotationSpeed){
    this.x = x;
    this.y = y;
    this.size = size;
    this.opacity = opacity;
    this.height = height;
    this.rotationSpeed = rotationSpeed;
  }

  display(){
    push();
    fill(255,255,255,this.opacity);
    translate(this.x,this.y);
    sphere(this.size*this.height, 40,40);
    pop();
  }

  move(){

  }

  update(x,y){
    this.x = x;
    this.y = y;
  }
}
