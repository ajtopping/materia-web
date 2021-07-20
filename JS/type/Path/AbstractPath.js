// A function that maps [0.0-1.0] to a position(_2f) and a normal(_2f)

class _AbstractPath {

	constructor( verts=[] ) {
		if ( new.target === _AbstractPath ) {
			throw new TypeError("_AbstractPath : Cannot construct an abstract class.");
		}

		if ( this.position !== 'function' ) {
			throw new TypeError( new.target.name + ".position() : Is not a function or is undefined." );
		}

		if ( this.normal !== 'function' ) {
			throw new TypeError( new.target.name + ".normal() : Is not a function or is undefined." );
		}

		/* TODO
		if ( this.tangent !== 'function' ) {
			throw new TypeError( new.target.name + ".tangent() : Is not a function or is undefined." );
		}
		*/

		if ( this.verify_ !== 'function' ) {
			throw new TypeError( new.target.name + ".verify_() : Is not a function or is undefined." );
		}

		if ( this.calculate_length_ !== 'function' ) {
			throw new TypeError( new.target.name + ".calculate_length_() : Is not a function or is undefined." );
		}

		this.verts_ = verts; //[_2f]
		this.flipped_normal = false;
		this.verify_();
		this.calculate_length_(); // sets this.length_
	}

	get flip_mod() {
		return this.flipped_normal * -2.0 + 1;
	}
	
	get length() {
		return this.length_;
	}
}
