//window.onload = init_handler;

var overlayConnectionRenderer = {
  temp_start_vue_ref : {},
  temp_end_vue_ref : {},

  // { input:vue_ref , output:vue_ref}
  connections : [],

  test : function() {
    window.alert("wow!");
  },

  renderConnections : function(canvas) {
    var ctx = canvas.getContext("2d");
    for (connection of this.connections) {
      var ox = connection.output.x;
      var oy = connection.output.y;
      var ix = connection.input.x;
      var iy = connection.input.y; 
      ctx.moveTo(ox, oy);
      ctx.lineTo(ix, iy);
      ctx.stroke();
    }
  },

  startConnection: function(starting_vue_ref) {
    this.temp_start_vue_ref = starting_vue_ref;
  },

  endConnection: function(ending_vue_ref) {
    this.temp_end_vue_ref = ending_vue_ref

    this.addConnection(this.temp_start_vue_ref, this.temp_end_vue_ref);
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
  if (window.Event) {
    document.captureEvents(Event.MOUSEUP);
    document.captureEvents(Event.MOUSEDOWN);
    document.captureEvents(Event.MOUSEMOVE);
  }
  document.onmouseup = e => iDragDropHandler.updateMouseup(e);
  document.onmousedown = e => iDragDropHandler.updateMousedown(e);
  document.onmousemove = e => iDragDropHandler.updateMousemove(e);
}

