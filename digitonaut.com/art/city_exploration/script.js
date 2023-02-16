// Three JS
window.addEventListener('load', init, false);
function init() {
  createWorld();
  createLights();
  createGrid();
  createPrimitive();
  createNave();
  createParticles();
  //---
  animation();
}

var Theme = {
  primary: 0xFFFFFF,
  secundary: 0x00FFFF,
  background: 0x0055FF,
  darker: 0xF000F0
};

//--------------------------------------------------------------------
var scene, camera, renderer, container;
var _width, _height;
var gridHelper;
var controls;
var _primitive = new THREE.Group();
var _myplane = new THREE.Group();
var _guide = new THREE.Group();
var _particles = new THREE.Group();
function createWorld() {
  _width = window.innerWidth;
  _height= window.innerHeight;
  //---
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(Theme.background, 5, 20);
  scene.background = new THREE.Color(Theme.background);
  //---
  camera = new THREE.PerspectiveCamera(20, _width/_height, 1, 1000);
  camera.position.set(7,5,7);
  camera.rotation.x = 30 * Math.PI / 180;
  //---
  renderer = new THREE.WebGLRenderer({antialias:false, alpha:false});
  renderer.setSize(_width, _height);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping.type = THREE.NoToneMapping;
  renderer.shadowMap.needsUpdate = true;
  //---
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableZoom = false;
  controls.update();
  document.body.appendChild(renderer.domElement);
  //---
  window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
  _width = window.innerWidth;
  _height = window.innerHeight;
  renderer.setSize(_width, _height);
  camera.aspect = _width / _height;
  camera.updateProjectionMatrix();
}
//--------------------------------------------------------------------
var _ambientLights, _lights;
function createLights() {
  //_ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
  _ambientLights = new THREE.HemisphereLight(Theme.primary, Theme.background, 2);
  _lights = new THREE.SpotLight(Theme.primary, 1, 200);
  _lights.castShadow = true;
  _lights.shadow.mapSize.width = 8000;
  _lights.shadow.mapSize.height = _lights.shadow.mapSize.width;
  _lights.penumbra = 0.8;
  _lights.position.set(10,20,20);
  scene.add(_lights);
  scene.add(_ambientLights);
}
function mathRandom(num = 10) {
  var numValue = - Math.random() * num + Math.random() * num;
  return numValue;
};
//--------------------------------------------------------------------

function createPrimitive() {
  var mesh_mat = new THREE.MeshPhysicalMaterial({color:Theme.darker, flatShading:true});
  var mesh_wat = new THREE.MeshBasicMaterial({color:Theme.secundary, wireframe:true});
  //---
  for (var i= 0; i<=30; i++) {
    var s = Math.abs(2+mathRandom(3));
    var t = Math.abs(0.9+mathRandom(0));
    var mesh_geo = new THREE.CubeGeometry(t,s,t);
    var mesh_pri = new THREE.Mesh(mesh_geo, mesh_mat);
    var mesh_wir = new THREE.Mesh(mesh_geo, mesh_wat);
    mesh_pri.castShadow = true;
    mesh_pri.receiveShadow = true;
    mesh_pri.position.y = s - (mesh_pri.geometry.parameters.height/2);
    mesh_pri.add(mesh_wir);
    _primitive.add(mesh_pri);
  }
  _primitive.position.y = 0;
  scene.add(_primitive);
}
function createNave() {
  var mesh_mat = new THREE.MeshPhongMaterial( {color:Theme.background, side: THREE.DoubleSide, flatShading:true});
  var mesh_geo = new THREE.CubeGeometry(0.5, 0.5, 0.5);
  var mesh_pri = new THREE.Mesh(mesh_geo, mesh_mat);
  mesh_pri.castShadow = true;
  mesh_pri.receiveShadow = true;
  //---
  var plan_geo = new THREE.OctahedronGeometry(0.43, 1);
  var plan_mat = new THREE.MeshPhongMaterial( {color:Theme.background, side: THREE.DoubleSide, flatShading:true});
  var plan_mes = new THREE.Mesh(plan_geo, plan_mat);
  //plan_mes.rotation.z = 90 * Math.PI / 180;
  plan_mes.castShadow = true;
  plan_mes.receiveShadow = true;
  //---
  var part_geo = new THREE.OctahedronGeometry(0.05, 1);
  var part_mes = new THREE.Mesh(part_geo, plan_mat);
  
  part_mes.castShadow = true;
  part_mes.receiveShadow = true;
  
  //_guide.add(part_mes);
  //---
  plan_mes.scale.set(0,0,0);
  mesh_pri.scale.set(0,0,0);
  
  TweenMax.to(plan_mes.scale, 1, {x:1, y:1, z:1, repeat:-1, yoyo:true, ease:Elastic.easeInOut});
  TweenMax.to(mesh_pri.scale, 1, {x:1, y:1, z:1, repeat:-1, yoyo:true, delay:1, ease:Elastic.easeInOut});
  
  //---
  _myplane.add(plan_mes);
  _myplane.add(mesh_pri);
  _myplane.position.z = 0.5;
  scene.add(_guide);
  scene.add(_myplane);
}
//--------------------------------------------------------------------
function createParticles() {
  var s = 0.01;
  var part_mat = new THREE.MeshNormalMaterial();
  var part_geo = new THREE.CubeGeometry(s,s,s);
  
  for(var i= 0; i<50; i++) {
    var p = 20;
    var part_mes = new THREE.Mesh(part_geo, part_mat);
    part_mes.vel = mathRandom() / 10;
    part_mes.amp = mathRandom();
    part_mes.position.set(mathRandom(p),mathRandom(p),mathRandom(p));
    _particles.add(part_mes);
  }
  //scene.add(_particles);
}

//--------------------------------------------------------------------

function animation() {
  var a = 20;
  var v = 0.1;
  var time = Date.now() *0.003;
  for ( let i = 0, l = _primitive.children.length; i < l; i ++ ) {
    var object = _primitive.children[ i ];
    object.position.z += v;
    if (object.position.z > 10) {
      object.position.z = -20+Math.round(mathRandom());
      object.position.x = Math.round(mathRandom());
    }
  }
  _particles.rotation.x += v/5;
  //---
  for ( let i = 0, l = _particles.children.length; i < l; i ++ ) {
    var object = _particles.children[ i ];
    object.position.x = Math.sin(time * object.vel) * object.amp;
    object.position.y = Math.cos(time * object.vel) * object.amp;
    object.position.z = Math.tan(time * object.vel) * object.amp;
  }
  //---
  _myplane.position.x = Math.sin(time / 2.3) * (a / 10);
  _myplane.position.y = (Math.cos(time / 2) * (a / 15))+2;
  _myplane.rotation.z = (Math.sin(time / 2.3) * a) * Math.PI / 180;
  _myplane.rotation.y = (-Math.cos(time / 2.3) * a) * Math.PI / 180;
  _myplane.rotation.x += 0.1;
  
  _guide.position.y = _myplane.position.y;
  _guide.position.x = _myplane.position.x + Math.sin(time) * 1;
  _guide.position.z = _myplane.position.z + Math.cos(time) * 1;
  
  _lights.lookAt(scene.position);
  //_lights.position = _myplane.position;
  
  /*TweenMax.to(_guide.position, 1, {
    y:_myplane.position.y+1,
    x:_myplane.position.x,
    delay:0.1
  })*/
  gridHelper.position.z += v;
  if (gridHelper.position.z >= 1) gridHelper.position.z = 0.1;
  
  controls.update();
  camera.lookAt(_myplane.position);
  requestAnimationFrame(animation);
  renderer.render(scene, camera);
}

function createGrid() {
  gridHelper = new THREE.GridHelper(30, 100, 0x888888, 0x888888);
  gridHelper.position.y = 0;
  scene.add(gridHelper);
  //---
  var plane_geo = new THREE.PlaneGeometry(50,50);
  var plane_mat = new THREE.MeshLambertMaterial({color:Theme.darker});
  var plane_mes = new THREE.Mesh(plane_geo, plane_mat);
  plane_mes.castShadow = false;
  plane_mes.receiveShadow = true;
  plane_mes.rotation.x = -90 * Math.PI / 180;
  scene.add(plane_mes);
  
}