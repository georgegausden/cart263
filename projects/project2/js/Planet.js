class Planet{
  constructor(size){

    this.size = size;

  }

  display(){
    push();
    ambientMaterial(200,200,100);
    sphere(this.size,20,20);
    pop();
  }
}
