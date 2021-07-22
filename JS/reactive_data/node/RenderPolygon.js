NodeFactory.create.RenderPolygon= function() {
  let node = new Node();

  node.inputs_ = {
    canvas : {
      type: 'canvas',
      default: null,
      entry_uuid: null,
    },
    polygon : {
      type: '_Polygon',
      default: null,
      entry_uuid: null,
    },
    size : {
      type: 'number',
      default: 3,
      entry_uuid: null,
    },
    color : {
      type: 'string',
      default: 'hsl(0,0%,0%)',
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
    let ctx = i.canvas.getContext("2d");
    let v_data = i.polygon.vertexes;

    if ( i.clear ) {
      ctx.save();
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,i.canvas.width, i.canvas.height);
      ctx.restore();
    }

    ctx.fillStyle = "white";
    ctx.fillRect(0,0, i.canvas.width, i.canvas.height);

    ctx.strokeStyle = i.color;
    ctx.lineWidth = i.size;
    
    for( let j = 1; j < v_data.length; j++ ) {
      let start_2f = canvas_transform.apply(v_data[j-1]);
      let end_2f = canvas_transform.apply(v_data[j]);

      ctx.moveTo(start_2f.x, start_2f.y);
      ctx.lineTo(end_2f.x, end_2f.y);
      ctx.stroke();
    }

    if( i.polygon.is_closed ) {
      let start_2f = canvas_transform.apply(v_data[v_data.length-1]);
      let end_2f = canvas_transform.apply(v_data[0]);

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