//window.onload = init_i_mouse_values_handler;

var iMouseValuesHandler = {
  mousedownX : 0,
  mousedownY : 0,
  mouseupX : 0,
  mouseupY : 0,
  mousemoveX : 0,
  mousemoveY : 0,

  updateMousedown : function(e) {
    this.mousedownX = e.clientX;
    this.mousedownY = e.clientY;
  },

  updateMouseup : function(e) {
    this.mouseupX = e.clientX;
    this.mouseupY = e.clientY;
  },

  updateMousemove : function(e) {
    this.mousemoveX = e.clientX;
    this.mousemoveY = e.clientY;
  },
}

function init_i_mouse_values_handler() {
  if (window.Event) {
    document.captureEvents(Event.MOUSEUP);
    document.captureEvents(Event.MOUSEDOWN);
    document.captureEvents(Event.MOUSEMOVE);
  }
  document.onmouseup = e => iDragDropHandler.updateMouseup(e);
  document.onmousedown = e => iDragDropHandler.updateMousedown(e);
  document.onmousemove = e => iDragDropHandler.updateMousemove(e);
}

