var MeshRenderer = {

	Wireframe: function( context, mesh, transform = new _Transform() ) {
		let vPositionLength = mesh.vPosition.length;
		let vIndexLength = mesh.vIndex.length;

		if ( vPositionLength < 2 ) {
			return;
		}

		context.beginPath();

		for (i=0; i < vIndexLength; i++) {
			let start = mesh.vPosition[mesh.vIndex[i].start];
			let end = mesh.vPosition[mesh.vIndex[i].end];

			start = transform.apply(start);
			end = transform.apply(end);

			context.moveTo( start.x, start.y);
			context.lineTo( end.x, end.y );
		}

		context.stroke();
	}
}

var EntityRenderer = {

	Wireframe: function( context, entity ) {
		MeshRenderer.Wireframe( context, entity.mesh, entity.transform );
	}
}