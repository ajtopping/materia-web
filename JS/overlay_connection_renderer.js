//window.onload = init_handler;

var overlayConnectionRenderer = {
  temp_start_vue_ref : {},
  temp_end_vue_ref : {},
  start_xy : {x:0,y:0},
  end_xy : {x:0,y:0},

  // { input:vue_ref , output:vue_ref}
  connections : [],

  init_members: function() {
    this.passive_canvas_ = document.getElementById("passive-overlay-canvas");
    this.active_canvas_ = document.getElementById("active-overlay-canvas");
    this.passive_context_ = this.passive_canvas_.getContext("2d");
    this.active_context_ = this.active_canvas_.getContext("2d");
  },

  renderInProgressConnection: function(event) {
    this.active_context_.clearRect(0, 0, this.active_canvas_.width, this.active_canvas_.height);
    this.active_context_.beginPath();
    
    if (this.temp_start_vue_ref.x) {
      this.active_context_.moveTo(event.clientX, event.clientY);
      this.active_context_.lineTo(this.temp_start_vue_ref.x, this.temp_start_vue_ref.y);
      this.active_context_.stroke();
    }
  },

  renderConnections: function(context) {
    if (!context) {
      context = this.passive_context_;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();

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
    window.alert(ending_vue_ref.$parent.$parent.x);

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
  overlayConnectionRenderer.init_members();
  document.addEventListener("mousemove", e => overlayConnectionRenderer.renderInProgressConnection(e));
  document.addEventListener("mouseup", () => overlayConnectionRenderer.clearTempRefs());
}

__DocumentOnloadHandler.AddFunction(init_overlay_handler);

