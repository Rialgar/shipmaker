"use strict";

window.ShipGeometry = function( params ) {

	THREE.Geometry.call( this );

	var sqr = Math.sqrt( 0.75 ) / 3;

	var A = new THREE.Vector3( 2*sqr,  0.0,  -sqr );
	var B = new THREE.Vector3(  -sqr,  0.5,  -sqr );
	var C = new THREE.Vector3(  -sqr, -0.5,  -sqr );
	var D = new THREE.Vector3(   0.0,  0.0, 2*sqr );

	this.vertices.push( A );
	this.vertices.push( B );
	this.vertices.push( C );
	this.vertices.push( D );

	var normal = new THREE.Vector3();
	var face, uva, uvb, uvc;

	//-----------------------------BOTTOM-----------------------------

	normal.crossVectors(C.clone().sub(A), B.clone().sub(A));
	normal.normalize();

	face = new THREE.Face3( 0, 2, 1 );
	face.normal.copy( normal );
	face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
	face.materialIndex = 0;
	this.faces.push( face );

	uva = new THREE.Vector2( 0.25,       0 );
	uvb = new THREE.Vector2( 0   , sqr*3/2 );
	uvc = new THREE.Vector2( 0.5 , sqr*3/2 );
	this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc ] );

	console.log(this);

	//------------------------------SIDE------------------------------

	normal.crossVectors(B.clone().sub(A), D.clone().sub(A));
	normal.normalize();

	face = new THREE.Face3( 0, 1, 3 );
	face.normal.copy( normal );
	face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
	face.materialIndex = 1;
	this.faces.push( face );

	uva = new THREE.Vector2(  0.75, 0       );
	uvb = new THREE.Vector2(  0.5 , sqr*3/2 );
	uvc = new THREE.Vector2(  1.0 , sqr*3/2 );
	this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc ] );

	//------------------------------SIDE------------------------------

	normal.crossVectors(C.clone().sub(B), D.clone().sub(B));
	normal.normalize();

	face = new THREE.Face3( 1, 2, 3 );
	face.normal.copy( normal );
	face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
	face.materialIndex = 2;
	this.faces.push( face );

	uva = new THREE.Vector2(  0.25, 0.5           );
	uvb = new THREE.Vector2(  0   , 0.5 + sqr*3/2 );
	uvc = new THREE.Vector2(  0.5 , 0.5 + sqr*3/2 );
	this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc ] );

	//------------------------------SIDE------------------------------

	normal.crossVectors(A.clone().sub(C), D.clone().sub(C));
	normal.normalize();

	face = new THREE.Face3( 2, 0, 3 );
	face.normal.copy( normal );
	face.vertexNormals.push( normal.clone(), normal.clone(), normal.clone() );
	face.materialIndex = 3;
	this.faces.push( face );

	uva = new THREE.Vector2(  0.75, 0.5           );
	uvb = new THREE.Vector2(  0.5 , 0.5 + sqr*3/2 );
	uvc = new THREE.Vector2(  1.0 , 0.5 + sqr*3/2 );
	this.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc ] );
}

ShipGeometry.prototype = Object.create( THREE.Geometry.prototype );	