//
var Sum = NodeFactory.create.Sum();
Sum.register();

var Sum_A1 = new ddEntry( 'number' );
Sum_A1.data_ = 1.1;
var Sum_A2 = new ddEntry( 'number' );
Sum_A1.data_ = 2.2;
var Sum_A3 = new ddEntry( 'number' );
Sum_A1.data_ = 3.3;
var Sum_A1_UUID = __DataDictionary.insert_new( Sum_A1 );
var Sum_A2_UUID = __DataDictionary.insert_new( Sum_A2 );
var Sum_A3_UUID = __DataDictionary.insert_new( Sum_A3 );

Sum.attemptConnectInput( 'numbers', Sum_A1_UUID );
Sum.attemptConnectInput( 'numbers', Sum_A2_UUID );
Sum.attemptConnectInput( 'numbers', Sum_A3_UUID );

var Sum_OUT_UUID = Sum.outputs_['output'].entry_uuid;
Sum.evaluate();

//
let out = __DataDictionary.get( Sum_OUT_UUID );
console.assert(  out == 6.6, { out: out, msg: "TestSumNode.js : Sum node did not evaluate to 6.6");