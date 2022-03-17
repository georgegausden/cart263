class Sun{
  constructor(size){
    this.size = size;
  }

  display(){
    push();
    emissiveMaterial(130, 230, 0);
    sphere(this.size,40,40);
    pop();
  }

  shine(){
    // pointLight(250,250,250,0,0,0);
  }
}
