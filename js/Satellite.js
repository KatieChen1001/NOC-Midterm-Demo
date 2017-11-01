"use strict";

class Satellite {
  constructor(x, y, z, m) {
    this.pos = createVector(x, y, z);
    this.vel = createVector();
    this.acc = createVector();

    this.mass = m;
    this.rad = this.mass;

  }
  display() {
    push();
    translate(this.pos.x, this.pos.y,this.pos.z);
    noStroke();
    sphere(this.rad);
    pop();
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(force) {
    force.div(this.mass);
    this.acc.add(force);
  }

}