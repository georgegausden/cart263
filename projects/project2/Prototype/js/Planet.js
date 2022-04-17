class Planet{
  constructor(size,landscape,distanceFromStar,rotationalPeriod,selfRotationPeriod,numMoons,initialPhase,index,numRings,data){
    this.size = size;
    this.landscape = landscape;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.vx = undefined;
    this.vy = undefined;
    this.distanceFromStar = distanceFromStar;
    this.rotationalPeriod = rotationalPeriod;
    this.selfRotationPeriod = selfRotationPeriod;
    this.numMoons = numMoons;
    this.moons = [];
    this.phase = initialPhase;
    this.beingViewed = false;
    this.currentFrame = undefined;
    this.index = index;
    this.clouds = [];
    this.numClouds = 0;
    this.cloudsCreated = false;
    this.rings = [];
    this.numRings = numRings;
    this.ringsCreated = false;
    this.data = undefined;
    this.fillR = 0;
    this.fillG = 255;
    this.fillB = 0;
    this.fillOpacity = 100;
    this.clicked = false;
    this.currentCharIndex = 0;
    this.textG = 0;
    this.planeSize = this.size*2;
    this.hoveringOverPlanet = false;
    this.mouseInsidePlane = false;
    this.planeClicked = false;
    this.reduceOpacityTimer = 0;
    this.planeOpacity = 0;
    this.planeTextOpacity = 0;
    this.planeDisappear = false;


  }

  display(){
    push();
    if (this.hoveringOverPlanet){
      fill(this.fillR,this.fillG,this.fillB,this.fillOpacity);
    }
    else{
      texture(this.landscape);
    }
    translate(this.x,this.y);
    rotateZ(1/this.selfRotationPeriod*frameCount);
    sphere(this.size,40,40);
    pop();

    // this.cloudActions();
    // this.ringActions();

    if (this.beingViewed){

      this.displayClickableZone();

      if (this.clicked && !this.planeDisappear){

        //show the texture of the planet
        this.hoveringOverPlanet = false;

        //set the camera to the state where we can see the information of the planet
        let state = {
          distance: this.size+160,
          center: [this.x,this.y,this.z],
          rotation: [1,0,0,0],
        }
        camera.setState(state);


        //check to see if the mouse is over the rectangle box
        let d = dist(width/2,height/2,mouseX,mouseY);

        if (d < this.planeSize*4){
          this.textG = 255;
          this.mouseInsidePlane = true;

        }
        else{
          this.textG = 0;
          this.mouseInsidePlane = false;
        }
        //create a pop up canvas
        push();
        fill(0,this.textG,0,this.planeOpacity);
        translate(this.x,this.y,this.z+100);
        plane(this.planeSize,this.planeSize);
        pop();

        this.typeWriterEffect();
      }

      if (this.planeDisappear){
        this.clicked = false;
        this.planeClicked = false;
        this.planeDisappear = false;
        this.planeOpacity = 0;
        this.planeTextOpacity = 0;
        this.currentCharIndex = 0;
      }

    }


  }

  typeWriterEffect(){

    // if (!typingSFX.isPlaying()){
    //   typingSFX.play();
    // }

    let currentChars = this.data.description.substring(0,this.currentCharIndex+1);

    push();
    textSize(2);
    fill(0,255,0,this.planeTextOpacity);
    textFont(digitalFont);
    textAlign(CENTER);
    translate(this.x,this.y-10,this.z + 110);
    text(currentChars,0,0);
    pop();

    if (frameCount%4===0){
      this.currentCharIndex += 1;
    }


  }

  move(){
    //get the planets to move in a circular orbit relative to the center of the solar system
    this.x = this.vx;
    this.y = this.vy;

    if (!this.beingViewed){
      this.currentFrame = frameCount;
    }

    if (this.beingViewed){
      this.vx = this.distanceFromStar*sin(1/this.rotationalPeriod*this.currentFrame+this.phase);
      this.vy = this.distanceFromStar*cos(1/this.rotationalPeriod*this.currentFrame+this.phase);
    }
    else{
      this.vx = this.distanceFromStar*sin(1/this.rotationalPeriod*frameCount+this.phase);
      this.vy = this.distanceFromStar*cos(1/this.rotationalPeriod*frameCount+this.phase);
    }

  }

  drawPath(){
    //draw the path of the planet with an ellipse
    push();
    // fill(250,205,188,10);
    noFill();
    stroke(250,205,188);
    ellipseMode(CENTER);
    translate(0,0,this.index)
    ellipse(0,0,2*this.distanceFromStar,2*this.distanceFromStar,50);
    pop();
  }

  updateViewing(){
    if (counter-1 != this.index){
      this.beingViewed = false;
    }
  }

  createClouds(){
    if (!this.cloudsCreated){
      for (let i = 0; i<this.numClouds;i++){
        let opacity = random(1,10);
        let rotationSpeed = random(-10,10);
        let height = random(1,1.6);
        let cloud = new Cloud(this.size,height,this.x,this.y,opacity,rotationSpeed);
        this.clouds.push(cloud);
      }
      this.cloudsCreated = true;
    }
  }

  cloudActions(){
    for (let i = 0; i<this.clouds.length; i++){
      let cloud = this.clouds[i];
      cloud.update(this.x,this.y);
      cloud.display();

    }
  }

  createRings(){
    if (!this.ringsCreated){
      for (let i = 0; i<this.numRings; i++){
        let x = this.x;
        let y = this.y;
        let ringRadius = random(0,20);
        let tubeRadius = random(1,20);
        let r = random(100,200);
        let g = random(100,200);
        let b = random(100,200);
        let opacity = random(0,200);

        let ring = new Ring(x,y,ringRadius,tubeRadius,r,g,b,opacity);
        this.rings.push(ring);
      }
    }
  }

  ringActions(){
    for (let i = 0; i<this.rings.length; i++){
      let ring = this.rings[i];
      ring.display();
      ring.update(this.x,this.y);

    }
  }

  loadPlanetData(){
    //load all the data inside of a variable
    this.data = {
      name: undefined,
      mass: undefined,
      surfaceTemperature: undefined,
      elements: [],
      numMoons: this.moons.length,
      description: undefined,
    }


    let r = int(random(0,planetNamesData['minor_planets'].length));

    //load the name of the planet
    let nameString = planetNamesData['minor_planets'][r];
    let name = split(nameString, " ")[1];
    this.data.name = name;

    //assume that if the planet is larger, the mass is larger
    let weight =  round(random(1,10),4);
    let mass = `${weight} x 10^23 kg`;
    this.data.mass = mass;

    //create the surface temperature data
    //assume that the closer the planet is to the sun, the hotter it is
    let distanceFromStar = this.distanceFromStar;
    let surfaceTemperatureVariable = round(1/distanceFromStar * 1000000);
    let surfaceTemperature = `${surfaceTemperatureVariable} Kelvin`;
    this.data.surfaceTemperature = surfaceTemperature;

    // create the elements present in the atmosphere
    // pick 10 different elements and create a list of them
    let numElementsInAtmosphere = 10;
    let elements = [];
    for (let i = 0; i<numElementsInAtmosphere; i++){
      let r = int(random(0,elementsData.elements.length));

      let elementName = elementsData.elements[r].name;
      elements.push(elementName);
    }
    this.data.elements = elements;

    //planet text
    this.data.description = `Planet name : ${this.data.name}\nMass : ${this.data.mass}\nSurface Temperature : ${this.data.surfaceTemperature}\nNatural Satellites : ${this.data.numMoons}\nMain Elements : ${this.data.elements[0]}, ${this.data.elements[1]} and trace amounts of ${this.data.elements[2]}`
  }

  displayClickableZone(){
    let d = dist(width/2,height/2,mouseX,mouseY);

    if (d <= this.size){
      this.hoveringOverPlanet = true;
    }
    else{
      this.hoveringOverPlanet = false;
    }
  }

  checkMouseInsidePlane(){
    let d = dist(width/2,height/2,mouseX,mouseY);

    if (d <= this.planeSize){
      this.mouseInsidePlane = true;
    }
    else{
      this.mouseInsidePlane = false;
    }
  }

  reduceOpacity(){
    if (this.planeClicked){
      //start a timer
      this.reduceOpacityTimer += 0.3;

      this.planeOpacity -= this.reduceOpacityTimer;
      this.planeTextOpacity -= this.reduceOpacityTimer;

      if (this.planeOpacity <= 0 && this.planeTextOpacity <= 0){
        this.planeDisappear = true;
      }

    }
  }

  increaseOpacity(){
    if (this.clicked){

      this.planeTextOpacity += 0.6;
      this.planeOpacity += 0.3;

      this.planeTextOpacity = constrain(this.planeTextOpacity,0,255);
      this.planeOpacity = constrain(this.planeOpacity,0,150);
    }
  }

  updateBooleans(){
    this.clicked = false;
    this.planeDisappear = false;
  }
}
