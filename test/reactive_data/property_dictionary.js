describe("Property Dictionary", function() {
  var __PD;

  beforeEach(function() {
    __PD = new PropertyDictionary();
  });

  it("should not contain the 'name' property on the specified object", function() {
    let A1 = 'fake_uuid';

    expect(__PD.has_prop( A1, 'name' )).toBe(false);
  });

  it("should contain the 'name' property and retrieve it", function() {
    let A1 = 'fake_uuid';
    let A2 = new pdEntry( 'string' );
    A2.data_ = 'Bob';

    __PD.add_or_replace_prop( A1, 'name', A2 );
    expect(__PD.has_prop( A1, 'name' )).toBe(true);

    let A_OUT = __PD.get_prop( A1, 'name' );
    expect(A_OUT.data_).toEqual('Bob');
  });
});
