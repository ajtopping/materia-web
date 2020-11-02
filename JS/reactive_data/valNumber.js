// A Calculator will always output data of the same size and type

class ValueNumber {
  value_ = 0.0;

  profile_ = {
    in:[],
    out:[
    'number',
    ]
  }

  constructor() {

  }

  value() {
    return value_;
  }
}
