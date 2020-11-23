
var NgonNode = NodeFactory.create.Ngon();

NgonNode.register();

// Some test __DD entries
var entryA = new ddEntry( 'number' );
entryA.data_ = 5;

var uuidA = __DataDictionary.insert_new( entryA );

NgonNode.attemptConnectInput( 'num_sides', uuidA );