NodeFactory.create.GetElementById = function() {
  let node = new Node();

  node.name = "GetElementById";
  
  node.inputs_ = {
    id : {
      type: 'string',
      default: 'render-canvas',
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    output: {
      type: 'canvas',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let el = document.getElementById(i.id);
    let o = {
      output: el,
    };
    console.log(o);
    return o;
  }

  return node;
}