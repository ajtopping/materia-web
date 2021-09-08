```
Creates edges between vertexes with similar IDs across multiple Polys
```
NodeFactory.create.MakeArray= function() {
  let node = new Node();

  node.inputs_ = {
    arr_points : {
      type: 'Array _',
      default: [],
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    output: {
      type: 'Array _',
      entry_uuid: null,
      },
  };

  node.func_ = function( i ) {
    let arr_points = i.arr_points;
    let cumm_offset = i.cumm_offset;

    let num_spokes = 0
    for ( let i = 0; i < arr_points.length; i++ ) {
      let vl = arr_points[i].length
      num_spokes = vl > num_spokes ? vl : num_spokes
    }

    let spokes = new Array(num_spokes);
    for( let i = 0; i < spokes; i++ ) {
      let verts = new Array(arr_points.length)
      for( let j = 0; j < verts.length; j++ ) {
        let vl = arr_points[j].length
        let v = arr_points[j][(i+j*cumm_offset)%vl]
        verts[j] = Object.create(v)
      }

      spokes[i] = new _Polygon( verts, false)
    }

    let o = {
      output: spokes,
    };

    console.log(o);
    return o;
  }

  return node;
}