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