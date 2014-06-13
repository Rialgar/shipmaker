function init(){
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var capsule = new THREE.Object3D();
	scene.add(capsule);

	var geometry = new ShipGeometry();
	var material = new THREE.MeshPhongMaterial( {
		ambient: 0x202020,
		color: 0xdddddd,
		specular: 0xdddddd,
		shininess: 30,
		shading: THREE.FlatShading
	}); 
	var mesh = new THREE.Mesh(geometry, material);
	capsule.add(mesh);

	//capsule.add( new THREE.FaceNormalsHelper( mesh ) );

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight.position.set( 0, 1, 1 );
	scene.add( directionalLight );

	camera.position.z = 7;

	var render = function () {
		requestAnimationFrame(render);

		capsule.rotation.x += 0.01;
		capsule.rotation.y += 0.02;

		renderer.render(scene, camera);
	};

	render();
}