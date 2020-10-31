// A Calculator will always output data of the same size and type

class CalculatorAdd {
  a_;
  b_;

  profile_ = {
    in:[
    'number',
    'number',
    ],
    out:[
    'number',
    ]
  }

  constructor() {

  }

  calculate() {
    return a_ + b_;
  }
}
