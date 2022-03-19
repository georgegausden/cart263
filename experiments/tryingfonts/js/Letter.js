class Letter {
  constructor(letter,x,y,rate){
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.opacity = 255;
    this.letterChanged = false;
    this.rate = rate;
  }

  display(){
    push();
    textAlign(RIGHT);
    textSize(20);
    fill(0,0,0,this.opacity);
    text(this.letter,this.x,this.y);
    pop();
  }

  changeLetter(){
    let r = random(0,1);
    if (r<0.1){
      this.letter = random(chars);
    }

    // if (this.opacity > 0 && !this.letterChanged){
    //   this.opacity -= this.rate;
    // }
    // else if (this.opacity === 0 && !this.letterChanged){
    //   this.letter = random(chars);
    //   this.letterChanged = true;
    // }
    // else if (this.opacity < 255 && this.letterChanged){
    //   this.opacity +=1;
    // }
  }

  increaseOpacity(){
    // if (this.opacity < 255 && this.letterChanged){
    //   this.opacity += this.rate;
    // }
    // else if (this.opacity === 255 && this.letterChanged){
    //   this.letterChanged = false;
    // }
  }
}
