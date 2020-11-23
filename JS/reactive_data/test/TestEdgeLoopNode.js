
var EdgeLoopNode = NodeFactory.create.EdgeLoop();

EdgeLoopNode.register();

// Some test __DD entries
var entryA = new ddEntry( 'number' );
entryA.data_ = 3;

var uuidA = __DataDictionary.insert_new( entryA );

EdgeLoopNode.attemptConnectInput( 'num_verts', uuidA );