var __DocumentOnloadHandler = {
	onload_functions_ : [],

	AddFunction : function( func ) {
		if ( ! this.isFunction_( func ) ) {
			throw "__DocumentOnloadHandler.AddFunction( func ) : func is not a function."
		}

		if ( func.length !== 0 ) {
			throw "__DocumentOnloadHandler.AddFunction( func ) : func must have 0 parameters."
		}

		this.onload_functions_.push( func );
	},

	CallFunctions : function() {
		console.log("__DocumentOnloadHandler : Calling " + this.onload_functions_.length + " functions...");
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
	__DocumentOnloadHandler.CallFunctions();
}