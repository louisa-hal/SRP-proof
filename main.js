//Make global vars
let scene, camera, renderer, sphere, mouse, raycaster, intersects;

function init() {
    scene = new THREE.Scene();

    // Go on three docs to find how 2 use func
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true});

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry( 3, 32, 32 );

    const material = new THREE.MeshBasicMaterial( {color: 0x004787} );
    sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );

    // Camera originates at same point as box geo - have to move
    camera.position.z = 15;
    camera.position.x = 2;
}


function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

// function raycast() {
//     const raycaster = new THREE.Raycaster();
//     const Origin = new THREE.Vector3(0,0,15);
//     const Direction = new THREE.Vector3();
// }

raycaster = new THREE.Raycaster();
mouse = new THREE.Vector2();

function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


}

function render() {

	// update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );


	for ( let i = 0; i < intersects.length; i ++ ) {

        console.log(intersects[i]);
		intersects[ i ].object.material.color.set( 0xff0880 );

	}

	renderer.render( scene, camera );

}


window.addEventListener( 'mousemove', onMouseMove, false );

window.requestAnimationFrame(render);

function findSRP() {
    let G1 = intersects.distance;
    console.log(G1);
}

findSRP();

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

init();
animate();