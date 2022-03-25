class Shape{
  constructor(x,y,index,fillR,fillG,fillB,growthWidthFactor,growthHeightFactor,rectPalette){
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.vx = 0;
    this.vy = 0;

  }

  display(){
    push();
    fill(0);

    rect(this.x,this.y,this.width,this.height);
    pop();
  }

  move(){
    this.x += this.vx;
    this.y += this.vy;
  }

  update(){

    if (this.touchesCanvasBorder()){
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
