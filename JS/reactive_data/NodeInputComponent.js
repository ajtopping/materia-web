class NodeInputComponent {
  name = "Default Input"
  
  type = 'none'

  multi = false

  // TODO default is used for holding a UUID Set when multi is true. Any better ideas?
  default = null

  entry_uuid = null

  constructor( multi=false ) {
    this.multi = multi;
    if ( this.multi ) {
      this.default = new Set()
    }
  }

  attemptConnection(  uuid ) {
    let entry = __DataDictionary.get(uuid);

    if (entry === undefined) {
      console.log("NodeInputComponent : attemptConnection : No __DataDictionary entry exists for uuid=" + uuid);
      return;
    }

    if ( this.type !== entry.type ) {
      console.log("NodeInputComponent : attemptConnection : expected entry to have type of " + this.type + " but was " + entry.type);
      return;
    }

    if ( this.multi ) {
      this.addConnection_( uuid );
      return;
    }

    if ( this.entry_uuid === null ) {
      this.newConnection_( uuid );
      return;
    }

    this.replaceConnection_( uuid );
  }

  newConnection_( uuid ) {
    this.entry_uuid = uuid;
  }

  replaceConnection_( uuid ) {
    this.entry_uuid = uuid;
    // possible other requirements
  }

  addConnection_( uuid ) {
    if ( this.default.has( uuid ) ) {
      // already connected. do nothing
    }
    else {
      this.default.add( uuid );
    }
  }

  breakInputConnection( input_name ) {
    //this.inputs_[input_name].entry_uuid = null;
    // TODO __NodeGraphHandler break connection
    console.warn("NodeInputComponent : breakInputConnection : not yet implemented.");
  }

  // TODO reconcile ordering of multi package data
  makePackage() {
    if ( !this.multi ) {
      if ( this.entry_uuid !== null ) {
        entry_data = this.lookUpEntryData_( this.entry_uuid );
        if ( entry_data === undefined ) {
          console.log("NodeInputComponent : makePackage : __DD has not entry with key " + this.entry_uuid);
        }
        else {
          return entry_data;
        }
      }
      else {
        return this.default;
      }
    }
    else {
      let iter = this.default.values();
      let pkg = new Array()
      for ( const uuid of iter ) {
        entry_data = this.lookUpEntryData_( this.entry_uuid );
        if ( entry_data === undefined ) {
          console.warn("NodeInputComponent : makePackage : __DD has not entry with key " + this.entry_uuid + ". Skipping add to multi package...");
        }
        else {
          pkg.push( entry_data );
        }
      }
      return pkg;
    }
  }

  lookUpEntryData_( uuid ) {
    // look up in __DD, confirm slot is still valid
      if ( !__DataDictionary.has( uuid ) ) {
        return undefined
      }
      else {
        return (__DataDictionary.get( uuid )).data_;
      }
  }
}
