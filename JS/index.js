var apple = new Vue({
  el: '#apple',
  data: {
    message: 'Hello Vue!'
  }
})

var node1 = new Vue({
  el: '#node1',
  data: {
    color: "red",
    x: 50,
    y: 300,
  },
  computed: {
    updatedStyle: function() {
      let style = "user-select: none; display: inline-block; scrollbar-width: thin; position:absolute; width:100px;";
      return style + "left:" + this.x + "px;top:" + this.y + "px;background-color:" + this.color + ";";
    }
  },
  methods: {
    hello: function() {
      iDragDropHandler.addToSelection(this);
    },
    bye: function() {
      
    }
  }
})

var node2 = new Vue({
  el: '#node2',
  
})

var c = document.getElementById("passive-overlay-canvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

function newNode()
{
  let tag = document.createElement("p");
  let text = document.createTextNode("newNode");
  tag.appendChild(text);
  let element = document.getElementById("graph");
  element.appendChild(tag);
}