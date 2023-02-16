var colors=['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8b00ff'];
var w=window.innerWidth,
    h=window.innerHeight;
c.width=w; c.height=h;
ctx=c.getContext('2d');
var points=[];
function Circle(){
  this.x=Math.random()*w;
  this.y=Math.random()*h;
  this.size=Math.random()*10;
  this.explosionSize=0;
  this.color=colors[(Math.random()*colors.length)|0];
}
Circle.prototype.use=function(){
  if(this.size>=0){
    this.explosionSize+=this.size*Math.abs(Math.sin(this.size))*4;
    this.size-=0.07;
    
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.explosionSize, 0, Math.PI*2);
    ctx.strokeStyle=this.color;
    ctx.stroke();
    ctx.closePath();
  }else{
    points.splice(points.indexOf(this), 1);
    points.push(new Circle);
  }
}
var tot=(w*h)/3000
for(var i=0; i<tot; ++i){
  points.push(new Circle);
}
ctx.fillStyle='rgba(0, 0, 0, 0.06)';
function anim(){
  window.requestAnimationFrame(anim);
  
  ctx.fillRect(0, 0, w, h);
  
  for(var i=0; i<points.length; ++i){
    points[i].use();
  }
}
anim();