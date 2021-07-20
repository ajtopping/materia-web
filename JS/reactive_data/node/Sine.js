/*
Maps verts to their percentage along the path from 0.0-1.0

TODO

The concept of verts and indexes needs to be replaced with actual Polys, Shapes, etc
*/

NodeFactory.create.PathPercent = function() {
  let node = new Node();

  node.inputs_ = {
    verts : {
      type: 'Array _2f',
      default: [],
      entry_uuid: null,
    },
    indexes : {
      type: 'Array number',
      default: [],
      entry_uuid: null,
    },
    offset : {
      type: 'number',
      default: 0,
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
    let percents = new Array(i.verts.length);
    let total_length = 0.0;

    for( let j = 0; j < i.indexes.length/2; j++ ) {
      let start_2f = i.verts[i.indexes[j*2]];
      let end_2f = i.verts[i.indexes[j*2+1]];

      let edge_length = Math.hypot(end_2f.x-start_2f.x, end_2f.y-start_2f.y);

      total_length += edge_length;
    }

    for( let i = 0; i < verts; i++ ) {
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