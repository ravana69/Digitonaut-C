function setup() {
	//windowWidth = 800 ; windowHeight = 800
	
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB,256)
	background(color(180,50,50))
	
	ix = 0 ; iy = 0 ; dz = 10
	
	
	hues = [0,45,90,150]
}

function draw() {
	
	
	
	mx = (ix)*12*dz ; my = (iy+(ix % 2)/2)*12*dz
	
	ld = -1
	
	for(dx=0;dx<7;dx++)
	for(dy=0;dy<=dx;dy++)
	{
		coherence = (random(100) > 75 && ld != -1)
		if (((dist(0,0,dx,dy)*2-2)*random() < 1.75 || coherence) && dx < 6)
		{
			if (!coherence) {ld = color(hues[floor(random(4))]-5+random(10),140+random(20),180+random(20))}
			nc = ld ; //fill(ld)
		}
		else
		{
			ld = -1 ; nc = color(170+random(20),50+random(100),50+random(10))
			//fill(nc)
		}
		rect2(mx+dx*dz,my+dy*dz,10,10)
		rect2(mx-dx*dz,my+dy*dz,10,10)
		rect2(mx+dx*dz,my-dy*dz,10,10)
		rect2(mx-dx*dz,my-dy*dz,10,10)

		rect2(mx+dy*dz,my+dx*dz,10,10)
		rect2(mx-dy*dz,my+dx*dz,10,10)
		rect2(mx+dy*dz,my-dx*dz,10,10)
		rect2(mx-dy*dz,my-dx*dz,10,10)
	}
	
	
	iy++ ; if (iy > 10) {ix++ ; iy = 0}
	if (ix > 30) {ix = 0 ; if (false) saveCanvas("carpet","png")}
}

function rect2(dx,dy,xz,yz) {
	for(x=0;x<xz;x++)
	{
		stroke(lerpColor(nc,color(0),random(.1)))
		line(dx+x,dy,dx+x,dy+yz)
	}
	stroke(color(40,50,180,ld == -1 ? 30+random(40) : 80+random(80))) ; line(dx,dy,dx+3+random(),dy+3+random())
	stroke(color(40,50,180,ld == -1 ? 30+random(40) : 80+random(80))) ; line(dx+2,dy+4+random(),dx+5,dy+7+random())
	stroke(color(40,50,180,ld == -1 ? 30+random(40) : 80+random(80))) ; line(dx+4+random(),dy+2,dx+7+random(),dy+5)
	stroke(color(40,50,180,ld == -1 ? 30+random(40) : 80+random(80))) ; line(dx+6,dy+6,dx+9+random(),dy+9+random())
	stroke(color(0,0,0,50)) ; noFill()
	rect(dx,dy,xz,yz)
}