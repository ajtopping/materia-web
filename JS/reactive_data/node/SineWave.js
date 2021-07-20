/* Generates a sine function

*/

NodeFactory.create.SineWave = function() {
  let node = new Node();

  node.inputs_ = {
    amplitude : {
      type: 'number',
      default: 1.0,
      entry_uuid: null,
    },
    cycles : {
      type: 'number',
      default: 1.0,
      entry_uuid: null,
    },
    offset_x : {
      type: 'number',
      default: 0,
      entry_uuid: null,
    },
    offset_y : {
      type: 'number',
      default: 0,
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    output: {
      type: 'function',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let func = x => ( Math.sin( x / +i.cycles + +i.offset_x ) * +i.amplitude + +i.offset_y )
    let o = {
      output: func,
    };
    //console.log(o);
    return o;
  }

  return node;
}