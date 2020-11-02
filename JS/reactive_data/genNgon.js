// A Generator outputs an array of variable size

class GeneratorNgon {
  profile_ = {
    in:[
    'number',
    ],
    out:[
    'Array number',
    ]
  }

  constructor() {

  }

  generate(num_sides) {
    let ngon = new Array(num_sides*2);
    let angle = 2 * Math.PI / num_sides;
    for( let i = 0; i < num_sides; i++ ) {
      ngon[i*2] = Math.sin(i * angle);
      ngon[i*2+1] = Math.cos(i * angle);
    }

    return ngon;
  }

}
