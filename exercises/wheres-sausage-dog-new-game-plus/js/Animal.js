class Animal{
  constructor(x,y,image){
    this.x = x;
    this.y = y;
    this.image = image;
    this.vx = random(-2,2);
    this.vy = random(-2,2);

    this.angle = 0;
  }

  update(){
    this.display();
    this.move();
    this.wrap();
  }

  display(){
    push();
    imageMode(CENTER);
    translate(this.x,this.y);
    rotate(this.angle);
    image(this.image,0,0);
    pop();
  }

  overlap(x,y){
    if (x > this.x - this.image.width/2 && x < this.x + this.image.width/2 && y > this.y - this.image.height/2 && y < this.y + this.image.height/2){
      return true
    }
  }

  move(){
    //make each animal move along the screen fairly slowly.
    this.x += this.vx;
    this.y += this.vy;
  }

  wrap(){
    //wrap the animal so they don't leave the frame
    if (this.x - this.image.width/2 > width){
      this.x = 0;
    }
    else if (this.x + this.image.width/2 < 0){
      this.x = width;
    }
    else if (this.y - this.image.height/2 > height){
      this.y = 0;
    }
    else if (this.y + this.image.height/2 < 0){
      this.y = height;
    }
  }
}
