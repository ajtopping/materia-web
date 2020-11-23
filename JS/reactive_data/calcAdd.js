// A Calculator uses all of its inputs to calculate a single value output

class CalculatorSum {
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

  calculate( a, b ) {
    return a+b;
  }
}
