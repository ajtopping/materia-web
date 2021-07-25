NodeFactory.create.RandomScaleByNormal= function() {
	let node = new Node();

	node.inputs_ = {
		polygon : {
			type: '_Polygon',
			default: null,
			entry_uuid: null,
		},
		min : {
			type: 'number',
			default: 0.0,
			entry_uuid: null,
		},
		max : {
			type: 'number',
			default: 1.0,
			entry_uuid: null,
		}
	};

	node.outputs_ = {
		output: {
			type: '_Polygon',
			entry_uuid: null,
		},
	};

	node.func_ = function( i ) {
		let v = new Array(i.polygon.vertexes.length);
		let delta = i.max - i.min;
		for( let j = 0; j < i.polygon.vertexes.length; j++ ) {
			let scale = Math.random() * delta + i.min;
			let nrm = i.polygon.normals[j];
			nrm.x *= scale;
			nrm.y *= scale;
			v[j] = new _2f(i.polygon.vertexes[j].x + nrm.x, i.polygon.vertexes[j].y + nrm.y);
		}

		let o = {
			output: new _Polygon( v, i.polygon.is_closed ),
		};
		console.log(o);
		return o;
	}

	return node;
}