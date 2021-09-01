// req: types.js

NodeFactory.create.ApplyTransform= function() {
  let node = new Node();

  node.inputs_ = {
    transform : {
      type: '_Transform',
      default: new _Transform(),
      entry_uuid: null,
    },
    points : {
      type: 'Array _2f',
      default: [],
      entry_uuid: null,
    }
  };

  node.outputs_ = {
    output : {
      type: 'Array _2f',
      entry_uuid: null,
    }
  };

  node.func_ = function( i ) {
    let out_points = new Array(i.points.length);

    for( let j = 0; j < out_points.length; j++ ) {
      out_points[j] = i.transform.apply(i.points[j]);
    }

    let o = {
      output: out_points,
    };

    console.log(o);
    return o;
  }

  return node;
}