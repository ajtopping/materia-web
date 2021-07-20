class _LinearPath {

	constructor( verts=[] ) {
		super( verts );

		this.start_ = this.verts_[0];
		this.end_ = this.verts_[1];
		this.delta_ = new _2f( this.end_.x-this.start_.x, this.end_.y-this.start_.y );
		this.normal_ = new _2f( -1 * this.delta_.y, this.delta_.x );
	}

	position( percent ) {
		return new _2f( this.start_.x + percent * this.delta_.x, this.start_.y + percent * this.delta_.y );
	}

	normal( percent ) {
		return new _2f( this.normal_.x * this.flip_mod, this.normal_.y * this.flip_mod );
	}

	// Exactly 2 vertexes
	verify_() {
		if ( this.verts_.length != 2 ) {
			throw new TypeError( "_LinearPath.verify_() : Expected this.verts.legnth == 2, but was " + this.verts_.length );
		}
	}

	calculate_length_() {
		let start_2f = this.verts_[0];
		let end_2f = this.verts_[1];
		this.length_ = Math.hypot(end_2f.x-start_2f.x, end_2f.y-start_2f.y);
	}
}
