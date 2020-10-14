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
      ]
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
    <span class="node-input-pin" style="background-color:orange;" @mousedown="startConnection" @mosueup="endConnection">🟠</span>\
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
      x: 50,
      y: 50,
    }
  },
  props: ['index', 'name'],
  template: '<div class="node-row-frame" style="float:right; clear:both">\
    <span>{{ name }}</span>\
    <span class="node-input-pin" style="background-color:cyan" @mousedown="startConnection" @mouseup="endConnection">🟦</span>\
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