class Shape{
  constructor(x,y,index,fillR,fillG,fillB,growthWidthFactor,growthHeightFactor,rectPalette){
    this.x = x;
    this.y = y;
    this.growthRate = 4;
    this.growthWidthFactor = growthWidthFactor;
    this.growthHeightFactor = growthHeightFactor;
    this.index = index;
    this.processusDone = false;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.width = 0;
    this.height = 0;
    this.palette = rectPalette;

  }

  display(){
    push();
    fill(this.palette[0],this.palette[1],this.palette[2]);
    if (this.width > 1){
      stroke(0);
      strokeWeight(8);
    }
    else{
      noStroke();
    }
    rectMode(CORNER);
    rect(this.x,this.y,this.width,this.height);
    pop();
  }

  update(){

    if ((this.touchesCanvasBorder() || this.touchingOtherRect())){
      if (!this.processusDone){
        createNewRect();
        this.processusDone = true;
      }

    }
    else{
      this.grow();
    }
  }

  touchesCanvasBorder(){
    let hit1 =  collideLineRect(0, 0, width, 0, this.x, this.y, this.width, this.height);
    let hit2 =  collideLineRect(width, 0, width, height, this.x, this.y, this.width, this.height);
    let hit3 =  collideLineRect(width, height, 0, height, this.x, this.y, this.width, this.height);
    let hit4 =  collideLineRect(0, height, 0, 0, this.x, this.y, this.width, this.height);

    if (hit1 || hit2 || hit3 || hit4){
      return true
    }

  }

  touchingOtherRect(){
    for (let i = 0; i<rects.length; i++){
      if (i!=this.index){
        let rectangle = rects[i];

        let hit = collideRectRect(this.x, this.y, this.width, this.height, rectangle.x, rectangle.y, rectangle.width, rectangle.height);

        if (hit){
          return true
        }
      }
    }

  }


  grow(){
    this.width += this.growthWidthFactor;
    this.height += this.growthHeightFactor;
  }
}
