class Planet{
  constructor(x,y,z,vx,vy,vz,ax,ay,az,size){
    this.x = x;
    this.y = y;
    this.z = z;
    this.vx = vx;
    this.vy = vy;
    this.vz = vz;
    this.ax = ax;
    this.ay = ay;
    this.az = az;
    this.size = size;

  }

  display(){
    push();
    sphere(this.size,20,20);
    pop();
  }
}
