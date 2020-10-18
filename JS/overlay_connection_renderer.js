//window.onload = init_handler;

var overlayConnectionRenderer = {
  canvas : document.getElementById("overlay-canvas"),
  //context : this.canvas.getContext("2d"),

  temp_start_vue_ref : {},
  temp_end_vue_ref : {},
  start_xy : {x:0,y:0},
  end_xy : {x:0,y:0},

  // { input:vue_ref , output:vue_ref}
  connections : [],

  test : function(input) {
    window.alert(input);
  },

  renderInProgressConnection: function(event) {
    let context = document.getElementById("active-overlay-canvas").getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    
    if (this.temp_start_vue_ref.x) {
      context.moveTo(event.clientX, event.clientY);
      context.lineTo(this.temp_start_vue_ref.x, this.temp_start_vue_ref.y);
      context.stroke();
    }
  },

  renderConnections: function(context) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    for (connection of this.connections) {
      var ox = connection.output.x;
      var oy = connection.output.y;
      var ix = connection.input.x;
      var iy = connection.input.y; 
      context.moveTo(ox, oy);
      context.lineTo(ix, iy);
      context.stroke();
    }
  },

  clearTempRefs: function() {
    this.temp_start_vue_ref = {};
    this.temp_end_vue_ref = {};
  },

  startConnection: function(starting_vue_ref) {
    this.temp_start_vue_ref = starting_vue_ref;
  },

  endConnection: function(ending_vue_ref) {
    this.temp_end_vue_ref = ending_vue_ref

    this.addConnection(this.temp_start_vue_ref, this.temp_end_vue_ref);

    this.clearTempRefs();
  },

  breakConnection: function(output_vue_ref) {

  },

  addConnection: function(input_vue_ref, output_vue_ref) {
    this.connections.push( {
      input: input_vue_ref,
      output: output_vue_ref,
    } );
  },
}

function init_overlay_handler() {
  document.addEventListener("mousemove", e => overlayConnectionRenderer.renderInProgressConnection(e));
  document.addEventListener("mouseup", () => overlayConnectionRenderer.clearTempRefs());
}

init_overlay_handler();

