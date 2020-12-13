var apple = new Vue({
  el: '#apple',
  data: {
    message: 'Hello Vue!'
  }
})

var graph = new Vue({
  el: '#graph',
  
})

var node3_parent_parent = new Vue({
  el: '#node3-parent-parent',
  
})

var node4 = new Vue({
  el: '#node4',
  
})
/*
var node3 = new Vue({
  el: '#node3',
  
})*/





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