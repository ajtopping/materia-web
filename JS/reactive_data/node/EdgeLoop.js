NodeFactory.create.EdgeLoop= function() {
  let node = new Node();

  node.inputs_ = {
    num_verts : {
      type: 'number',
      default: 2,
      entry_uuid: null,
    },
    is_closed : {
      type: 'boolean',
      default: true,
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    output: {
      type: 'Array number',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let num_verts = i.num_verts;
    let is_closed = i.is_closed;

    let num_edges = num_verts - 1 + is_closed;
    console.log(num_edges);
    let indexes = new Array(num_edges * 2);
    for( let i = 0; i < num_edges; i++ ) {
      indexes[i*2] = i;
      indexes[i*2+1] = i+1
    }
    if ( is_closed ) {
      indexes[indexes.length-1] = 0;
    }

    let o = {
      output: indexes,
    };

    console.log(o);
    return o;
  }

  return node;
}