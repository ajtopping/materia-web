```
NodeRunner
This wrapper for AdvNode figures out how to break DataCollection(s) into 
individual Input Sets that can be run against the AdvNode one or more times.
```

class NodeRunner {
  type = 'none'

  node_ = null

  collection_uuids = []

  constructor( node ) {
    this.node_ = node;
  }

  /*
  1. Converts collection UUIDs into flat sets of data
  2. Vertical slice across all data sets to form an input package
  3. Send package to node func, get output package back
  4. Repeat till no more data sets
  5. Combine output packages into separate data sets
  6. Save output data sets to __DD
  7. Record output UUIDs?
  */
  
  // TODO reconcile ordering of multi package data
  makePackage() {
    if ( !this.multi ) {
      if ( this.entry_uuid !== null ) {
        let entry_data = this.lookUpEntryData_( this.entry_uuid );
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
        let entry_data = this.lookUpEntryData_( uuid );
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
