Vue.component( 'node-component', {
  data: function () {
    return {
      x: 0,
      y: 0,
      color: "blue",
      inputs: [
        { name: "inputA"},
        { name: "inputB"},
        { name: "inputC"},
      ],
      outputs: [
        { name: "outputA"},
        { name: "outputB"},
      ]
    }
  },
  props: ['color'],
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
  props: ['index', 'name'],
  template: '<div class="node-row-frame">\
    <span class="node-input-pin" style="background-color:orange">🟠</span>\
    <span>node-input-component #{{ index }} "{{ name }}"</span>\
  </div>',
});

Vue.component( 'node-output-component', {
  props: ['index', 'name'],
  template: '<div class="node-row-frame">\
    <span>node-output-component #{{ index }} "{{ name }}"</span>\
    <span class="node-input-pin" style="background-color:cyan">🟦</span>\
  </div>',
});