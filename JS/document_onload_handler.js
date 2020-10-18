var __DocumentOnLoadHandler = {
	onload_functions_ : [],

	AddFunction : function( func ) {
		if ( ! this.isFunction_( func ) ) {
			throw "__DocumentOnLoadHandler.AddFunction( func ) : func is not a function."
		}

		if ( func.length !== 0 ) {
			throw "__DocumentOnLoadHandler.AddFunction( func ) : func must have 0 parameters."
		}

		onload_functions_.push( func );
	},

	CallFunctions : function() {
		for ( func of this.onload_functions_ ) {
			func.call();
		}
	},

	isFunction_ : function( f ) {
		return f instanceof Function; // Firefox
		//return typeof(f) === 'function' // Chrome
	}
}

window.onload = () => {
	__DocumentOnLoadHandler.CallFunctions();
}