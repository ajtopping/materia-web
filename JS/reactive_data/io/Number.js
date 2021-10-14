NodeFactory.create.input.Number = function( multi ) {
  let input = new NodeInputComponent( multi );

  input.name = "Number";

  input.type = "number";

  return input;
};

// input
NodeFactory.create.input.Number.single = function() {
  return NodeFactory.create.input.Number( false );
};

NodeFactory.create.input.Number.multi = function() {
  return NodeFactory.create.input.Number( true );
};

// output
NodeFactory.create.output.Number = function() {
  let output = new NodeOutputComponent();

  output.name = "Number";

  output.type = "number";

  return output;
};

