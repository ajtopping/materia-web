// A div with clipped boundaries that allows for camera panning
Vue.component( 'panning-overlay-box', {
  data: function () {
    return {
      x: 0,
      y: 0,
      color: "green",
    }
  },
  computed: {
    updatedStyle: function() {
      // display: relative // necessary for clipping?
      let style = "position: fixed; user-select: none; display: relative; scrollbar-width: thin; width:100px;";
      
      style += ""
      //return style + "left:" + this.x + "px; top:" + this.y + "px; ";
      return style + "transform: translate(" + this.x + "px," + this.y + "px); ";
    }
  },
  methods: {
    hello: function() {
      iDragDropHandler.addToSelection(this);
    },
    bye: function() {
      
    }
  },
  template: '<div :style="updatedStyle" @mousedown="hello">\
  <slot></slot>\
  </div>',
});

// A div with an absolute css position that can be dragged and dropped
Vue.component( 'dragdrop-overlay-box', {
  data: function () {
    return {
      x: 0,
      y: 100,
      color: "green",
    }
  },
  computed: {
    updatedStyle: function() {
      let style = "border-style: dotted; user-select: none; display: inline-block; scrollbar-width: thin; width:100px;";
      return style + "transform: translate3d(" + this.x + "px," + this.y + "px, 0px); background-color:" + this.color + ";";
    }
  },
  methods: {
    hello2: function(e) {
      iDragDropHandler.addToSelection(this);
      e.stopPropagation();
    },
    bye: function() {
      
    }
  },
  template: '<div :style="updatedStyle" @mousedown="hello2">\
  {{x}}, {{y}}\
  </div>',
});

// A container for node inputs and outputs
Vue.component( 'node-component', {
  data: function () {
    return {
      x: 0,
      y: 0,
      color: "blue",
      inputs: [
        { name: "in-A"},
        { name: "in-B"},
        { name: "in-C"},
      ],
      outputs: [
        { name: "out-A"},
        { name: "out-B"},
      ],
      node_model: {
        inputs_: {
          left : {
            type: 'number',
            default: 1.0,
            entry_uuid: null,
          },
          right : {
            type: 'number',
            default: 2.0,
            entry_uuid: null,
          },
        },
        outputs_: {
          output: {
            type: 'number',
            entry_uuid: null,
          }
        },
        func_: {

        },
      }
    }
  },
  props: {
    color: String,
  },
  template: '<div :style="updatedStyle">\
  <node-input-component v-for="(input, index) in inputs" v-bind:index="index" v-bind:name="input.name">\
  </node-input-component>\
  <node-output-component v-for="(output, index) in outputs" v-bind:index="index" v-bind:name="output.name">\
  </node-output-component>\
  </div>',
  computed: {
    updatedStyle: function() {
      let style = "";
      return style + "left:" + this.x + "px;top:" + this.y + "px;background-color:" + this.color + ";";
    }
  },
});

Vue.component( 'node-input-component', {
  data: function() {
    return {
      x: 0,
      y: 0,
    }
  },
  props: ['index', 'name'],
  template: '<div class="node-row-frame" style="float:left; clear:both">\
    <span class="node-input-pin" style="background-color:orange;" @mousedown="startConnection" @mouseup="endConnection">🟠</span>\
    <span>{{ name }}</span>\
  </div>',
  methods: {
    startConnection: function(e) {
        overlayConnectionRenderer.startConnection(this);
        e.stopPropagation();
    },
    endConnection: function(e) {
        overlayConnectionRenderer.endConnection(this);
        e.stopPropagation();
    },
  }
});

Vue.component( 'node-output-component', {
  data: function() {
    return {
      x: 0,
      y: 0,
    }
  },
  props: ['index', 'name'],
  template: '<div class="node-row-frame" style="float:right; clear:both">\
    <span>{{ name }}</span>\
    <span class="node-output-pin" style="background-color:cyan" @mousedown="startConnection" @mouseup="endConnection">🟦</span>\
  </div>',
  methods: {
    startConnection: function(e) {
        overlayConnectionRenderer.startConnection(this);
        e.stopPropagation();
    },
    endConnection: function(e) {
        overlayConnectionRenderer.endConnection(this);
        e.stopPropagation();
    },
  }
});