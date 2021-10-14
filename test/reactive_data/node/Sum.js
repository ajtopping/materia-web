describe("Sum", function() {
  var Node;

  beforeEach(function() {
    Node = NodeFactory.create.Sum();
    Node.register();
  });

  it("should take a single float and return it", function() {
    let A1 = new ddEntry( 'number' );
    A1.data_ = 1.1;

    let A1_UUID = __DataDictionary.insert_new( A1 );

    Node.attemptConnectInput( 'numbers', A1_UUID );

    let OUT_UUID = Node.outputs_['output'].entry_uuid;
    Node.evaluate();

    let OUT = __DataDictionary.get(OUT_UUID);

    expect(OUT.data_).toEqual(1.1);
  });

  it("should take two floats and return the sum", function() {
    let A1 = new ddEntry( 'number' );
    A1.data_ = 1.1;
    let A2 = new ddEntry( 'number' );
    A2.data_ = 2.2;

    let A1_UUID = __DataDictionary.insert_new( A1 );
    let A2_UUID = __DataDictionary.insert_new( A2 );

    Node.attemptConnectInput( 'numbers', A1_UUID );
    Node.attemptConnectInput( 'numbers', A2_UUID );

    let OUT_UUID = Node.outputs_['output'].entry_uuid;
    Node.evaluate();

    let OUT = __DataDictionary.get(OUT_UUID);

    expect(OUT.data_).toEqual(1.1 + 2.2);
  });

  it("should take three floats and return the sum", function() {
    let A1 = new ddEntry( 'number' );
    A1.data_ = 1.1;
    let A2 = new ddEntry( 'number' );
    A2.data_ = 2.2;
    let A3 = new ddEntry( 'number' );
    A3.data_ = -3.0;

    let A1_UUID = __DataDictionary.insert_new( A1 );
    let A2_UUID = __DataDictionary.insert_new( A2 );
    let A3_UUID = __DataDictionary.insert_new( A3 );

    Node.attemptConnectInput( 'numbers', A1_UUID );
    Node.attemptConnectInput( 'numbers', A2_UUID );
    Node.attemptConnectInput( 'numbers', A3_UUID );

    let OUT_UUID = Node.outputs_['output'].entry_uuid;
    Node.evaluate();

    let OUT = __DataDictionary.get(OUT_UUID);

    expect(OUT.data_).toEqual(1.1 + 2.2 + -3.0);
  });
});
