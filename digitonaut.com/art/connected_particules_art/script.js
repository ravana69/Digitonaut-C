// color palette

var colors = ["#ff0000", "#feb30f", "#0aa4f7", "#000000", "#ffffff"];

// set weights for each color 

var weights = [1, 1, 2, 1, 2, 5];

// scale of the vector field 
// smaller values => bigger structures  
// bigger values  ==> smaller structures 

var myScale = 2;

// number of drawing agents 

var nAgents = 500;

let agent = [];

// set spinning direction (plus or minus)

var direction = -1;

var par = 0;

let border = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	strokeCap(SQUARE);

	background(100);

	for (let i = 0; i < nAgents; i++) {
		agent.push(new Agent());
	}

}

function draw() {
	
	if(frameCount > 200)
	{
		noLoop();
	}

	for (let i = 0; i < agent.length; i++) {
		agent[i].update();
		let iP = agent[i].getPartner();
		strokeWeight(0.05);
		//line(agent[i].getP().x,agent[i].getP().y,
		//		 agent[iP].getP().x,agent[iP].getP().y);
		noFill();
		arc(agent[i].getP().x,agent[i].getP().y,
		  	agent[iP].getP().x,agent[iP].getP().y,0,2*PI,OPEN);
	}

}

// paintining agent 


class Agent {
	constructor() {
		
		this.p = createVector(random(border,width-border), random(border,height-border));

		this.pOld = createVector(this.p.x, this.p.y);

		this.step = 2;

		this.color = generateColor();

		this.partner = floor(random(1,nAgents));
		
		this.strokeWidth = random(1, 2);
	}
	
	getPartner() {
		return this.partner;
	}

	getP() {
		return this.p;
	}


	update() {

		this.p.x += direction * vector_field(this.p.x, this.p.y).x * this.step;
		this.p.y += direction * vector_field(this.p.x, this.p.y).y * this.step;

		strokeWeight(this.strokeWidth);
		stroke(this.color);


		line(this.pOld.x, this.pOld.y, this.p.x, this.p.y);

	}

}

// vector field function 
// the painting agents follow the flow defined 
// by this function 


function vector_field(x, y) {

	x = map(x, 0, width, -myScale, myScale);
	y = map(y, 0, height, -myScale, myScale);

	let k1 = 5;
	let k2 = 3;

	let u = sin(k1 * y) + cos(k2 * y);
	let v = sin(k2 * x) - cos(k1 * x);


	return createVector(u, v);
}



function generateColor() {
	let temp = myRandom(colors, weights);

	myColor = color(hue(temp) + randomGaussian() * 10,
		              saturation(temp) + randomGaussian() * 10,
		              brightness(temp) - 10, 
									random(10,90));

	return myColor;
}

// function to select 

function myRandom(colors, weights) {
	let sum = 0;

	for (let i = 0; i < colors.length; i++) {
		sum += weights[i];
	}

	let rr = random(0, sum);

	for (let j = 0; j < weights.length; j++) {

		if (weights[j] >= rr) {
			return colors[j];
		}
		rr -= weights[j];
	}
}