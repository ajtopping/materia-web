// A Calculator uses all of its inputs to calculate a single value output

class CalculatorSum {
 profile_ = {
    in:[
    'Array number',
    ],
    out:[
    'number',
    ]
  }

  constructor() {

  }

  calculate( arr ) {
    return arr.reduce( (a,b) => a+b );
  }
}
