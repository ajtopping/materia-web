class NodeOutputComponent {
  name = "Default Output"
  
  type = 'none'

  entry_uuid = null

  registered_ = false

  constructor() {

  }

  register() {
    if ( __DataDictionary.has( this.entry_uuid) ) {
      return this.entry_uuid
    }

    let entry = new ddEntry( this.type );
    this.entry_uuid = __DataDictionary.insert_new( entry );

    return this.entry_uuid;
  }

  updateOutput() {
    // TODO: AdvNode does this?
    console.warn("NodeOutputComponent : updateOutput : not yet implemented.");
  }

  breakOutputConnections( ) {
    // TODO: break all connections to other node inputs
    console.warn("NodeOutputComponent : breakOutputConnections : not yet implemented.");
  }

  makePackage() {
    if ( this.entry_uuid !== null ) {
      entry_data = this.lookUpEntryData_( this.entry_uuid );
      if ( entry_data === undefined ) {
        console.warn("NodeOutputComponent : makePackage : __DD has not entry with key " + this.entry_uuid);
        return null;
      }
      else {
        return entry_data;
      }
    }
    else {
      console.warn("NodeOutputComponent : makePackage : this.entry_uuid is null. Node not registered?");
      return null;
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

  get registered() {
    return this.registered_;
  }
}
