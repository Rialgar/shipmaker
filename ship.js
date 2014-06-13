"use strict";

window.ShipGeometry = function( params ) {

	THREE.Geometry.call( this );
	
	var scope = this;

	params = params || {};

	var center = params.center || new THREE.Vector3(0, 1, 0);

	params.main = params.main || {};
	params.main.center = center;
	makePylon(params.main);

	var p = params.weapon || {};
	p.length = p.length || 2;
	p.radius = p.radius || 0.7

	var offset = p.offset || new THREE.Vector3( 2, -0.75, 0 ); 
	p.center = center.clone();
	p.center.add(offset);
	makePylon(p);

	offset.x *= -1;
	p.center = center.clone();
	p.center.add(offset);
	makePylon(p);

	p = params.drive || {};
	p.length = p.length || 1;
	p.radius = p.radius || 0.8;

	var offset = p.offset || new THREE.Vector3( 1, -3.2, 0 ); 
	p.center = center.clone();
	p.center.add(offset);
	makePylon(p);

	offset.x *= -1;
	p.center = center.clone();
	p.center.add(offset);
	makePylon(p);

	makeBox([30, 36, 26, 20, 31, 37, 25, 19]);

	var conscale = params.connectionScale || 0.5;

	var top    = scope.vertices[44].z;
	var bottom = scope.vertices[45].z;
	var left   = Math.min(scope.vertices[57].x, scope.vertices[12].x);
	var right  = Math.max(scope.vertices[43].x, scope.vertices[8].x);
	var front  = Math.max(scope.vertices[42].y, scope.vertices[43].y);
	var back   = scope.vertices[43].y + (scope.vertices[49].y-scope.vertices[43].y)*conscale;
	makeSixPrism([
		12,
		new THREE.Vector3(left, front, top),
		new THREE.Vector3(left, back, top),
		new THREE.Vector3(right, back, top),
		new THREE.Vector3(right, front, top),
		8,

		11,
		new THREE.Vector3(left, front, bottom),
		new THREE.Vector3(left, back, bottom),
		new THREE.Vector3(right, back, bottom),
		new THREE.Vector3(right, front, bottom),
		9
	]);

	scope.computeFaceNormals();
	scope.computeVertexNormals();

	function makePylon( params ) {

		params = params || {};

		var r = params.radius || 1;
		var l = params.length || 3.5;
		var h = params.tipHeight || 0.8;
		var c = params.center || new THREE.Vector3();

		var sqr = Math.sqrt( 0.75 );

		var o = scope.vertices.length;
		console.log(o,l,c);

		scope.vertices.push( new THREE.Vector3(  0    ,  l/2 + h,  0   ).add(c) );

		scope.vertices.push( new THREE.Vector3(  0    ,  l/2    ,  r   ).add(c) );
		scope.vertices.push( new THREE.Vector3(  r*sqr,  l/2    ,  r/2 ).add(c) );
		scope.vertices.push( new THREE.Vector3(  r*sqr,  l/2    , -r/2 ).add(c) );
		scope.vertices.push( new THREE.Vector3(  0    ,  l/2    , -r   ).add(c) );
		scope.vertices.push( new THREE.Vector3( -r*sqr,  l/2    , -r/2 ).add(c) );
		scope.vertices.push( new THREE.Vector3( -r*sqr,  l/2    ,  r/2 ).add(c) );

		scope.vertices.push( new THREE.Vector3(  0    , -l/2    ,  r   ).add(c) );
		scope.vertices.push( new THREE.Vector3(  r*sqr, -l/2    ,  r/2 ).add(c) );
		scope.vertices.push( new THREE.Vector3(  r*sqr, -l/2    , -r/2 ).add(c) );
		scope.vertices.push( new THREE.Vector3(  0    , -l/2    , -r   ).add(c) );
		scope.vertices.push( new THREE.Vector3( -r*sqr, -l/2    , -r/2 ).add(c) );
		scope.vertices.push( new THREE.Vector3( -r*sqr, -l/2    ,  r/2 ).add(c) );

		scope.vertices.push( new THREE.Vector3(  0    , -l/2 - h,  0   ).add(c) );

		var uva, uvb, uvc;

		uva = new THREE.Vector2( 0,0 );
		uvb = new THREE.Vector2( 0,1 );
		uvc = new THREE.Vector2( 1,1 );

		addFace(  0+o,  1+o,  2+o, uva, uvb, uvc, 0);
		addFace(  0+o,  2+o,  3+o, uva, uvb, uvc, 0);
		addFace(  0+o,  3+o,  4+o, uva, uvb, uvc, 0);
		addFace(  0+o,  4+o,  5+o, uva, uvb, uvc, 0);
		addFace(  0+o,  5+o,  6+o, uva, uvb, uvc, 0);
		addFace(  0+o,  6+o,  1+o, uva, uvb, uvc, 0);

		addFace(  1+o,  7+o,  2+o, uva, uvb, uvc, 0);
		addFace(  7+o,  8+o,  2+o, uva, uvb, uvc, 0);

		addFace(  2+o,  8+o,  3+o, uva, uvb, uvc, 0);
		addFace(  8+o,  9+o,  3+o, uva, uvb, uvc, 0);

		addFace(  3+o,  9+o,  4+o, uva, uvb, uvc, 0);
		addFace(  9+o, 10+o,  4+o, uva, uvb, uvc, 0);

		addFace(  4+o, 10+o,  5+o, uva, uvb, uvc, 0);
		addFace( 10+o, 11+o,  5+o, uva, uvb, uvc, 0);

		addFace(  5+o, 11+o,  6+o, uva, uvb, uvc, 0);
		addFace( 11+o, 12+o,  6+o, uva, uvb, uvc, 0);

		addFace(  6+o, 12+o,  1+o, uva, uvb, uvc, 0);
		addFace( 12+o,  7+o,  1+o, uva, uvb, uvc, 0);

		addFace( 13+o,  8+o,  7+o, uva, uvb, uvc, 0);
		addFace( 13+o,  9+o,  8+o, uva, uvb, uvc, 0);
		addFace( 13+o, 10+o,  9+o, uva, uvb, uvc, 0);
		addFace( 13+o, 11+o, 10+o, uva, uvb, uvc, 0);
		addFace( 13+o, 12+o, 11+o, uva, uvb, uvc, 0);
		addFace( 13+o,  7+o, 12+o, uva, uvb, uvc, 0);
	}

	function makeBox(points) {
		for(var i = 0; i < points.length; i++){
			if(points[i].constructor === THREE.Vector3){
				points[i] = scope.vertices.push(points[i]) - 1;
			}
		}
		var tfl = points[0],
			tbl = points[1],
			tbr = points[2],
			tfr = points[3],
			bfl = points[4],
			bbl = points[5],
			bbr = points[6],
			bfr = points[7];

		var uva, uvb, uvc;

		uva = new THREE.Vector2( 0,0 );
		uvb = new THREE.Vector2( 0,1 );
		uvc = new THREE.Vector2( 1,1 );

		addFace(tfl, tbl, tfr, uva, uvb, uvc, 1);
		addFace(tfr, tbl, tbr, uva, uvb, uvc, 1);

		addFace(bbl, bfl, bfr, uva, uvb, uvc, 1);
		addFace(bbl, bfr, bbr, uva, uvb, uvc, 1);

		addFace(tfl, tfr, bfl, uva, uvb, uvc, 1);
		addFace(bfl, tfr, bfr, uva, uvb, uvc, 1);

		addFace(tbr, tbl, bbl, uva, uvb, uvc, 1);
		addFace(tbr, bbl, bbr, uva, uvb, uvc, 1);
	}

	function makeSixPrism(points){
		for(var i = 0; i < points.length; i++){
			if(points[i].constructor === THREE.Vector3){
				points[i] = scope.vertices.push(points[i]) - 1;
			}
		}
		var p = points;

		var uva, uvb, uvc;

		uva = new THREE.Vector2( 0,0 );
		uvb = new THREE.Vector2( 0,1 );
		uvc = new THREE.Vector2( 1,1 );

		addFace(p[ 0], p[ 1], p[ 2], uva, uvb, uvc, 2);
		addFace(p[ 0], p[ 2], p[ 3], uva, uvb, uvc, 2);
		addFace(p[ 0], p[ 3], p[ 5], uva, uvb, uvc, 2);
		addFace(p[ 3], p[ 4], p[ 5], uva, uvb, uvc, 2);

		addFace(p[ 7], p[ 6], p[ 8], uva, uvb, uvc, 2);
		addFace(p[ 8], p[ 6], p[ 9], uva, uvb, uvc, 2);
		addFace(p[ 9], p[ 6], p[11], uva, uvb, uvc, 2);
		addFace(p[10], p[ 9], p[11], uva, uvb, uvc, 2);

		addFace(p[ 0], p[ 6], p[ 7], uva, uvb, uvc, 2);
		addFace(p[ 0], p[ 7], p[ 1], uva, uvb, uvc, 2);

		addFace(p[ 1], p[ 7], p[ 8], uva, uvb, uvc, 2);
		addFace(p[ 1], p[ 8], p[ 2], uva, uvb, uvc, 2);

		addFace(p[ 2], p[ 8], p[ 9], uva, uvb, uvc, 2);
		addFace(p[ 2], p[ 9], p[ 3], uva, uvb, uvc, 2);

		addFace(p[ 3], p[ 9], p[10], uva, uvb, uvc, 2);
		addFace(p[ 3], p[10], p[ 4], uva, uvb, uvc, 2);

		addFace(p[ 4], p[10], p[11], uva, uvb, uvc, 2);
		addFace(p[ 4], p[11], p[ 5], uva, uvb, uvc, 2);

		addFace(p[ 5], p[11], p[ 6], uva, uvb, uvc, 2);
		addFace(p[ 5], p[ 6], p[ 0], uva, uvb, uvc, 2);
	}

	function addFace(a, b, c, uva, uvb, uvc, materialIndex) {
		var face = new THREE.Face3( a, b, c );
		face.materialIndex = materialIndex;
		scope.faces.push( face );

		scope.faceVertexUvs[ 0 ].push( [ uva, uvb, uvc ] );
	}
}

ShipGeometry.prototype = Object.create( THREE.Geometry.prototype );	