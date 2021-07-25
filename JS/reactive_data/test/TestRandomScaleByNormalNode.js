//
var NgonNode = NodeFactory.create.Ngon();
NgonNode.register();
var NgonNodeA = new ddEntry( 'number' );
NgonNodeA.data_ = 8;
var uuidNgonNodeA = __DataDictionary.insert_new( NgonNodeA );
NgonNode.attemptConnectInput( 'num_sides', uuidNgonNodeA );
var uuidNgonNodeOutput = NgonNode.outputs_['output'].entry_uuid;
NgonNode.evaluate();

//
var PolygonNode = NodeFactory.create.Polygon();
PolygonNode.register();
PolygonNode.attemptConnectInput( 'vertex_data', uuidNgonNodeOutput );
var uuidPolygonNodeOutput = PolygonNode.outputs_['output'].entry_uuid;
PolygonNode.evaluate();

//

var RandomScaleByNormalNode = NodeFactory.create.RandomScaleByNormal();
RandomScaleByNormalNode.register();

var RandomScaleByNormalNode_MIN = new ddEntry( 'number' );
RandomScaleByNormalNode_MIN.data_ = 0.0;
var uuidRandomScaleByNormalNode_MIN = __DataDictionary.insert_new( RandomScaleByNormalNode_MIN );

var RandomScaleByNormalNode_MAX= new ddEntry( 'number' );
RandomScaleByNormalNode_MAX.data_ = 1.0;
var uuidRandomScaleByNormalNode_MAX = __DataDictionary.insert_new( RandomScaleByNormalNode_MAX );

RandomScaleByNormalNode.attemptConnectInput( 'polygon', uuidPolygonNodeOutput );
RandomScaleByNormalNode.attemptConnectInput( 'min', uuidRandomScaleByNormalNode_MIN );
RandomScaleByNormalNode.attemptConnectInput( 'max', uuidRandomScaleByNormalNode_MAX );
var uuidRandomScaleByNormalNodeOutput = RandomScaleByNormalNode.outputs_['output'].entry_uuid;
RandomScaleByNormalNode.evaluate();

//
var RenderPolygonNode = NodeFactory.create.RenderPolygon();
RenderPolygonNode.register();

var RenderPolygonNodeA = new ddEntry( 'canvas' );
RenderPolygonNodeA.data_ = document.getElementById('render-canvas');
var uuidRenderPolygonNodeA = __DataDictionary.insert_new( RenderPolygonNodeA );

var RenderPolygonNodeB = new ddEntry( 'number' );
RenderPolygonNodeB.data_ = 2.0;
var uuidRenderPolygonNodeB = __DataDictionary.insert_new( RenderPolygonNodeB );

var RenderPolygonNodeC = new ddEntry( 'string' );
RenderPolygonNodeC.data_ = 'hsl(0,100%,50%)';
var uuidRenderPolygonNodeC = __DataDictionary.insert_new( RenderPolygonNodeC );

RenderPolygonNode.attemptConnectInput( 'canvas', uuidRenderPolygonNodeA );
RenderPolygonNode.attemptConnectInput( 'polygon', uuidRandomScaleByNormalNodeOutput );
RenderPolygonNode.attemptConnectInput( 'size', uuidRenderPolygonNodeB );
RenderPolygonNode.attemptConnectInput( 'color', uuidRenderPolygonNodeC );
RenderPolygonNode.evaluate();