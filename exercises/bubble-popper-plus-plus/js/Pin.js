class Pin {
  constructor(x,y,tipx,tipy){
    this.x = x;
    this.y = y;
    this.tipx = tipx;
    this.tipy = tipy;
    this.headSize = 20;
  }


  display(){
    // Draw pin
    push();
    stroke(255);
    strokeWeight(2);
    line(this.tipx, this.tipy, this.x, this.y);
    pop();

    // Draw pinhead
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x, this.y, this.headSize);
    pop();

  }
}
