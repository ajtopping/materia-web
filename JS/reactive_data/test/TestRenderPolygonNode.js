var NgonNode = NodeFactory.create.Ngon();
NgonNode.register();
var NgonNodeA = new ddEntry( 'number' );
NgonNodeA.data_ = 8;
var uuidNgonNodeA = __DataDictionary.insert_new( NgonNodeA );
NgonNode.attemptConnectInput( 'num_sides', uuidNgonNodeA );
var uuidNgonNodeOutput = NgonNode.outputs_['output'].entry_uuid;
NgonNode.evaluate();

var PolygonNode = NodeFactory.create.Polygon();
PolygonNode.register();
PolygonNode.attemptConnectInput( 'vertex_data', uuidNgonNodeOutput );
var uuidPolygonNodeOutput = PolygonNode.outputs_['output'].entry_uuid;
PolygonNode.evaluate();

var RenderPolygonNode = NodeFactory.create.RenderPolygon();
RenderPolygonNode.register();

var RenderPolygonNodeA = new ddEntry( 'canvas' );
RenderPolygonNodeA.data_ = document.getElementById('render-canvas');
var uuidRenderPolygonNodeA = __DataDictionary.insert_new( RenderPolygonNodeA );

var RenderPolygonNodeB = new ddEntry( 'number' );
RenderPolygonNodeB.data_ = 5;
var uuidRenderPolygonNodeB = __DataDictionary.insert_new( RenderPolygonNodeB );

var RenderPolygonNodeC = new ddEntry( 'string' );
RenderPolygonNodeC.data_ = 'hsl(0,100%,50%)';
var uuidRenderPolygonNodeC = __DataDictionary.insert_new( RenderPolygonNodeC );

RenderPolygonNode.attemptConnectInput( 'canvas', uuidRenderPolygonNodeA );
RenderPolygonNode.attemptConnectInput( 'polygon', uuidPolygonNodeOutput );
RenderPolygonNode.attemptConnectInput( 'size', uuidRenderPolygonNodeB );
RenderPolygonNode.attemptConnectInput( 'color', uuidRenderPolygonNodeC );

RenderPolygonNode.evaluate();