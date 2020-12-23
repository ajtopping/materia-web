var __NodeGraphHandler = {
  
  // { UUID : Set{Node} }
  output_to_node_set_ : new Map(),

  // { Node : Number }
  node_dependency_count_ : new Map(),

  add_node : function( uuid, node ) {
    let node_set = this.output_to_node_set_.get( uuid );
    if ( !node_set ) {
      this.output_to_node_set_.set( uuid, new Set() );
    } else {
      node_set.add( node );
    }
  },

  remove_node : function( uuid, node ) {
    let node_set = this.output_to_node_set_.get( uuid );
    if ( !node_set ) {
      // Does not even exist
    } else {
      node_set.delete( node );
    }
  },

  clear_output : function( uuid ) {
    this.output_to_node_set_.set( uuid, null );
  },

  get_children_nodes_as_set_ : function( node ) {
    let child_nodes_set = new Set();
    let uuid = null;
    let node_set = null;
    for ( const key in node.outputs_ ) {
      console.log(key);
      if ( uuid = node.outputs_[key].entry_uuid ) {
        console.log(uuid);
        if ( node_set = this.output_to_node_set_.get(uuid) ) {
          let iter = node_set.values();
          for ( const child_node of iter ) {
            child_nodes_set.add(child_node);
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
      console.log(child_node.name);
      if ( this.node_dependency_count_.has(child_node) ) { // Already visited. Increment and skip
        let count = this.node_dependency_count_.get(child_node);
        this.node_dependency_count_.set(child_node, count + 1);
        console.log("Adding dependency. Count = " + count);
      } else { // Visit
        this.node_dependency_count_.set(child_node, 1);
        console.log("New dependency! Recursing...");
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
    console.log("Evaluating " + node.name);
    node.evaluate();

    let child_nodes_set = this.get_children_nodes_as_set_( node );

    // Full traversal of the subtree
    let iter = child_nodes_set.values();
    for ( const child_node of iter ) {
      let count = this.node_dependency_count_.get(child_node)
      if ( count > 1 ) { // Not ready to evaluate yet...   
        console.log(count + " > 1. Skipping...");
        this.node_dependency_count_.set(child_node, count - 1);
      } else { // Ready to evaluate
        this.cascade_evaluate_from_node_(child_node);
      }
    }
  },
}