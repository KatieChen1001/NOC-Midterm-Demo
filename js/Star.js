"use strict"

class Star {
	constructor(x,y,z,m){
		this.pos = createVector(x,y,z);
		this.vel = createVector(0,0,0);
		this.acc = createVector(0,0,0);
		this.mass = m; 
		this.rad = this.mass * 5;
	}

	applyForce(f){
		f.div(this.mass);
		this.acc.add(f);
	}

	applyAttraction(other){
		var distance = this.pos.dist(other.anchor);
		var magnitude = (params.C_GRAVITY * this.mass * other.mass) / (distance);
		var force = p5.Vector.sub(other.anchor, this.pos);
		force.normalize();
		force.mult(magnitude*0.9);
		this.applyForce(force);
	}

	repel(other){
		var distance = this.pos.dist(other.anchor);
		var toggleGravityMagnitude = 10; //how much of a repel to apply to the stars
		var force = p5.Vector.sub(this.pos, other.anchor);
		force.normalize();
		force.mult(toggleGravityMagnitude);
		this.applyForce(force);	
	}

	checkDistance(other){
		var distance = other.anchor.dist(this.pos);
		return distance;
	}

	update(){
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.acc.mult(0);
	}

	display(){
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		noStroke();
		fill(255);
		sphere(this.rad*2);
		pop();
	}

}