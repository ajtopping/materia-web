//window.onload = init_handler;

var __NodeGraphConnectionManager = {
  temp_mousedown_vue_obj : null,
  temp_mouseup_vue_obj : null,

  // { input:vue_ref , output:vue_ref}
  connections_ : [],
  endVueToStartVueMap : {},

  AttemptMakeConnectionFromVueObjects: function ( vueA, vueB ) {

  },

  RemoveConnection: function ( vueA, vueB ) {

  },

  identifyAndPackageIntoInputOutputPair_: function ( vueA, vueB ) {

  },

  isCyclic_: function ( ioPair ) {
    // temporarily erase previous output connection before checking?
  },

  MakeSafeConnection_: function ( ioPair ) {
    // remove old connection that may now be illegal (an input can only have one connection into it)


  },


  renderConnections: function(context) {
    if (!context) {
      context = this.passive_context_;
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();

    console.log("Rendering " + this.connections.length + " connections...");

    for (connection of this.connections) {
      let vue_output_rect = connection.output.$el.getBoundingClientRect();
      let vue_output_transform = {
        x : vue_output_rect.x,
        y : vue_output_rect.y,
      }

      let vue_input_rect = connection.input.$el.getBoundingClientRect();
      let vue_input_transform = {
        x : vue_input_rect.x,
        y : vue_input_rect.y,
      }

      let output_xy = this.clientCoordsToMinimapElementSpace( vue_output_transform, this.passive_canvas_);
      let input_xy = this.clientCoordsToMinimapElementSpace( vue_input_transform, this.passive_canvas_);

      context.moveTo(output_xy.x, output_xy.y);
      context.lineTo(input_xy.x, input_xy.y);
      context.stroke();
    }
  },

  clearTempRefs: function() {
    this.temp_start_vue_ref = null;
    this.temp_end_vue_ref = null;
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
  overlayConnectionRenderer.init_members();
  document.addEventListener("mousemove", e => overlayConnectionRenderer.renderInProgressConnection(e));
  document.addEventListener("mouseup", () => overlayConnectionRenderer.clearTempRefs());
}

__DocumentOnloadHandler.AddFunction(init_overlay_handler);

