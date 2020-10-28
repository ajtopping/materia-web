//window.onload = init_handler;

var overlayConnectionRenderer = {
  temp_start_vue_ref : null,
  temp_end_vue_ref : null,

  // { input:vue_ref , output:vue_ref}
  connections : [],

  init_members: function() {
    this.passive_canvas_ = document.getElementById("passive-overlay-canvas");
    this.active_canvas_ = document.getElementById("active-overlay-canvas");
    this.passive_context_ = this.passive_canvas_.getContext("2d");
    this.active_context_ = this.active_canvas_.getContext("2d");
  },

  // Converts window coordinates to the exact same position but relative to a DOM element
  clientCoordsToElementSpace: function( xy, element ) {
    let el_rect = element.getBoundingClientRect();

    return {
      x: xy.x - el_rect.x,
      y: xy.y - el_rect.y,
    }
  },

  // Scales window coordinates for placing within a DOM element (like a minimap)
  clientCoordsToMinimapElementSpace: function( xy, element ) {
    let el_rect = element.getBoundingClientRect();
    let el_transform = {
      sX : element.width / window.innerWidth,
      sY : element.height / window.innerHeight,
    }

    return {
      x: xy.x * el_transform.sX,
      y: xy.y * el_transform.sY,
    }
  },

  renderInProgressConnection: function(event) {
    this.active_context_.clearRect(0, 0, this.active_canvas_.width, this.active_canvas_.height);
    this.active_context_.beginPath();

    if (this.temp_start_vue_ref) {
      let vue_ref_rect = this.temp_start_vue_ref.$el.getBoundingClientRect();
      let vue_ref_transform = {
        x : vue_ref_rect.x,
        y : vue_ref_rect.y,
      }

      let mouse_xy = {
        x: event.clientX,
        y: event.clientY,
      }
      let start_xy = this.clientCoordsToElementSpace( vue_ref_transform, this.active_canvas_);
      let end_xy = this.clientCoordsToElementSpace( mouse_xy, this.active_canvas_);

      this.active_context_.moveTo(start_xy.x, start_xy.y);
      this.active_context_.lineTo(end_xy.x, end_xy.y);
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

