"use strict"

class Particle {
	constructor(x,y,z,m){
		this.pos = createVector(x,y,z);
		this.vel = createVector(0,0,0);
		this.acc = createVector(0,0,0);
		this.mass = m; 
		this.rad = this.mass;
		this.isDead = false;

		this.noiseStep = 0;
	}

	applyForce(f){
		f.div(this.mass);
		this.acc.add(f);
	}

	repel(other,toggleGravityMagnitude){
		 //how much of a repel to apply to the stars
		var force = p5.Vector.sub(this.pos, other.anchor);
		force.normalize();
		force.mult(toggleGravityMagnitude);
		this.applyForce(force);	
	}

	checkDistance(){
		if (this.pos.x < -250 || this.pos.x > 250){
			return this.isDead = true;
		} else if (this.pos.y > 250 || this.pos.y < -250){
			return this.isDead = true;
		}
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

	// change the size of the stars according to the star distance to the attractor
	changeSize(other){
		var distance = other.anchor.dist(this.pos);
		this.rad = distance * 0.002;
	}


}