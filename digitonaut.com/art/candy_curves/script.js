/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/1056707

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

const size = 15;

var colors;
var colorCount = 0;

var pos = {};
var dir = 1;
var radius = 5;
var angle = 0;

function setup() {
	const size = min(windowWidth, windowHeight);
	createCanvas(windowWidth, windowHeight);
	background(0);
	strokeWeight(2);
	
	colors = [color("#2b2244"), color("#581845"), color("#900C3F"), color("#C70039"), color("#e32c36"), color("#FF5733"), color("#FFC30F"), color("#24fffb"), color("#2b2244")];
	
	pos = {x: width/2, y: height/2};
}

function draw() {

	angle += 1/radius*dir;

	let prevPosX = pos.x;
	let prevPosY = pos.y;
	pos.x += cos(angle) * radius;
	pos.y += sin(angle) * radius;

	//lerp array of colors
	colorCount += noise(frameCount/1000)/200;
	var col = lerpColors(colorCount%1, colors);
	
	//draw
	noStroke();
	fill(col);
	circle(pos.x, pos.y, size*2);

	//countour 180 degrees around front movement area
	stroke(255);
	noFill();
	beginShape();
	var f = frameCount / 10;
	var aa = atan2(pos.y - prevPosY, pos.x - prevPosX) - PI/2;
	for(var a = -0.2; a < PI+0.2; a+=PI/10){
		vertex(cos(a + aa) * (size+1) + pos.x, sin(a + aa) * (size+1) + pos.y);
	}
	endShape();

	//change direction
	if(pos.x < (size+10) || pos.x > width-(size+10) || pos.y < (size+10) || pos.y > height-(size+10)){
		angle += PI * dir;
	}else{
		if(random() < 0.05) dir *= -1;
		if(random() < 0.05) radius = random(5, 8);
	}
}

/**
 * lerp color from multiple color array
 * param {Integer} [t] lerp factor from 0 to 1
 * param {Array} [[color, color]] colors to lerp, minimum 2 colors in array
 */
function lerpColors(t, colors)
{
	let i = Math.floor(t*(colors.length-1));
	if(i < 0) return colors[0];
	if(i >= colors.length-1) return colors[colors.length-1];

	let percent = (t - i / (colors.length-1)) * (colors.length-1);
	return color(
		colors[i]._getRed() + percent*(colors[i+1]._getRed()-colors[i]._getRed()),
		colors[i]._getGreen() + percent*(colors[i+1]._getGreen()-colors[i]._getGreen()),
		colors[i]._getBlue() + percent*(colors[i+1]._getBlue()-colors[i]._getBlue())
	)
}