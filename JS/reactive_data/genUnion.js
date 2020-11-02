// A Generator outputs an array of variable size

class GeneratorUnion {
  profile_ = {
    in:[
    'Array number',
    'Array number',
    ],
    out:[
    'Array number',
    ]
  }

  constructor() {

  }

  mutate(a,b) {
    return a.concat(b);
  }

}
