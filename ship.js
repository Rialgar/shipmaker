"use strict";

window.ShipGeometry = function( params ) {

	THREE.Geometry.call( this );
	
	var scope = this;

	var sqr = Math.sqrt( 0.75 ) / 3;

	this.vertices.push( new THREE.Vector3( 2*sqr,  0.0,  -sqr ) );
	this.vertices.push( new THREE.Vector3(  -sqr,  0.5,  -sqr ) );
	this.vertices.push( new THREE.Vector3(  -sqr, -0.5,  -sqr ) );
	this.vertices.push( new THREE.Vector3(   0.0,  0.0, 2*sqr ) );

	var uva, uvb, uvc;

	//-----------------------------BOTTOM-----------------------------

	uva = new THREE.Vector2( 0.25,       0 );
	uvb = new THREE.Vector2( 0   , sqr*3/2 );
	uvc = new THREE.Vector2( 0.5 , sqr*3/2 );

	addFace( 0, 2, 1, uva, uvb, uvc, 0);

	//------------------------------SIDE------------------------------

	uva = new THREE.Vector2(  0.75, 0       );
	uvb = new THREE.Vector2(  0.5 , sqr*3/2 );
	uvc = new THREE.Vector2(  1.0 , sqr*3/2 );

	addFace( 0, 1, 3, uva, uvb, uvc, 1);

	//------------------------------SIDE------------------------------

	uva = new THREE.Vector2(  0.25, 0.5           );
	uvb = new THREE.Vector2(  0   , 0.5 + sqr*3/2 );
	uvc = new THREE.Vector2(  0.5 , 0.5 + sqr*3/2 );

	addFace( 1, 2, 3, uva, uvb, uvc, 2);

	//------------------------------SIDE------------------------------

	uva = new THREE.Vector2(  0.75, 0.5           );
	uvb = new THREE.Vector2(  0.5 , 0.5 + sqr*3/2 );
	uvc = new THREE.Vector2(  1.0 , 0.5 + sqr*3/2 );
	addFace( 2, 0, 3, uva, uvb, uvc, 3);

	function addFace(a, b, c, uva, uvb, uvc, materialIndex) {
		var A = scope.vertices[a];
		var B = scope.vertices[b];
		var C = scope.vertices[c];

		var normal = new THREE.Vector3();
		normal.crossVectors(B.clone().sub(A), C.clone().sub(A));
		normal.normalize();

		var face = new THREE.Face3( a, b, c );
		face.normal.copy( normal );
		face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
		face.materialIndex = materialIndex;
		scope.faces.push( face );

		scope.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc ] );
	}
}

ShipGeometry.prototype = Object.create( THREE.Geometry.prototype );	