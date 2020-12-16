// A div with clipped boundaries that allows for camera panning
Vue.component( 'panning-overlay-box', {
  data: function () {
    return {
      x: 0,
      y: 0,
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
      x: this.pos_x,
      y: this.pos_y,
    }
  },
  props: {
    color: String,
    pos_x: {
      type: Number,
      default: 0,
    },
    pos_y: {
      type: Number,
      default: 0,
    },
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
  <slot></slot>\
  </div>',
});

// A container for node inputs and outputs
Vue.component( 'node-component', {
  data: function () {
    return {
      x: 0,
      y: 0,
      node_model: this.model,
    }
  },
  props: {
    color: String,
    model: {
      type: Object,
      default: () => (NodeFactory.create.Add()),
    }
  },
  template: '<div :style="updatedStyle">\
  <node-input-component v-for="(input_obj, input_name) in node_model.inputs_" \
  v-bind:name="input_name" \
  v-bind:type="input_obj.type" \
  v-bind:default_value="input_obj.default"> \
  v-bind:node_model="node_model"> \
  </node-input-component>\
  <node-output-component v-for="(output_obj, output_name) in node_model.outputs_" \
  v-bind:name="output_name" \
  v-bind:type="output_obj.type">\
  </node-output-component>\
  <button @mousedown="evaluate">Evaluate</button>\
  <button @mousedown="register">Register</button>\
  </div>',
  computed: {
    updatedStyle: function() {
      let style = "";
      return style + "left:" + this.x + "px;top:" + this.y + "px;background-color:" + this.color + ";";
    }
  },
  methods: {
    evaluate: function(e) {
      e.stopPropagation();
      this.node_model.evaluate.call(this.node_model);
    },
    register: function(e) {
      e.stopPropagation();
      this.node_model.register();
    }
  }
});

Vue.component( 'node-input-component', {
  data: function() {
    return {
      x: 0,
      y: 0,
      node: this.node_model,
    }
  },
  props: {
    name: String,
    type: String,
    default_value: [String, Number, Object, Array],
    node_model: Object,
  },
  template: '<div class="node-row-frame" style="float:left; clear:both">\
    <span class="node-input-pin" style="background-color:orange;" @mousedown="startConnection" @mouseup="endConnection">🟠</span>\
    <span>{{ name }} [{{ default_value }}]</span>\
  </div>',
  methods: {
    startConnection: function(e) {
      e.stopPropagation();
      __NodeConnectionHandler.setInputRef(this.$parent._data.node_model.inputs_[this.name]);
      overlayConnectionRenderer.startConnection(this);   
    },
    endConnection: function(e) {
      e.stopPropagation();
      __NodeConnectionHandler.setInputRef(this.$parent._data.node_model.inputs_[this.name]);
      overlayConnectionRenderer.endConnection(this);
      __NodeConnectionHandler.attemptConnection();
    },
  }
});

Vue.component( 'node-output-component', {
  data: function() {
    return {
      x: 0,
      y: 0,
      node: this.node_model,
    }
  },
   props: {
    name: String,
    type: String,
    node_model: Object,
  },
  template: '<div class="node-row-frame" style="float:right; clear:both">\
    <span>{{ name }}</span>\
    <span class="node-output-pin" style="background-color:cyan" @mousedown="startConnection" @mouseup="endConnection">🟦</span>\
  </div>',
  methods: {
    startConnection: function(e) {
      e.stopPropagation();
      overlayConnectionRenderer.startConnection(this);
      __NodeConnectionHandler.setOutputRef(this.$parent._data.node_model.outputs_[this.name]);
    },
    endConnection: function(e) {
      e.stopPropagation();
      overlayConnectionRenderer.endConnection(this);
      __NodeConnectionHandler.setOutputRef(this.$parent._data.node_model.outputs_[this.name]);
      __NodeConnectionHandler.attemptConnection();
    },
  }
});