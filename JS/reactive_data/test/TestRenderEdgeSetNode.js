var NgonNode = NodeFactory.create.Ngon();
NgonNode.register();
var NgonNodeA = new ddEntry( 'number' );
NgonNodeA.data_ = 5;
var uuidNgonNodeA = __DataDictionary.insert_new( NgonNodeA );
NgonNode.attemptConnectInput( 'num_sides', uuidNgonNodeA );
var uuiduuidNgonNodeOutput = NgonNode.outputs_['output'].entry_uuid;
NgonNode.evaluate();

var EdgeLoopNode = NodeFactory.create.EdgeLoop();
EdgeLoopNode.register();
var EdgeLoopNodeA = new ddEntry( 'number' );
EdgeLoopNodeA.data_ = 5;
var uuidEdgeLoopNodeA = __DataDictionary.insert_new( EdgeLoopNodeA );
EdgeLoopNode.attemptConnectInput( 'num_verts', uuidEdgeLoopNodeA );
var uuidEdgeLoopNodeOutput = EdgeLoopNode.outputs_['output'].entry_uuid;
EdgeLoopNode.evaluate();

var RenderEdgeSetNode = NodeFactory.create.RenderEdgeSet();
RenderEdgeSetNode.register();
var RenderEdgeSetNodeA = new ddEntry( 'canvas' );
RenderEdgeSetNodeA.data_ = document.getElementById('debug-canvas');
var uuidRenderEdgeSetNodeA = __DataDictionary.insert_new( RenderEdgeSetNodeA );
RenderEdgeSetNode.attemptConnectInput( 'canvas', uuidRenderEdgeSetNodeA );
RenderEdgeSetNode.attemptConnectInput( 'verts', uuiduuidNgonNodeOutput );
RenderEdgeSetNode.attemptConnectInput( 'indexes', uuidEdgeLoopNodeOutput );