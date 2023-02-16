t=0
draw=_=> {
createCanvas(w=windowWidth, h=windowHeight)
noStroke()
background(0)
colorMode(HSB,p=map(sin(t/9),-1,1,5,64))
t+=.5
translate(w/2, h/2)
//scale(1/map(sin(t/25), -1, 1, .3, 9))
	scale(.22)
for (y=0; y<40; y++)
  for (x=0; x<40; x++) {
    fill((t-x^y)%63,p,p)
		X=2*x*y
    Y=x*x-y*y
    Z=sqrt(x*x+y*y)
    circle(X, Y, Z*2)
    circle(-X, Y, Z*2)
// All circles are circumscribed
  }
}
