class Wand{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 100;
    this.lumosPlayed = false;
  }

  lumos(){
    //play the sound effect once
    if (this.lumosPlayed == false){
      lumosSFX.play();
      this.lumosPlayed = true;
    }

    //make the wand behave light a flashlight
    this.x = mouseX;
    this.y = mouseY;

    push();
    fill(255);
    circle(this.x,this.y,this.size);
    pop();



    push();
    imageMode(CENTER);
    image(wandImage,mouseX+10,mouseY+40,75,75);
    pop();

    //expand the light size slowly
    this.size += 1;
    this.size = constrain(this.size,100,width/3);
  }

  lumosMaxima(){

  }

  update(){
    //update the position of the wand
    this.x = mouseX;
    this.y = mouseY;
  }
}
