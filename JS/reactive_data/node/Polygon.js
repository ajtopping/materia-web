NodeFactory.create.Polygon= function() {
  let node = new Node();

  node.inputs_ = {
    vertex_data : {
      type: 'Array _2f',
      default: [],
      entry_uuid: null,
    },
    is_closed : {
      type: 'boolean',
      default: true,
      entry_uuid: null,
    }
  };

  node.outputs_ = {
    output: {
      type: '_Polygon',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let o = {
      output: new _Polygon( i.vertex_data, i.is_closed ),
    };
    console.log(o);
    return o;
  }

  return node;
}