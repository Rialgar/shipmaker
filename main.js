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

	window.addEventListener("resize", onResize);

	document.getElementById("button").addEventListener("click", function(){
		document.getElementById("sidebar").classList.toggle("active");
	});

	var tabs = document.getElementById("sidebarTabs");
	var tabContents = document.getElementById("sidebarTabContent");

	var activeTab = tabs.getElementsByClassName("active")[0];
	var activeTabContent = tabContents.getElementsByClassName("active")[0];

	for (var i = 0; i < tabs.children.length; i++) {
		tabs.children[i].addEventListener("click", function(e){
			activeTab.classList.toggle("active");
			this.classList.toggle("active");
			activeTab = this;

			activeTabContent.classList.toggle("active");
			activeTabContent = document.getElementById(activeTab.getAttribute("data-tab"));
			activeTabContent.classList.toggle("active");

			e.preventDefault();
		});
	};

	$('.slider').slider().on("slide", function(e){
		var param = $(this).data("param").split(",");

		var params = {};
		var p = params;
		for( var i = 0; i < param.length - 1; i++ ) {
			p[ param[ i ] ] = {};
			p = p[ param[ i ] ];
		};
		p[ param[ param.length - 1 ] ] = e.value;

		console.log(param, e.value, params);

		geometry.setParams(params);
	});

	$('.slider').css("width", "100%");

	render();

	function onResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth/window.innerHeight;
		camera.updateProjectionMatrix();
	}

	function render () {
		requestAnimationFrame(render);

		capsule.rotation.x += 0.01;
		capsule.rotation.y += 0.02;

		renderer.render(scene, camera);
	};
}