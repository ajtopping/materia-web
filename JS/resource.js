
// includes
//// types.js

var Resource = {

	PolygonTypeA: function() {
		let mesh = MeshFactory.Empty();

		mesh.vPosition = [
			_2f(0,0),
			_2f(-.1,.1),
			_2f(.3,.3),
			_2f(.2,.6),
			_2f(.7,.7),
			_2f(.72,.6),
			_2f(.4,.53),
			_2f(.45,.28),
			_2f(.9,.3),
			_2f(.85,.06),
			_2f(.45,.2),
			_2f(.3,.1),
			_2f(.5,.01)
		];

		mesh.vIndex = MeshFactory.ClosedLoopIndexArray(mesh.vPosition.length);

		return mesh;
	},

	SkeletonMeshTypeA: function() {
		let mesh = MeshFactory.Empty();

		mesh.vPosition = [
			_2f(.25,.05),
			_2f(.1,.1),
			_2f(.36,.25), // index: 2
			_2f(.8,.2),
			_2f(.65,.65),
			_2f(.31,.57)
		];

		mesh.vIndex = [
			_Edge(0,1),
			_Edge(1,2),
			_Edge(3,2),
			_Edge(4,5),
			_Edge(5,2)
		];

		return mesh;
	},

	SkeletonTypeA: function() {
		let skeleton = {};
		skeleton.pathes = [];

		skeleton.vPosition = [
			_2f(.25,.05),
			_2f(.1,.1),
			_2f(.36,.25), // index: 2
			_2f(.8,.2),
			_2f(.65,.65),
			_2f(.31,.57)
		];

		skeleton.pathes[0] = [0,1,2];
		skeleton.pathes[1] = [3,2];
		skeleton.pathes[2] = [5,4,2];

		return skeleton;
	},

	Empty: function() {
		let mesh = {};
		mesh.vPosition = [];
		mesh.vColor = [];
		mesh.vIndex = [];

		return mesh;
	}
}