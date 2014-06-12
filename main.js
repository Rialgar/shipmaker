function init(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var capsule = new THREE.Object3D();
	scene.add(capsule);

	var geometry = new ShipGeometry();
	var material = new THREE.MeshFaceMaterial([
		new THREE.MeshBasicMaterial({color: 0xff0000}),
		new THREE.MeshBasicMaterial({color: 0x00ff00}),
		new THREE.MeshBasicMaterial({color: 0x0000ff}),
		new THREE.MeshBasicMaterial({color: 0xffff00})
	]);
	var mesh = new THREE.Mesh(geometry, material);
	capsule.add(mesh);

	capsule.add( new THREE.FaceNormalsHelper( mesh ) );

	camera.position.z = 5;

	var render = function () {
		requestAnimationFrame(render);

		capsule.rotation.x += 0.01;
		capsule.rotation.y += 0.02;

		renderer.render(scene, camera);
	};

	render();
}