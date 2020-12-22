class ddEntry {
  type = 'null'
  data_ = null

  constructor( type ) {
    this.type = type;
  }
}

var __NodeGraphHandler = {
  
  // { UUID : Set{Node} }
  output_to_node_set_ : new Map(),

  // { Node : Number }
  node_dependency_count_ : new Map(),

  has : function( key ) {
    return this.output_to_node_set_.has( key );
  },

  get : function( key ) {
    return this.output_to_node_set_.get( key );
  },

  insert_or_replace : function( key, value ) {
    this.output_to_node_set_.set( key, value );
    return key;
  },

  insert_new : function( value ) {
    return this.insert_or_replace( __CreateUuid(), value );
  },

  delete : function( key ) {
    this.output_to_node_set_.delete( key );
  },

  get_children_nodes_as_set_ : function( node ) {
    let child_nodes_set = new Set();
    let uuid = null;
    let node_set = null;
    for ( const key of node.outputs_ ) {
      if ( uuid = node.outputs_[key].entry_uuid ) {
        if ( node_set = this.output_to_node_set_.get(uuid) ) {
          let iter = node_set.values();
          for ( const child_node of iter ) {
            child_nodes_set.add(child_node.value);
          }
        }
      }
    }

    return child_nodes_set;
  },

  build_dependency_count_from_node_ : function( node ) {
    let child_nodes_set = this.get_children_nodes_as_set_( node );

    // Depth-first full traversal of the subtree
    let iter = child_nodes_set.values();
    for ( const child_node of iter ) {
      if ( this.node_dependency_count_.has(child_node) ) { // Already visited. Increment and skip
        let count = this.node_dependency_count_.get(child_node);
        this.node_dependency_count_.set(child_node, count + 1);
      } else { // Visit
        this.node_dependency_count_.set(child_node, 1);
        this.build_dependency_count_from_node_( child_node );
      }
    }
  },

  cascade_evaluate_from_node : function( node ) {
    this.node_dependency_count_.clear();
    this.build_dependency_count_from_node_( node );
    this.cascade_evaluate_from_node_( node ); 
  },

  cascade_evaluate_from_node_ : function( node ) {
    node.evaluate();

    let child_nodes_set = this.get_children_nodes_as_set_( node );

    // Full traversal of the subtree
    let iter = child_nodes_set.values();
    for ( const child_node of iter ) {
      let count = this.node_dependency_count_.get(child_node)
      if ( count > 1 ) { // Not ready to evaluate yet...   
        this.node_dependency_count_.set(child_node, count - 1);
      } else { // Ready to evaluate
        this.cascade_evaluate_from_node_(child_node);
      }
    }
  },
}