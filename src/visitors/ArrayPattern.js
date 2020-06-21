import * as t from '@babel/types';
import { addHint } from './helpers';

const arrayParameterDestructuring = {
  title: 'Array Parameter Destructuring',
  body: `
  The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays,
  or properties from objects, into distinct variables.
  `,
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)',
  ],
};

const arrayDestructuringAssignment = {
  title: 'Array Destructuring Assignment',
  body: `
  The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays,
  or properties from objects, into distinct variables.
  `,
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)',
  ],
};
export default {
  ArrayPattern(path) {
    if (path.listKey === 'params') {
      // function foo([a]) {}
      addHint(this, path, arrayParameterDestructuring);
    } else if (
      // skip nested ArrayPatterns like [a] in [[a], b]
      path.listKey !== 'elements' &&
      path.findParent((p) => t.isVariableDeclarator(p) || t.isAssignmentExpression(p))
    ) {
      // const [a] = foo;
      // [x] = bar;
      addHint(this, path, arrayDestructuringAssignment);
    }
  },
};
