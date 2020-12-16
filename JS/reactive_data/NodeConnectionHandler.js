var __NodeConnectionHandler = {
  input_ref : null,
  output_ref: null,

  clearTempRefs: function() {
    this.input_ref = null;
    this.output_ref = null;
  },

  setInputRef: function(ref) {
    this.input_ref = ref;
  },

  setOutputRef: function(ref) {
    this.output_ref = ref;
  },

  breakConnection: function() {

  },

  attemptConnection() {
    let b = this.attemptConnection_();
    this.clearTempRefs();
    return b;
  },

  attemptConnection_() {
    if ( this.output_ref === null ) {
      console.log("NodeConnectionHandler : attemptConnection : output_ref is null.");
      return false;   
    }

    if ( this.input_ref === null ) {
      console.log("NodeConnectionHandler : attemptConnection : input_ref is null.");
      return false;   
    }

    if ( this.output_ref.entry_uuid === null ) {
      console.log("NodeConnectionHandler : attemptConnection : output_ref.entry_uuid is null. Node not registered?");
      return false;   
    }

    let entry = __DataDictionary.get(this.output_ref.entry_uuid);

    if (entry === undefined) {
      console.log("NodeConnectionHandler : attemptConnection : No __DataDictionary entry exists for uuid=" + this.output_ref.entry_uuid);
      return false;
    }

    if ( this.input_ref.type !== entry.type ) {
      console.log("NodeConnectionHandler : attemptConnection : expected entry to have type of " + this.input_ref.type + " but was " + entry.type);
      return false;
    }

    this.input_ref.entry_uuid = this.output_ref.entry_uuid;

    return true;
  }
}

