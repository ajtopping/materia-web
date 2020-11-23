
var AddNode = NodeFactory.create.Add();

AddNode.register();

// Some test __DD entries
var entryA = new ddEntry( 'number' );
entryA.data_ = 1.0;
var entryB = new ddEntry( 'number' );
entryB.data_ = 2.0;

var uuidA = __DataDictionary.insert_new( entryA );
var uuidB = __DataDictionary.insert_new( entryB );

AddNode.attemptConnectInput( 'left', uuidA );
AddNode.attemptConnectInput( 'right', uuidB );