
var SumNode = NodeFactory.create.Sum();

SumNode.register();

// Some test __DD entries
var entryA = new ddEntry( 'Array number' );
entryA.data_ = [1.0, 2.0, 3.0];

var uuidA = __DataDictionary.insert_new( entryA );

SumNode.attemptConnectInput( 'array', uuidA );