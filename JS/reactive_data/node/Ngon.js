NodeFactory.create.Ngon= function() {
  let node = new Node();

  node.inputs_ = {
    num_sides : {
      type: 'number',
      default: 3,
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    output: {
      type: 'Array _2f',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let num_sides = parseInt(i.num_sides);

    let ngon = new Array(num_sides);
    let angle = 2 * Math.PI / num_sides;
    for( let i = 0; i < num_sides; i++ ) {
      ngon[i] = _2f( Math.sin(i * angle), Math.cos(i * angle) );
    }

    let o = {
      output: ngon,
    };
    console.log(o);
    return o;
  }

  return node;
}