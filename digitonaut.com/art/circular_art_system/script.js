var colors1 = "423e3b-ff2e00-fea82f-fffecb-5448c8-fff".split("-").map(a=>"#"+a)
var colors2 = "ff934f-ff206e-fbff12-41ead4-ffffff".split("-").map(a=>"#"+a)
let overAllTexture
function setup() {
	fullScreen();
	background(100)
	push()
		fill(0);
		rect(0,0,width,height)	
		translate(width/2,height/2)
		divAng(0,min(width,height)*1.1,0,PI*2,12,colors1)
	pop()
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	// noStroke()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,50,100])))
		}
	}
	overAllTexture.updatePixels()
	push()
		blendMode(MULTIPLY)
		image(overAllTexture,0,0)
	pop()
}

function divAng(stR,edR,stAng,edAng,d,colors){
	if (random()<0.2){
		colors=random([colors1,colors2])
	}
	push()
		// scale(random(1,1.002))
		rotate(random(-0.5,0.5))
		// scale(1.02)
		// translate(random(-5,5),random(-5,5))
		let ww =pow(( edR-stR),1.3-d/4)*random()
		// stAng*=1.02
		// edAng*=0.98
		let cc = color(random(colors))
		// if (random()<0.7){
		// 	blendMode(SCREEN)
		// 	cc.setAlpha(150)
		// }else{
		// 	blendMode(BLEND)
		// }
		stroke(cc)
		strokeWeight( ww )
		strokeCap(SQUARE);
		let rr = edR
		noFill()
		arc(0,0,stR,stR,stAng,edAng)
		let xx1 =(stR-0.5)*cos(stAng)
		let yy1 =(stR-0.5)*sin(stAng)
		let xx2 =(stR-0.5)*cos(edAng)
		let yy2 =(stR-0.5)*sin(edAng)
		push()
			noStroke()
			fill(cc)
			ellipse(xx1,yy1,5)
			ellipse(xx2,yy2,5)
		pop()
		
		for(var i=0;i<10;i++){
			fill(cc)
			noStroke()
			ellipse(random(-stR/2,stR/2)+xx1,
					 	 random(-stR/2,stR/2)+yy1,
						  random(5))
		}
		if (random()<1){
			strokeWeight(1)
			stroke(cc)
			line(xx1,yy1,xx2,yy2)
			// line(xx1,yy1,xx2,yy2)
		}
	
		if ( random()<0.30){
			d-=1
			// return
		}
		push()
		if (random()<0.05){
			stroke(cc)
			strokeWeight(random(3))
			noFill()
			ellipse(0,0,rr,rr)
		}
		pop()
		let ratio = random(0.3,0.7)
		if (d>0){
			if (random()<0.35){
				let splitNum =random([2,2,2,2,2,3])
				for(var o=1;o<=splitNum;o++){
					
				divAng(stR,edR,
							 stAng+(o-1)*(edAng-stAng)/splitNum,
							 stAng+o*(edAng-stAng)/splitNum,d-1)
				}
				// divAng(stR,edR,
				// 			 stAng,
				// 			 stAng+ratio*(edAng-stAng),d-1)
				// divAng(stR,edR,
				// 			 stAng+ratio*(edAng-stAng),
				// 			 edAng,d-1)
			}else{
				divAng(stR,stR+ratio*(edR-stR),
							 stAng,edAng,d-1)
				divAng(stR+ratio*(edR-stR),edR,
							 stAng,edAng,d-1)

			}

		}
	pop()
	
}
// function mousePressed(){
// 	save()
// }

function draw() {
	if (frameCount%100==0){
		push()
			fill(0);
			rect(0,0,width,height)	
			translate(width/2,height/2)
			divAng(0,width*1.1,0,PI*2,12,colors1)
		pop()
		push()
			blendMode(MULTIPLY)
			image(overAllTexture,0,0)
		pop()
	}
	// for(var i=0;i<10;i++){
		
	// }
	// ellipse(mouseX, mouseY, 20, 20);
}