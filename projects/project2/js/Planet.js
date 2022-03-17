class Planet{
  constructor(size,landscape){

    this.size = size;
    this.landscape = landscape;

  }

  display(){
    push();
    texture(this.landscape);
    sphere(this.size,20,20);
    pop();
  }
}
