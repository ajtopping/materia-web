class Node {
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
    	let entry = new ddEntry( this.outputs_[output].type );
    	this.outputs_[output].entry_uuid = __DataDictionary.insert_new( entry );
    }
  }

  attemptConnectInput( input_name, uuid ) {
    let entry = __DataDictionary.get(uuid);

    if (entry === undefined) {
      console.log("Node : attemptConnectInput : No __DataDictionary entry exists for uuid=" + uuid);
      return;
    }

    if ( this.inputs_[input_name].type !== entry.type ) {
      console.log("Node : attemptConnectInput : expected entry to have type of " + this.inputs_[input_name].type + " but was " + entry.type);
      return;
    }

    this.inputs_[input_name].entry_uuid = uuid;
  }

  breakInputConnection( input_name ) {
    //this.inputs_[input_name].entry_uuid = null;
    // TODO __NodeGraphHandler break connection
    console.warn("Node : breakInputConnection : not yet implemented.");
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
          console.log("Node : updateOutputs_ : __DD has not entry with key " + output.entry_uuid);
        }
        else {
          (__DataDictionary.get(output.entry_uuid)).data_ = output_data;
        }
      }
      else {
        console.log("Node : updateOutputs_ : no entry_uuid is set for output '" + i + "'. Node not registered?");
      }
    }
  }

  packageInputs_() {
    let pkg = {};
    for ( const i in this.inputs_ ) {
      let input = this.inputs_[i];

      if ( input.entry_uuid !== null ) {
        // look up in __DD, confirm slot is still valid
        if ( !__DataDictionary.has(input.entry_uuid) ) {
          console.log("Node : packageInputs_ : __DD has not entry with key " + input.entry_uuid);
        }
        else {
          pkg[i] = (__DataDictionary.get(input.entry_uuid)).data_;
        }
      }
      else {
        pkg[i] = input.default;
      }
    }

    return pkg;
  }

  getComputedInput( key ) {
    let input = this.inputs_[key];

    if ( input === undefined ) {
      return "MISSING KEY: '" + key + "'";
    }

    if ( input.entry_uuid !== null ) {
      // look up in __DD, confirm slot is still valid
      if ( !__DataDictionary.has(input.entry_uuid) ) {
        console.log("Node : getComputedInput : __DD has not entry with key " + input.entry_uuid);
        return "MISSING __DD: '" + key + "'";
      }
      else {
        return "a" + __DataDictionary.get(input.entry_uuid).data_;
      }
    }
    
    return input.default;
  }
}
