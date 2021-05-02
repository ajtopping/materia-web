// Two or more vertexes with a spatial traversal described by an interpolation function
class _AbstractPath {

	constructor( verts=[] ) {
		if ( new.target === _AbstractPath ) {
			throw new TypeError("_AbstractPath : Cannot construct an abstract class.");
		}

		if ( this.position !== 'function' ) {
			throw new TypeError( new.target.name + ".position() : Is not a function or is undefined." );
		}

		if ( this.calculate_length_ !== 'function' ) {
			throw new TypeError( new.target.name + ".calculate_length_() : Is not a function or is undefined." );
		}

		this.verts = verts; //[_2f]
		this.calculate_length_();
	}
}
