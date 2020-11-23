NodeFactory.create.RenderEdgeSet= function() {
  let node = new Node();

  node.inputs_ = {
    canvas : {
      type: 'canvas',
      default: null,
      entry_uuid: null,
    },
    verts : {
      type: 'Array _2f',
      default: [],
      entry_uuid: null,
    },
    indexes : {
      type: 'Array number',
      default: [],
      entry_uuid: null,
    }
  };

  node.outputs_ = {
    
  };

  node.func_ = function( i ) {
    
    let canvas_transform = new _Transform( i.canvas.width/2, i.canvas.height/2, 0, i.canvas.width/2, i.canvas.height/2 );
    let ctx = i.canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0,0, i.canvas.width, i.canvas.height);

    ctx.fillStyle = "black";

    for( let j = 0; j < i.indexes.length/2; j++ ) {
      let start_2f = canvas_transform.apply(i.verts[i.indexes[j*2]]);
      let end_2f = canvas_transform.apply(i.verts[i.indexes[j*2+1]]);

      ctx.moveTo(start_2f.x, start_2f.y);
      ctx.lineTo(end_2f.x, end_2f.y);
      ctx.stroke();
    }

    let o = {
      
    };

    console.log(o);
    return o;
  }

  return node;
}