NodeFactory.create.Sum = function() {
  let node = new Node();

  node.inputs_ = {
    array : {
      type: 'Array number',
      default: [],
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
    let sum = i.array.reduce( (a,b) => a+b );
    let o = {
      output: sum,
    };
    console.log(o);
    return o;
  }

  return node;
}