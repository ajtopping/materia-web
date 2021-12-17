/*
pdEntry
Container for arbitrary data paired with a (hopefully) accurate type description
*/
class pdEntry {
  type = 'null'
  data_ = null

  constructor( type ) {
    this.type = type;
  }

  data() {
  	return this.data_;
  }
}

/*
__PropertyDictionary
Maps an Object UUID to a dictionary of string labels that map to a pdEntry.
Essentially, replicates the behavior of <Object>[label].(get/set) pdEntry.
*/
var __PropertyDictionary = {
  
  dict_ : {},

  has_prop : function( obj_uuid, prop_label ) {
    if (this.dict_[obj_uuid] === undefined)
      return false;

    if (this.dict_[obj_uuid][prop_label] === undefined)
      return false;

    return true;
  },

  get_prop : function( obj_uuid, prop_label ) {
    if ( !this.has_prop( obj_uuid, prop_label) )
      return undefined;

    return this.dict_[obj_uuid][prop_label];
  },

  add_prop : function( obj_uuid, prop_label, prop_entry ) {
    if ( this.dict_[obj_uuid] === undefined )
      this.dict_[obj_uuid] = {};

    if ( this.dict_[obj_uuid][prop_label] === undefined )
      this.dict_[obj_uuid][prop_label] = prop_entry;

    console.warn('property_dictionary.js : __PropertyDictionary.add_prop : Property already exists. Use add_or_replace_prop');  
  },

  add_or_replace_prop : function( obj_uuid, prop_label, prop_entry ) {
    if ( this.dict_[obj_uuid] === undefined )
      this.dict_[obj_uuid] = {};

    this.dict_[obj_uuid][prop_label] = prop_entry;
  },

  delete : function( a ) {
    console.warn('property_dictionary.js : __PropertyDictionary.delete : Not implemented yet!');
  }
}