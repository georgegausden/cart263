//this whole section was taken from an example of a starfield by Chris Nielsen. The original code can be found at http://bluegalaxy.info/codewalk/2018/01/04/p5-js-build-starfield/
//I have adapted certain parts to get the look I want for my project

class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);
        this.pz = this.z;
    }
    update() {
      this.z = this.z - speed;
      if (this.z < 1) {
          this.z = width;
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.pz = this.z;
      }
    }

    show() {
      fill(255);
      noStroke();

      var sx = map(this.x/this.z, 0, 1, 0, width);
      var sy = map(this.y/this.z, 0, 1, 0, height);
      var r = map(this.z, 0, width, 12, 0);
      ellipse(sx, sy, r, r);

      var px = map(this.x/this.pz, 0, 1, 0, width);
      var py = map(this.y/this.pz, 0, 1, 0, height);
      this.pz = this.z;

      stroke(255);
      line(px, py, sx, sy);
    }
}
