var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var mesh = MeshFactory.Rectangle(100,100);
var ngon = MeshFactory.Ngon(100, 8);

var polyMeshA = Resource.PolygonTypeA();
var skelMeshA = Resource.SkeletonMeshTypeA();
var transformA = new _Transform(200,250,0,300,300);

MeshRenderer.Wireframe( context, mesh, new _Transform(150,150, 90*Math.PI/180) );
MeshRenderer.Wireframe( context, ngon, new _Transform(150,150) );
MeshRenderer.Wireframe( context, polyMeshA, transformA );
MeshRenderer.Wireframe( context, skelMeshA, transformA );

//carveVolume = new _CarveVolume(ngon);
//test_edge = new _LineSegment( _2f(-150,0), _2f(100,120) );
//intersections = carveVolume.generateIntersectionVertexes( test_edge );


function drawLineSegment( line, transform, context) {
	context.beginPath();
	context.moveTo( line.start.x + transform.pos.x, line.start.y + transform.pos.y);
	context.lineTo( line.end.x + transform.pos.x, line.end.y + transform.pos.y);
	context.stroke();
}

function drawCircle( pos, context ) {
	context.beginPath();
	context.arc( pos.x, pos.y, 5, 0, 2 * Math.PI);
	context.stroke();
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}

canvas.addEventListener('mousedown', function(evt) {
	var mousePos = getMousePos(canvas, evt);
	drawCircle( mousePos, context );
}, false);