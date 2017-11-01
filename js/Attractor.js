"use strict";

class Attractor {
  constructor(x, y, z, len, anchorSize,numOfSatellites,satellitesRadius,satelliteSize) {
    this.anchor = createVector(x, y, z);
    this.len = len;
    this.mass = anchorSize;
    this.R = satellitesRadius;
    this.s = satelliteSize;
    this.lenMin = len * 0.8;
    this.lenMax = len * 1.5;
    this.k = 0.1;

    this.isGlowing = true;
    this.step = 0;


    // ============ initialize satellites ========== // 
    this.satellites = [];
    this.angle = 0;
    this.numOfSat = numOfSatellites;

    for (var i = 0; i < this.numOfSat; i ++){
      this.satellites[i] = new Satellite (this.R*cos(radians(this.angle)), this.R * sin(radians(this.angle)), z, this.s);
      this.angle += 360/this.numOfSat;
    }
  }

  drawAnchor() {
    push();
    translate(this.anchor.x, this.anchor.y, this.anchor.z);
    noStroke();
    sphere(this.mass);
    pop();
  }

  glowSatellites() {

   for (var i = 0; i < this.numOfSat; i++){
    var vector = p5.Vector.sub(this.satellites[i].pos, this.anchor);
    var distance = vector.mag();
    var direction = vector.copy().normalize();
    var stretch = distance - this.len;
    var force = direction.copy();
    force.mult(-1 * this.k * stretch * random(1));
    this.satellites[i].applyForce(force);

    if (distance < this.lenMin) {
      direction.mult(this.lenMin);
      this.satellites[i].pos = p5.Vector.add(this.anchor, direction);
      this.satellites[i].vel.mult(0);
    } else if (distance > this.lenMax) {
      direction.mult(this.lenMax);
      this.satellites[i].pos = p5.Vector.add(this.anchor, direction);
      this.satellites[i].vel.mult(0);
    }

    this.satellites[i].update();
    this.satellites[i].display();
  }
  

}

release(){
  for (var i = 0; i < this.satellites.length; i++){
    var vector = p5.Vector.sub(this.satellites[i].pos, this.anchor);
      // create a force whose direction is perpendicular to the force attracting the satellites
      var forceY = 30;
      var forceZ = -10;
      var forceX = (0 - (vector.y * forceY + vector.z * forceZ))/vector.x;
      var force = createVector(forceX, forceY,forceZ);
      force.normalize();
      force.mult(2);

      this.satellites[i].applyForce(force);
      this.satellites[i].update();
      this.satellites[i].display();
    }
  }

  addSatellite(z){
    this.satellites.push(new Satellite (this.R*cos(radians(this.angle)), this.R * sin(radians(this.angle)), z, this.s));
    this.angle += 360/this.numOfSat;
  }

  twisting(){
    // var ram = map(random(-1,1),-1,1,-100,100);
    // this.satellites.push(new Satellite(ram,ram,z, this.s))
    for (var i = 0; i < this.satellites.length; i++){
      var distance = this.anchor.dist(this.satellites[i].pos);
      this.satellites[i].mass = distance*0.1;
    }
  }
}