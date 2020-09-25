var MathUtil = {

	getLineSegmentsIntersection: function( edge1, edge2 ) {
		//alert(edge1.start+", "+edge1.end+" "+edge2.start+", "+edge2.end);
		slope = function(edge) { return (edge.start.y-edge.end.y)/(edge.start.x-edge.end.x) };
		let slope1 = slope(edge1);
		let slope2 = slope(edge2);

		// parallel
		if (slope1 == slope2) {
			return null;
		}

		intercept = function(edge, slope) { return edge.start.y - edge.start.x * slope; };
		let intercept1 = intercept(edge1, slope1);
		let intercept2 = intercept(edge2, slope2);

		let intersect_x = 0;
		let intersect_y = 0;

		is_vertical = function(slope) {
			return slope == undefined || slope == NaN || slope == Infinity || slope == -Infinity;
		}

		// vertical
		if (is_vertical(slope1)) {
			intersect_x = edge1.start.x;
			intersect_y = slope2 * intersect_x + intercept2;
		}
		else if (is_vertical(slope2)) {
			intersect_x = edge2.start.x;
			intersect_y = slope1 * intersect_x + intercept1;
		}
		else {
			// mx+b=Mx+B
			// mx-Mx=B-b
			// x = (B-b)/(m-M)
			intersect_x = (intercept1-intercept2)/(slope2-slope1);
			intersect_y = slope1 * intersect_x + intercept1;
		}

		is_inbetween = function( start, middle, end ) {
			return middle >= start && middle <= end || middle <= start && middle >= end;
		}

		if ( !is_inbetween( edge1.start.x, intersect_x, edge1.end.x ) || !is_inbetween( edge2.start.x, intersect_x, edge2.end.x )) {
			return null;
		}

		if ( !is_inbetween( edge1.start.y, intersect_y, edge1.end.y ) || !is_inbetween( edge2.start.y, intersect_y, edge2.end.y )) {
			return null;
		}

		return _2f( intersect_x, intersect_y );
	}
}