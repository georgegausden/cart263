let scene;
let camera;
let renderer;
let geometry;
let material;
let cube;

const geometry2 = new THREE.SphereGeometry( 15, 32, 16 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const sphere = new THREE.Mesh( geometry2, material2 );
scene.add( sphere );




function setupObjects(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	// geometry = new THREE.BoxGeometry();
	// material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	// cube = new THREE.Mesh( geometry, material );
	// scene.add( cube );
	camera.position.z = 5;
}



function animate() {
	requestAnimationFrame( animate );
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}

setupObjects();
animate();
