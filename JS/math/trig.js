var __Trig = {

	length : function( a ) {
		return Math.hypot( a.x, a.y );
	},

	// distance between 2 points
	dist : function( a, b ) {
		return Math.hypot( a.x - b.x, a.y - b.y );
	},

	dot : function( a, b ) {
		return a.x * b.x + a.y * b.y;
	},

	normalize : function( a ) {
		let len = this.length( a );
		return new _2f( a.x / len, a.y / len );
	},

	// the unit vector that bisects the interior angle made up by 3 points
	normal : function( p1, p2, p3 ) {
		let hfa = this.half_angle( p1, p2, p3 );
		let v21x = p1.x - p2.x;
		let v21y = p1.y - p2.y;
		let v = new _2f( v21x*Math.cos(hfa) - v21y*Math.sin(hfa), v21x*Math.sin(hfa) + v21y*Math.cos(hfa) );

		return this.normalize(v);
	},

	// half of the interior angle made up by 3 points
	half_angle : function( p1, p2, p3 ) {
		let a = this.dist( p1, p3 );
		let b = this.dist( p1, p2 );
		let c = this.dist( p2, p3 );

		let hfa = Math.acos( ( Math.pow(a, 2) - Math.pow(b, 2) - Math.pow(c, 2) ) / ( -2 * b * c) ) / 2;

		return hfa;
	},

	lerp : function( p1, p2, t ) {
		let dx = p2.x - p1.x;
		let dy = p2.y - p1.y;

		return new _2f( p1.x + dx * t, p1.y + dy * t);
	},

}
