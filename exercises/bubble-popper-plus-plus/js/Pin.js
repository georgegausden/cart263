class Pin {
  constructor(x,y,tipx,tipy,side){
    this.x = x;
    this.y = y;
    this.tipx = tipx;
    this.tipy = tipy;
    this.headSize = 20;
    this.side = side;
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

  update(){
    if (this.side === 'left'){
      this.tipx += bubblesSaved*10;
      this.x += bubblesSaved*10;
    }
    else if (this.side === 'right'){
      this.tipx -= bubblesSaved*10;
      this.x -= bubblesSaved*10;
    }
  }
}
