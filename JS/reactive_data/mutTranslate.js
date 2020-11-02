// A Mutator is a lazy function applied to every element in the input

class MutatorTranslate {
 profile_ = {
    in:[
    'number',
    ],
    out:[
    'number',
    ]
  }

  constructor() {

  }

  mutate(input, factor) {
    return input + factor;
  }

}
