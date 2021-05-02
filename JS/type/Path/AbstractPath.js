// Two or more vertexes with a spatial traversal described by an interpolation function
class _AbstractPath {

	constructor( verts=[] ) {
		if ( new.target === _AbstractPath ) {
			throw new TypeError("_AbstractPath : Cannot construct an abstract class.");
		}

		if ( this.position !== 'function' ) {
			throw new TypeError( new.target.name + ".position() : Is not a function or is undefined." );
		}

		if ( this.verify_ !== 'function' ) {
			throw new TypeError( new.target.name + ".verify_() : Is not a function or is undefined." );
		}

		if ( this.calculate_length_ !== 'function' ) {
			throw new TypeError( new.target.name + ".calculate_length_() : Is not a function or is undefined." );
		}

		this.verts_ = verts; //[_2f]
		this.verify_();
		this.calculate_length_(); // sets this.length_
	}

	get length() {
		return this.length_;
	}
}
