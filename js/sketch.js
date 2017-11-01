//  ================== canvas ======================================= //
var _width, _height; 

// =================== moving stars / shooring stars ================ //
var star = []; // shooting star array
var R; // radius of initial ring of stars 
var angle = 0; 
var min_numOfStar = 5;

// =================== attractor ==================================== //
var attractor;  
var isGravityOn = true;

// =================== floating stars =============================== //
var particles = []; 
var numOfParticles = 50; // number of floating stars
var float;

// =================== dat.GUI ====================================== //
var params = {
	numOfStar: 36,
	C_GRAVITY: 30,
	max_distance: 2000, //stars beyond this distance will be removed
	HoldDownSpacebarToAddStar: function () {},
	toggleGravity: function(){
		isGravityOn = !isGravityOn;
		for (var i = 0; i < star.length; i++){
			star[i].repel(attractor);

		}

	},

}
var gui = new dat.gui.GUI();
gui.add(params, 'numOfStar').listen();
gui.add(params, 'C_GRAVITY', 30,60,5);
gui.add(params, 'max_distance', 2000,3600,500);
gui.add(params, 'HoldDownSpacebarToAddStar');
gui.add(params, 'toggleGravity');

function setup(){
	//  ====================== cavans setup ====================== //
	_width = 500;
	_height = 500;
	createCanvas(_width,_height, WEBGL);

	// ====================== attractor ========================== //
	attractor = new Attractor(0, 0, -600, 50, 3, 12, 80, 5);
	// x, y, z, len, anchorSize,numOfSatellites,satellitesRadius,satelliteSize
	R = _width/2 + 30; //shoot from right outside of the canvas 

	// =============== the initial ring of stars ================== //
	for (var i = 0; i < params.numOfStar; i++){

		var x = R * cos(radians(angle));
		var y = R * sin(radians(angle));
		var m = random(0.2,1)
		star[i] = new Star(x,y,0,m); 
		angle += 360/params.numOfStar;

	}

	params.numOfStar = star.length;

	// ================= floating stars ============= //
	for (var i = 0; i < numOfParticles; i++){
		var locX = random(_width/2*-1,_width/2);
		var locY = random(_height/2*-1,_height/2);
		var locZ = random(0,-600);
		particles[i] = new Particle(locX,locY,locZ,3);
	}
	float = false;
}


function draw(){
	background(0);
	scale(1,-1,1);

	// ==================== star movement ===================== //

	for (var i = 0; i < star.length; i++){
		if (isGravityOn){
			star[i].applyAttraction(attractor);
		}
		star[i].update();
		star[i].display();

		// check distance, if larger than the max_distance, 
		// then splice the particle from the array 
		if (star[i].checkDistance(attractor) >= params.max_distance) {
			star.splice(i,1);
			params.numOfStar = star.length;
		}
		
	}

	// ==================== floating star movement ==================== //

	for (var i = 0; i < particles.length; i++){
		particles[i].changeSize(attractor);
		if (float){
			particles[i].repel(attractor,5); //repeller , how much of repellent power
			particles[i].update();
		} 
		particles[i].display();

		if (particles[i].checkDistance()){
			particles.splice(i,1);
		}
	}

	// ==================== attractor ===================== //

	attractor.drawAnchor();
	if (attractor.isGlowing){
		attractor.glowSatellites();
	} else {
		attractor.release();
	}
	



	// ==================== user interaction ==================== //
	if (keyIsPressed){
		if (keyCode == 32){
			if (params.numOfStar < min_numOfStar){
				angle += 360/min_numOfStar;
				params.numOfStar = star.length;
			} else {
				angle += 360/params.numOfStar;
			}
			var x = R * cos(radians(angle));
			var y = R * sin(radians(angle));
			var m = random(0.2,1);
			star.push(new Star(x,y,0,m));
			params.numOfStar = star.length;
		}
	}
}

function keyPressed(){
	if (keyCode == ENTER){
		float = !float;
		return float;

	}

	if (keyCode == LEFT_ARROW){
		attractor.isGlowing = !attractor.isGlowing;
		attractor.release();
		attractor.addSatellite(-600);
		attractor.twisting();
	}
}





