class ddEntry {
  type = 'null'
  data_ = null

  constructor( type ) {
    this.type = type;
  }
}

var __DataDictionary = {
  
  dict_ : {},

  has : function( key ) {
    return this.dict_[key] !== undefined;
  },

  get : function( key ) {
    return this.dict_[key];
  },

  /*
  insert : function( key, value ) {
    // unintuitive
  },
  */

  insert_or_replace : function( key, value ) {
    this.dict_[key] = value;
    return key;
  },

  insert_new : function( value ) {
    return this.insert_or_replace( __CreateUuid(), value );
  },

  delete : function( a ) {

  }
}