
// includes
//// types.js

var MeshFactory = {

	ClosedLoopIndexArray: function( numVertexes ) {
		let indexes = new Array( numVertexes );
		for(i=0; i < numVertexes; i++) {
			indexes[i] = _Edge(i,i+1);
		}

		indexes[ indexes.length - 1].end = 0; // Close the loop

		return indexes;
	},

	Rectangle: function( width, height ) {
		let mesh = MeshFactory.Empty();
		let hw = width/2;
		let hh = height/2;

		mesh.vPosition = [
			_2f(-hw,-hh),
			_2f(hw,-hh),
			_2f(hw,hh),
			_2f(-hw,hh)
		];

		mesh.vIndex = this.ClosedLoopIndexArray( mesh.vPosition.length );

		return mesh;
	},

	Ngon: function( radius, numSides ) {

		if ( numSides < 3 ) {
			return;
		}

		let angle = Math.PI * 2/numSides;
		let mesh = MeshFactory.Empty();
		mesh.vPosition = new Array(numSides);

		for(i=0; i < numSides; i++) {
			mesh.vPosition[i] = _2f( Math.sin(angle*i) * radius, Math.cos(angle*i) * radius);
		}

		mesh.vIndex = this.ClosedLoopIndexArray( mesh.vPosition.length );

		return mesh;
	},

	Empty: function() {
		let mesh = {};
		mesh.vPosition = [];
		mesh.vColor = [];
		mesh.vIndex = [];

		return mesh;
	}
}