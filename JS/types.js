var _2f = function( xF, yF ) {
	return {x:xF,y:yF};
}

var _Edge = function( startIndex, endIndex ) {
	return { start:startIndex, end:endIndex };
}

var _Triangle = function( aIndex, bIndex ,cIndex ) {
	return {a:aIndex, b:bIndex, c:cIndex};
}

class _LineSegment {

	constructor( start_2f, end_2f ) {
		this.start = start_2f;
		this.end = end_2f;
	}
}

// A continuous series of straight lines
class _Polygon {

	constructor( verts=null, is_closed=true ) {
		this.is_closed_ = is_closed;
		this.copy_vertex_data_( verts ); // [_2f]
		this.calc_meta_data_();
	}

	copy_vertex_data_( _2f_arr ) {
		this.vertexes_ = new Array( _2f_arr===null ? 0 : _2f_arr.length );

		for (let i = 0; i < this.vertexes_.length; i++) {
			this.vertexes_[i] = Object.create( _2f_arr[i] );
		}
	}

	calc_meta_data_() {
		this.lengths_ = new Array( this.vertexes_.length )
		this.percents_ = new Array( this.vertexes_.length )

		this.total_length_ = 0.0;
		this.lengths_[0] = 0.0;
		this.percents_[0] = 0.0;

		for( let i = 1; i < this.lengths_.length; i++ ) {
			this.lengths_[i] = __Trig.dist( this.vertexes_[i-1], this.vertexes_[i] ) + this.lengths_[i-1];
		}

		if ( this.is_closed_ ) {
			this.total_length_ = __Trig.dist( this.vertexes_[this.lengths_.length - 1], this.vertexes_[0] ) + this.lengths_[this.lengths_.length-1];
		} else {
			this.total_length_ = this.lengths_[this.lengths_.length-1];
		}

		for( let i = 1; i < this.percents_.length; i++ ) {
			this.percents_[i] = this.lengths_[i] / this.total_length_;
		}
	}

	get is_closed {
		return this.is_closed_;
	}
	
	get length {
		return this.total_length_;
	}
}

// One or more _Polygon objects. Maintains traversal and length metadata
class _PolygonGroup {

}

class _Shape {

	constructor( paths_array ) {
		this.paths_ = paths_array;
		this.length_ = 0.0;
		this.
		this.calculate_length_and_percents_();
	}

	calculate_length_() {
		for( let i = 0; i < this.paths.length; i++ ) {
			this.length_ += this.paths[i].length
		}
	}

	get length {

	}
}

class _Transform {

	constructor( xF=0, yF=0, rF=0, sxF=1, syF=1 ) {
		this.pos = _2f(xF, yF);
		this.rot = rF;
		this.sca = _2f(sxF, syF);
	}

	apply( pos_2f ) {
		return this.translate_( this.rotate_( this.scale_( pos_2f ) ) );
	}

	rotate_( pos_2f ) {
		return _2f (
			Math.cos(this.rot) * pos_2f.x - Math.sin(this.rot) * pos_2f.y,
			Math.sin(this.rot) * pos_2f.x + Math.cos(this.rot) * pos_2f.y
		)
	}

	translate_( pos_2f ) {
		return _2f (
			pos_2f.x + this.pos.x,
			pos_2f.y + this.pos.y
		)
	}

	scale_( pos_2f ) {
		return _2f (
			pos_2f.x * this.sca.x,
			pos_2f.y * this.sca.y
		)
	}
}

class _Entity {
	constructor() {
		this.transform = new _Transform( 0, 0, 0 );
	}
}