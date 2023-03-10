var c = document.getElementById("canv");
var $ = c.getContext("2d");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var arr = [];
var ms = {};
var num = 150;
var u = 0;
for (var i = 0; i < num; i++) {
  arr.push(new part());
}

function part() {
  this.sp = {
    x: 5 + Math.random() * -10,
    y: -5 + Math.random() * 10
  };
  if (ms.x && ms.y) {
    this.pos = {
      x: ms.x,
      y: ms.y
    };
  } else {
    this.pos = {
      x: w / 2,
      y: h / 2
    };
  }
  this.rad = 1 + Math.random() * 100;
  this.glow = 100 + Math.random() * 100;
  this.fade = this.glow;
}
function draw() {
  $.globalCompositeOperation = "source-over";
  $.fillStyle = 'hsla(236, 55%, 5%, 0.6)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "lighter";
  for (var i = 0; i < arr.length; i++) {
    var p = arr[i];
    $.beginPath();
    p.alph = Math.round(p.fade / p.glow * 100) / 200
    var g = $.createRadialGradient(p.pos.x, p.pos.y, 0, p.pos.x, p.pos.y, p.rad);
    g.addColorStop(0, 'hsla('+i+', 75%, 45%, 1)');
    g.addColorStop(0.5, 'hsla('+u+', 95%, 30%,'+ p.alph + ')');
    g.addColorStop(1, 'hsla(236,55%,5%,0)');
    $.fillStyle = g;
    $.arc(p.pos.x, p.pos.y, p.rad, Math.PI * 2, false);
    $.fill();
    p.fade--;
    p.rad--;
    p.pos.x += p.sp.x;
    p.pos.y += p.sp.y;
    if (p.fade < 0 || p.rad < 0)arr[i] = new part();
  }
  u-=.2;
  window.requestAnimationFrame(draw);
}
draw();
window.addEventListener('mousemove',function(e) {
  ms.x = e.clientX;
  ms.y = e.clientY;
},false);
window.addEventListener('touchmove',function(e) {
  e.preventDefault();
  ms.x = e.touches[0].clientX;
  ms.y = e.touches[0].clientY;
},false);
window.addEventListener('resize',function(){
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
},false);