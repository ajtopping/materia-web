/*
NodeInputComponent.js
NodeOutputComponent.js
*/

class AdvNode {
  name = "Default"
  
  /*
  name: {
	  type: 'number|string|etc',
    multi: bool,
	  default: <value>,
	  entry_uuid: <UUID>,
	  }
  */
  inputs_ = {}

  /*
  name: {
	  type: 'number|string|etc',
	  entry_uuid: <UUID>,
	  }
  */
  outputs_ = {}

  func_ = undefined

  // yuck
  registered_ = false

  constructor() {
    
  }

  register() {
    this.createDataDictionaryOutputEntries_();
    this.registered_ = true;
  }

  is_registered() {
    return this.registered_;
  }

  createDataDictionaryOutputEntries_() {
    for ( const output in this.outputs_ ) {
    	this.outputs_[output].register();
    }
  }

  attemptConnectInput( input_name, uuid ) {
    if ( !this.inputs_.hasOwnProperty( input_name ) ) {
      console.warn("AdvNode : attemptConnectInput : No input with name " + input_name );
      return
    }

    this.inputs_[input_name].attemptConnection( uuid );
  }

  breakInputConnection( input_name ) {
    //this.inputs_[input_name].entry_uuid = null;
    // TODO __NodeGraphHandler break connection
    console.warn("AdvNode : breakInputConnection : not yet implemented.");
  }

  evaluate() {
    if ( this.func_ !== undefined ) {
      let output_pkg = this.func_.call(null, this.packageInputs_() );
      this.updateOutputs_( output_pkg );
    }
    else {
      console.log("Node : evaluate : this.func_ is undefined");
    }
  }

  updateOutputs_( output_pkg ) {
    for( const i in output_pkg ) {
      let output = this.outputs_[i];
      let output_data = output_pkg[i];

      if ( output.entry_uuid !== null ) {
        // look up in __DD, confirm slot is still valid
        if ( !__DataDictionary.has(output.entry_uuid) ) {
          console.log("AdvNode : updateOutputs_ : __DD has not entry with key " + output.entry_uuid);
        }
        else {
          (__DataDictionary.get(output.entry_uuid)).data_ = output_data;
        }
      }
      else {
        console.log("AdvNode : updateOutputs_ : no entry_uuid is set for output '" + i + "'. Node not registered?");
      }
    }
  }

  packageInputs_() {
    let pkg = {};

    for ( const i in this.inputs_ ) {
      let input = this.inputs_[i];
      pkg[i] = input.makePackage();
    }

    return pkg;
  }
}
