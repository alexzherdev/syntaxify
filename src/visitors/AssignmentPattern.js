import * as t from '@babel/types';
import { addHint } from './helpers';

const defaultFunctionParameters = {
  title: 'Default parameters',
  body: `
  **Default function parameters** allow named parameters to be initialized with default values if no value or \`undefined\` is passed.
  `,
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)',
  ],
};

const defaultValuesDestructuring = {
  title: 'Default Values in Destructuring Assignment',
  body:
    'A variable can be assigned a default, in the case that the value unpacked from the object or array is `undefined`.',
  resources: ['[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)'],
};

export default {
  AssignmentPattern(path) {
    if (path.listKey === 'params') {
      // function foo(a = 1) {}
      addHint(this, path, defaultFunctionParameters);
    } else if (t.isArrayPattern(path.parentPath) || t.isObjectProperty(path.parentPath)) {
      // const [a = 1] = [];
      // const { b = 1 } = {};
      addHint(this, path, defaultValuesDestructuring);
    }
  },
};
