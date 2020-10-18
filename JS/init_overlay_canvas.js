//window.onload = init_overlay_canvas_interval;

function init_overlay_canvas_interval () {
  var canvas = document.getElementById("passive-overlay-canvas");
  var context = canvas.getContext("2d");
  window.setInterval(
    function(c) {
      overlayConnectionRenderer.renderConnections(c);
    }, 2000, context);
};

//init_overlay_canvas_interval();