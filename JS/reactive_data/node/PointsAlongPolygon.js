NodeFactory.create.PointsAlongPolygon= function() {
	let node = new Node();

	node.inputs_ = {
		polygon : {
			type: '_Polygon',
			default: null,
			entry_uuid: null,
		},
		num_points : {
			type: 'number',
			default: 3,
			entry_uuid: null,
		},
		cap_ends : {
			type: 'boolean',
			default: true,
			entry_uuid: null,
		}
	};

	node.outputs_ = {
		output: {
			type: 'Array _2f',
			entry_uuid: null,
		},
	};

	node.func_ = function( i ) {
		let ps = new Array( i.num_points + 2 * i.cap_ends );
		let p = i.polygon;
		let spacing = 1.0 / (i.num_points + 1);

		for( let j = +i.cap_ends; j < ps.length - i.cap_ends; j++ ) {
			ps[j] = p.percent( (j + !i.cap_ends) * spacing );
		}


		if ( i.cap_ends ) {
			ps[0] = p.percent( 0.0 );
			ps[ps.length-1] = p.percent( 1.0 );
		}

		let o = {
			output: ps,
		};
		console.log(o);
		console.warn("WARN: PointsAlongPolygon.js: i.polygon.is_closed not being used. Fix that.");
		return o;
	}

	return node;
}