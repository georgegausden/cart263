class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image);
    this.found = false;
  }

  //same as in animal, except add sound effects when the sausage dog is found
  update() {
    super.update();

    if (this.found) {
      if (!dogFoundSFX.isPlaying()) {
        dogFoundSFX.play();
      }

      if (level < WINNING_LEVEL) {
        level += 1;
        resetGame();
        state = 'levelDisplay';
      } else {
        state = 'end';
      }

    }
  }

  //defines what happens when the mouse is pressed
  mousePressed() {
    //set the bounds of the sausage dog image
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
    }
  }
}
