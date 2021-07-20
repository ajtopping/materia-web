var NgonNode = NodeFactory.create.Ngon();
NgonNode.register();
var NgonNodeA = new ddEntry( 'number' );
NgonNodeA.data_ = 5;
var uuidNgonNodeA = __DataDictionary.insert_new( NgonNodeA );
NgonNode.attemptConnectInput( 'num_sides', uuidNgonNodeA );
var uuidNgonNodeOutput = NgonNode.outputs_['output'].entry_uuid;
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
RenderEdgeSetNodeA.data_ = document.getElementById('render-canvas');
var uuidRenderEdgeSetNodeA = __DataDictionary.insert_new( RenderEdgeSetNodeA );
RenderEdgeSetNode.attemptConnectInput( 'canvas', uuidRenderEdgeSetNodeA );
RenderEdgeSetNode.attemptConnectInput( 'verts', uuidNgonNodeOutput );
RenderEdgeSetNode.attemptConnectInput( 'indexes', uuidEdgeLoopNodeOutput );

var ApplyTransformNode = NodeFactory.create.ApplyTransform();
ApplyTransformNode.register();
var ApplyTransformNodeA = new ddEntry( '_transform' );
ApplyTransformNodeA.data_ = new _Transform(0,0,0,0.5,0.5);
var uuidApplyTransformNodeA = __DataDictionary.insert_new( ApplyTransformNodeA );
ApplyTransformNode.attemptConnectInput( 'transform', uuidApplyTransformNodeA );
ApplyTransformNode.attemptConnectInput( 'points', uuidNgonNodeOutput );
var uuidApplyTransformOutput = ApplyTransformNode.outputs_['output'].entry_uuid;
ApplyTransformNode.evaluate();

var RenderEdgeSetNode2 = NodeFactory.create.RenderEdgeSet();
RenderEdgeSetNode2.register();
var RenderEdgeSetNode2A = new ddEntry( 'canvas' );
RenderEdgeSetNode2A.data_ = document.getElementById('render-canvas');
var uuidRenderEdgeSetNode2A = __DataDictionary.insert_new( RenderEdgeSetNode2A );
RenderEdgeSetNode2.attemptConnectInput( 'canvas', uuidRenderEdgeSetNodeA );
RenderEdgeSetNode2.attemptConnectInput( 'verts', uuidApplyTransformOutput );
RenderEdgeSetNode2.attemptConnectInput( 'indexes', uuidEdgeLoopNodeOutput );

RenderEdgeSetNode2.evaluate()
