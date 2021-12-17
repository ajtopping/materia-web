```
NodeInputCollector
Verifies the type of incoming connections
```

class NodeInputCollector {
  type = 'none'

  node_ = null

  input_collection_uuids = new Map()

  constructor( node ) {
    this.node_ = node;

    this.
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
  
  function execute() {

  }

  function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

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
