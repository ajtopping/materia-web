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
  },

  delete : function( a ) {

  }
}
