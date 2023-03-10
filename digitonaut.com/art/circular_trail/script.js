var c = document.getElementById("c");
var ctx = c.getContext("2d");
var cw = c.width = 500,cx=cw/2;
var ch = c.height = 500,cy=ch/2;

var rad = Math.PI / 180;
var frames = 360;
var r= 150;// trail radius
var p = [];// particles array

ctx.lineWidth = 2;

function Particle(a) {
	this.a = a;
	this.rnd = rnd()
	this.r = 2;
	this.R = r;
	this.x = cx + this.R * Math.cos(this.a * rad);
	this.y = cy + this.R * Math.sin(this.a * rad);
	this.alpha = 1;
}

for (var a = 0; a < 360; a+=1.5) {
  var particle = new Particle(a);
  p.push(particle);
}

function drawParticle(o){
	ctx.fillStyle = "hsla("+o.a+", 90%,60%,"+o.alpha+")";
	ctx.strokeStyle = "hsla("+o.a+", 100%,50%,"+o.alpha+")";
	ctx.beginPath();
	ctx.arc(o.x,o.y, o.r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();
}

function Draw() {
	frames+=.5;
    ctx.clearRect(0, 0, cw, ch);
	var n = p.length;
	
	for( var i = 0; i < n; i++){
		
	var o = p[(~~frames-i) % n];
	
	o.r = 2 + i/9;
	o.R = r+ i/2 * o.rnd;
	o.x = cx + o.R * Math.cos(o.a * rad);
	o.y = cy + o.R * Math.sin(o.a * rad);
	var l = ~~(3*n/4);
	o.alpha = (l - i)/l;
		
    drawParticle(o);
	}  
    window.requestAnimationFrame(Draw);
}

window.requestAnimationFrame(Draw);

function rnd() {// a @tmrDevelops function
  Math.seed = (Math.seed * 108013 + 2531011) & 0xffffffff;
  return Math.abs(Math.seed >> 16) / 32869;
}
function randomIntFromInterval(mn, mx) {
  return ~~(rnd() * (mx - mn + 1) + mn);
}