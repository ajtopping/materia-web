//
var NgonNode = NodeFactory.create.Ngon();
NgonNode.register();
var NgonNodeA = new ddEntry( 'number' );
NgonNodeA.data_ = 5;
var uuidNgonNodeA = __DataDictionary.insert_new( NgonNodeA );
NgonNode.attemptConnectInput( 'num_sides', uuidNgonNodeA );
var UUID_NgonNode_OUT = NgonNode.outputs_['output'].entry_uuid;
NgonNode.evaluate();

//
var ApplyTransformNode = NodeFactory.create.ApplyTransform();
ApplyTransformNode.register();
var ApplyTransformNode_TRANSFORM = new ddEntry( '_transform' );
ApplyTransformNode_TRANSFORM.data_ = new _Transform( 0, 0, 0, 0.5, 0.5 );
var UUID_ApplyTransformNode_TRANSFORM = __DataDictionary.insert_new( ApplyTransformNode_TRANSFORM )
ApplyTransformNode.attemptConnectInput( 'transform', UUID_ApplyTransformNode_TRANSFORM )
ApplyTransformNode.attemptConnectInput( 'points', UUID_NgonNode_OUT )
var UUID_ApplyTransformNode_OUT = ApplyTransformNode.outputs_['output'].entry_uuid
ApplyTransformNode.evaluate();

//
console.warn('TestSpokesNode.js : manually creating <Array _2f> for SpokesNode input. This is unhealthy!');
var ngonA = __DataDictionary.get( UUID_NgonNode_OUT ).data_;
var ngonB = __DataDictionary.get( UUID_ApplyTransformNode_OUT ).data_;
var SpokesNode_ARR_POINTS = new ddEntry( 'Array _2f' );
SpokesNode_ARR_POINTS.data_ = [ ngonA, ngonB ];
var UUID_SpokesNode_ARR_POINTS = __DataDictionary.insert_new( SpokesNode_ARR_POINTS );

//
var SpokesNode = NodeFactory.create.Spokes();
SpokesNode.register();
var SpokesNode_CUMM_OFFSET = new ddEntry( 'number' );
SpokesNode_CUMM_OFFSET.data_ = 0;
var UUID_SpokesNode_CUMM_OFFSET = __DataDictionary.insert_new( SpokesNode_CUMM_OFFSET );
SpokesNode.attemptConnectInput( 'cumm_offset', UUID_SpokesNode_CUMM_OFFSET );
SpokesNode.attemptConnectInput( 'arr_points', UUID_SpokesNode_ARR_POINTS );
var UUID_SpokesNode_OUT = SpokesNode.outputs_['output'].entry_uuid;
SpokesNode.evaluate();

//
var PolygonNode = NodeFactory.create.Polygon();
PolygonNode.register();
PolygonNode.attemptConnectInput( 'vertex_data', UUID_NgonNode_OUT );
var UUID_PolygonNodeOutput = PolygonNode.outputs_['output'].entry_uuid;
PolygonNode.evaluate();

//

var PointsAlongPolygonNode = NodeFactory.create.PointsAlongPolygon();
PointsAlongPolygonNode.register();

var PointsAlongPolygonNode_NUM_POINTS = new ddEntry( 'number' );
PointsAlongPolygonNode_NUM_POINTS.data_ = 4;
var UUID_PointsAlongPolygonNode_NUM_POINTS = __DataDictionary.insert_new( PointsAlongPolygonNode_NUM_POINTS );

var PointsAlongPolygonNode_CAP_ENDS = new ddEntry( 'boolean' );
PointsAlongPolygonNode_CAP_ENDS.data_ = true;
var UUID_PointsAlongPolygonNode_CAP_ENDS = __DataDictionary.insert_new( PointsAlongPolygonNode_CAP_ENDS );

PointsAlongPolygonNode.attemptConnectInput( 'polygon', UUID_PolygonNodeOutput );
PointsAlongPolygonNode.attemptConnectInput( 'num_points', UUID_PointsAlongPolygonNode_NUM_POINTS );
PointsAlongPolygonNode.attemptConnectInput( 'cap_ends', UUID_PointsAlongPolygonNode_CAP_ENDS );
var UUID_PointsAlongPolygonNode_OUTPUT = PointsAlongPolygonNode.outputs_['output'].entry_uuid;
PointsAlongPolygonNode.evaluate();

//
var RenderPointsNode = NodeFactory.create.RenderPoints();
RenderPointsNode.register();

var RenderPointsNode_CANVAS = new ddEntry( 'canvas' );
RenderPointsNode_CANVAS.data_ = document.getElementById('render-canvas');
var UUID_RenderPointsNode_CANVAS = __DataDictionary.insert_new( RenderPointsNode_CANVAS );

var RenderPointsNode_SIZE = new ddEntry( 'number' );
RenderPointsNode_SIZE.data_ = 12.0;
var UUID_RenderPointsNode_SIZE = __DataDictionary.insert_new( RenderPointsNode_SIZE );

var RenderPointsNode_COLOR = new ddEntry( 'string' );
RenderPointsNode_COLOR.data_ = 'hsl(150,100%,50%)';
var UUID_RenderPointsNode_COLOR = __DataDictionary.insert_new( RenderPointsNode_COLOR );

RenderPointsNode.attemptConnectInput( 'canvas', UUID_RenderPointsNode_CANVAS );
RenderPointsNode.attemptConnectInput( 'verts', UUID_PointsAlongPolygonNode_OUTPUT );
RenderPointsNode.attemptConnectInput( 'size', UUID_RenderPointsNode_SIZE );
RenderPointsNode.attemptConnectInput( 'color', UUID_RenderPointsNode_COLOR );
RenderPointsNode.evaluate();