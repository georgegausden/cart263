class Planet {
  constructor(size, landscape, distanceFromStar, rotationalPeriod, selfRotationPeriod, numMoons, initialPhase, index, numRings) {
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
    this.numClouds = 3;
    this.cloudsCreated = false;
    this.rings = [];
    this.numRings = numRings;
    this.ringsCreated = false;
    this.data = undefined;
    this.fillR = 0;
    this.fillG = 100;
    this.fillB = 255;
    this.fillOpacity = 100;
    this.clicked = false;
    this.currentCharIndex = 0;
    this.textG = 255;
    this.planeSize = this.size * 2;
    this.hoveringOverPlanet = false;
    this.mouseInsidePlane = false;
    this.planeClicked = false;
    this.reduceOpacityTimer = 0;
    this.planeOpacity = 0;
    this.planeTextOpacity = 255;
    this.planeDisappear = false;
    this.currentChars = '';
    this.typingDone = false;
  }

  //display the planet and change between the plane with text and the planet view
  display() {
    push();
    if (this.hoveringOverPlanet) {
      fill(this.fillR, this.fillG, this.fillB, this.fillOpacity);
    } else {
      texture(this.landscape);
    }
    translate(this.x, this.y);
    rotateZ(1 / this.selfRotationPeriod * frameCount);
    sphere(this.size, 40, 40);
    pop();

    //if we're currently viewing the planet
    if (this.beingViewed) {

      //limit the camera distance
      camera.setDistanceMax(1000);

      //display the zone the user can click on
      this.displayClickableZone();

      if (this.clicked && !this.planeDisappear) {

        //show the texture of the planet
        this.hoveringOverPlanet = false;

        //set the camera to the state where we can see the information of the planet
        let state = {
          distance: this.size + 200,
          center: [this.x, this.y, this.z],
          rotation: [1, 0, 0, 0],
        }
        camera.setState(state);

        //check to see if the mouse is over the rectangle box
        let d = dist(width / 2, height / 2, mouseX, mouseY);

        if (d < this.planeSize * 4) {
          this.planeOpacity = 200;
          this.mouseInsidePlane = true;

        } else {
          this.textG = 0;
          this.mouseInsidePlane = false;
        }

        //create a pop up canvas
        push();
        fill(100, 100, 100, this.planeOpacity);
        translate(this.x, this.y, this.z + 100);
        ellipsoid(this.planetSize, this.planetSize, 1, 100, 100);
        pop();

        //create a typewriter effect to type out the text
        this.typeWriterEffect();
      }

      //when the plane disappears, reset the parameters
      if (this.planeDisappear) {
        typingSFX.stop()
        this.clicked = false;
        this.typingDone = false;
        this.planeClicked = false;
        this.planeOpacity = 0;
        this.reduceOpacityTimer = 0;
        this.planeTextOpacity = 0;
        this.currentChars = '';
        this.currentCharIndex = 0;
        this.planeDisappear = false;
      }
    }
  }

  //create a type writer effect for the planet info
  typeWriterEffect() {
    //set the sounds
    if (!typingSFX.isPlaying() && (this.currentCharIndex + 1) < this.data.description.length) {
      typingSFX.play();
      typingSFX.setVolume(0.1);
    } else if (this.currentCharIndex + 1 === this.data.description.length) {
      this.typingDone = true;
      typingSFX.stop();
    }

    //what characters to display
    this.currentChars = this.data.description.substring(0, this.currentCharIndex + 1);

    //display the characters
    push();
    textSize(4);
    fill(255, 255, 255, this.planeTextOpacity);
    textFont(digitalFont);
    textAlign(CENTER);
    translate(this.x, this.y - 10, this.z + 110);
    text(this.currentChars, 0, 0);
    pop();

    //how often we add chars
    if (frameCount % 3 === 0) {
      this.currentCharIndex += 1;
    }
  }

  //move the planet around the sun
  move() {
    //get the planets to move in a circular orbit relative to the center of the solar system
    this.x = this.vx;
    this.y = this.vy;

    if (!this.beingViewed) {
      this.currentFrame = frameCount;
    }

    //stop the planet from moving if we're looking at it
    if (this.beingViewed) {
      this.vx = this.distanceFromStar * sin(1 / this.rotationalPeriod * this.currentFrame + this.phase);
      this.vy = this.distanceFromStar * cos(1 / this.rotationalPeriod * this.currentFrame + this.phase);
    } else {
      this.vx = this.distanceFromStar * sin(1 / this.rotationalPeriod * frameCount + this.phase);
      this.vy = this.distanceFromStar * cos(1 / this.rotationalPeriod * frameCount + this.phase);
    }
  }

  //draw the path of the planet around the sun
  drawPath() {
    //draw the path of the planet with an ellipse
    push();
    noFill();
    stroke(250, 205, 188);
    ellipseMode(CENTER);
    translate(0, 0, this.index)
    ellipse(0, 0, 2 * this.distanceFromStar, 2 * this.distanceFromStar, 50);
    pop();
  }

  //load the planet data that's to be displayed
  loadPlanetData() {
    //load all the data inside of a variable
    this.data = {
      name: undefined,
      mass: undefined,
      surfaceTemperature: undefined,
      elements: [],
      numMoons: this.moons.length,
      description: undefined,
    }

    let r = int(random(0, planetNamesData['minor_planets'].length));

    //load the name of the planet
    let nameString = planetNamesData['minor_planets'][r];
    let name = split(nameString, " ")[1];
    this.data.name = name;

    //assume that if the planet is larger, the mass is larger
    let weight = round(random(1, 10), 4);
    let mass = `${weight} x 10^23 kg`;
    this.data.mass = mass;

    //create the surface temperature data
    //assume that the closer the planet is to the sun, the hotter it is
    let distanceFromStar = this.distanceFromStar;
    let surfaceTemperatureVariable = round(1 / distanceFromStar * 1000000);
    let surfaceTemperature = `${surfaceTemperatureVariable} Kelvin`;
    this.data.surfaceTemperature = surfaceTemperature;

    // create the elements present in the atmosphere
    // pick 10 different elements and create a list of them
    let numElementsInAtmosphere = 10;
    let elements = [];
    for (let i = 0; i < numElementsInAtmosphere; i++) {
      let r = int(random(0, elementsData.elements.length));

      let elementName = elementsData.elements[r].name;
      elements.push(elementName);
    }
    this.data.elements = elements;

    //planet text
    this.data.description = `Planet name : ${this.data.name}\nMass : ${this.data.mass}\nSurface Temperature : ${this.data.surfaceTemperature}\nNatural Satellites : ${this.data.numMoons}\nMain Elements : ${this.data.elements[0]}, ${this.data.elements[1]}\n and trace amounts of ${this.data.elements[2]}`
  }

  //display the zone that the user can click
  displayClickableZone() {
    let d = dist(width / 2, height / 2, mouseX, mouseY);

    if (d <= this.size * 1.5) {
      this.hoveringOverPlanet = true;
    } else {
      this.hoveringOverPlanet = false;
    }
  }

  //check to see if the mouse is inside the plane of the text
  checkMouseInsidePlane() {
    let d = dist(width / 2, height / 2, mouseX, mouseY);

    if (d <= this.planeSize) {
      this.mouseInsidePlane = true;
    } else {
      this.mouseInsidePlane = false;
    }
  }

  //reduce the opacity of the plane and the text if we exit
  reduceOpacity() {
    if (this.planeClicked) {
      //start a timer
      this.reduceOpacityTimer += 0.3;

      this.planeOpacity -= this.reduceOpacityTimer;
      this.planeTextOpacity -= this.reduceOpacityTimer;

      if (this.planeOpacity <= 0 && this.planeTextOpacity <= 0) {
        this.planeDisappear = true;
      }
    }
  }

  //increase the opacity of the plane when we click on the planet
  increaseOpacity() {
    if (this.clicked) {
      this.planeOpacity += 0.3;
      this.planeOpacity = constrain(this.planeOpacity, 0, 150);
    }
  }
}
