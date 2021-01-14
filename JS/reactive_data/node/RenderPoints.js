NodeFactory.create.RenderPoints= function() {
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
    size : {
      type: 'number',
      default: 3,
      entry_uuid: null,
    },
    color : {
      type: 'string',
      default: 'hsl(0,100%,50%)',
      entry_uuid: null,
    },
    clear : {
      type: 'boolean',
      default: true,
      entry_uuid: null,
    },
  };

  node.outputs_ = {
    
  };

  node.func_ = function( i ) {
    
    let canvas_transform = new _Transform( i.canvas.width/2, i.canvas.height/2, 0, i.canvas.width/2, i.canvas.height/2 );
    let size_transform = new _Transform( -i.size/2, -i.size/2, 0, 1, 1 );
    let ctx = i.canvas.getContext("2d");

    if ( i.clear ) {
      ctx.save();
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,i.canvas.width, i.canvas.height);
      ctx.restore();
    }

    ctx.fillStyle = i.color;

    for( let j = 0; j < i.verts.length; j++ ) {
      let start_2f = size_transform.apply(canvas_transform.apply(i.verts[j]));
      //ctx.fillStyle = i.colors[ j % i.colors.length ];
      ctx.fillRect(start_2f.x, start_2f.y,i.size,i.size);
    }

    let o = {
      
    };

    console.log(o);
    return o;
  }

  return node;
}