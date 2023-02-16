// Get our container
var container = document.getElementById("threejs-container");

var scene, renderer, camera;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// Create some sample curves that can be used
var CinquefoilKnot = THREE.Curve.create(
	function( s ) {
		this.scale = ( s === undefined ) ? 10 : s;
	},
	function( t ) {
		var p = 2,
			q = 5;
		t *= Math.PI * 2;
		var tx = ( 2 + Math.cos( q * t ) ) * Math.cos( p * t ),
			ty = ( 2 + Math.cos( q * t ) ) * Math.sin( p * t ),
			tz = Math.sin( q * t );
		return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );
	}
);

var sampleClosedSpline = new CinquefoilKnot();

// Keep a dictionary of curve instances
var splines = {
  SampleClosedSpline: sampleClosedSpline
};

// Initialize our project and start animating
init();
animate();

// Setup our scene
function init() {

  scene = new THREE.Scene();

  // Add some lights
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 1);
  scene.add(light);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, -1);
  scene.add(light);

  //
  // Use the plugin to follow the curve
  camera = initFollowCamera(scene, 0);

  addTube(splines["SampleClosedSpline"], 100, true, 6, null, null, THREE.BackSide, 0x2194ce);

  //

  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //

  window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function animate() {

  requestAnimationFrame(animate);

  render();

}

function render() {

  // Any other rendering you want to do

  renderFollowCamera();

  renderer.render(scene, splineCamera);

}