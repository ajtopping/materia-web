NodeFactory.create.Sum = function() {
  let node = new AdvNode();

  node.inputs_ = {
    numbers : NodeFactory.create.input.Number.multi(),
  };

  node.outputs_ = {
    output: NodeFactory.create.output.Number(),
  };

  node.func_ = function( i ) {
    let sum = i.numbers.reduce( (a,b) => a+b );
    let o = {
      output: sum,
    };
    //console.log(o);
    return o;
  }

  return node;
}