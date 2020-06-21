import * as t from '@babel/types';
import { addHint } from './helpers';

const computedProperty = {
  title: 'Computed Property Names',
  body: 'You can use an expression instead of a regular property name.',
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)',
  ],
};

export default {
  ObjectProperty(path) {
    if (path.node.computed) {
      addHint(this, path, computedProperty);
    }
  },
};
