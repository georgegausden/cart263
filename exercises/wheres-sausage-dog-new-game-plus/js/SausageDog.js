class SausageDog extends Animal{
  constructor(x,y,image){
    super(x,y,image);
    this.found = false;
    this.rotationSpeed = 0.25;
  }


  update(){
    super.update();

    if (this.found){
      this.angle += this.rotationSpeed;
      level += 1;
      state = 'levelDisplay';

    }
  }

  mousePressed(){
    //set the bounds of the sausage dog image
    if (this.overlap(mouseX,mouseY)){
      this.found = true;
    }
  }
}
