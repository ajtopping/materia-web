// A Generator outputs an array of variable size

class GeneratorClosedLoop {
  profile_ = {
    in:[
    'Array number',
    ],
    out:[
    'Array number',
    ]
  }

  constructor() {

  }

  generate(a) {
    let indexes = new Array(a.length * 2);
    for( let i = 0; i < a.length; i++ ) {
      indexes[i*2] = i;
      indexes[i*2+1] = i+1
    }
    indexes[indexes.length-1] = 0;

    return indexes;
  }

}
