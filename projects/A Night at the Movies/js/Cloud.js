class Cloud {
  //this class was imported from https://editor.p5js.org/hosken/sketches/31BJH0dDE and was created by hosken.
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.colour = color(400, 400, 400);
  }

  //this function moves the clouds over time and wraps them within the frame
  moveX() {
    this.x += 1;
    if (this.x > width) {
      this.x = 0;
    }
  }

  // JH I changed this from 'drawBall' to 'display',
  // which is a bit more generic a name, and used more
  // often in these types of cases. You can name things what
  // you want, but it's good to be clear and consistent
  //this function displays the clouds 
  display() {
    noStroke()
    fill(this.colour);

    //JH Why not do all the heavy lifting for what a 'cloud'
    //is here, in this function? Instead of making three
    // different object to make up a cloud, you could have
    //one object that represents the whole cloud. For instance:

    //Offset each ellipse a bit here, so the whole cloud moves as a body
    ellipse(this.x, this.y, 100, 50);
    ellipse(this.x+50, this.y+20, 100, 50);
    ellipse(this.x-40, this.y+15, 100, 50);

  }

}
