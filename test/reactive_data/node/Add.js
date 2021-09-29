describe("Add", function() {
  var Node;

  beforeEach(function() {
    Node = NodeFactory.create.Add();
    Node.register();
  });

  it("should add two floats", function() {
    let A1 = new ddEntry( 'number' );
    A1.data_ = 1.1;
    let A2 = new ddEntry( 'number' );
    A2.data_ = 2.2;

    let A1_UUID = __DataDictionary.insert_new( A1 );
    let A2_UUID = __DataDictionary.insert_new( A2 );

    Node.attemptConnectInput( 'left', A1_UUID );
    Node.attemptConnectInput( 'right', A2_UUID );

    let OUT_UUID = Node.outputs_['output'].entry_uuid;
    Node.evaluate();

    let OUT = __DataDictionary.get(OUT_UUID);

    expect(OUT.data_).toEqual(1.1 + 2.2);
  });
});
