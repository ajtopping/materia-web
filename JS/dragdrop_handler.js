var iDragDropHandler = {
  mousedownX : 0,
  mousedownY : 0,
  mouseupX : 0,
  mouseupY : 0,
  mousemoveX : 0,
  mouseomveY : 0,
  selection : [],

  updateMousedown : function(e) {
    this.mousedownX = e.clientX;
    this.mousedownY = e.clientY;
  },

  updateMouseup : function(e) {
    this.mouseupX = e.clientX;
    this.mouseupY = e.clientY;

    this.clearSelection();
  },

  updateMousemove : function(e) {
    this.mousemoveX = e.clientX;
    this.mousemoveY = e.clientY;

    for (selected of this.selection) {
      selected.ref.x = this.mousemoveX - selected.offset.x;
      selected.ref.y = this.mousemoveY - selected.offset.y;
    }
  },

  addToSelection : function(vue_ref) {
    this.selection.push( {
      ref: vue_ref,
      offset: {
        x: (this.mousemoveX - vue_ref.x),
        y: (this.mousemoveY - vue_ref.y),
      },
    });
  },

  clearSelection : function(e) {
    this.selection = [];
  },
}

function init_handler() {
  document.addEventListener("mouseup", e => iDragDropHandler.updateMouseup(e));
  document.addEventListener("mousedown", e => iDragDropHandler.updateMousedown(e));
  document.addEventListener("mousemove", e => iDragDropHandler.updateMousemove(e));
}

__DocumentOnloadHandler.AddFunction( init_handler );

