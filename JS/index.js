const graph = new Vue({
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



const graph2 = new Vue({
  el: '#graph2',
  data: {
    nodes: [], // NodeFactory.create.*()
  },
  methods: {
    newAddNode() {
      this.nodes.push( NodeFactory.create.Add() );
    },
    newNgonNode() {
      this.nodes.push( NodeFactory.create.Ngon() );
    },
    newEdgeLoopNode() {
      this.nodes.push( NodeFactory.create.EdgeLoop() );
    },
    newGetElementByIdNode() {
      this.nodes.push( NodeFactory.create.GetElementById() );
    },
    newRenderEdgeSetNode() {
      this.nodes.push( NodeFactory.create.RenderEdgeSet() );
    }
  },
})

var c = document.getElementById("passive-overlay-canvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

function newNode()
{
  let tag = document.createElement("dragdrop-overlay-box");
  let text = document.createTextNode("newNode");
  tag.appendChild(text);
  let element = document.getElementById("graph");
  element.appendChild(tag);
}