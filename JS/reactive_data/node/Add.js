NodeFactory.create.Add = function() {
  let node = new Node();

  node.name = "Add";
  
  node.inputs_ = {
    left : {
      type: 'number',
      default: 1.2,
      entry_uuid: null,
    },
    right : {
      type: 'number',
      default: 3.4,
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    output: {
      type: 'number',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let o = {
      output: +i.left + +i.right,
    };
    console.log(o);
    return o;
  }

  return node;
}