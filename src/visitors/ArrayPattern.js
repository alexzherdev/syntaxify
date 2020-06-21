import * as t from '@babel/types';
import { formatMessage } from './helpers';

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
      this.hints.push({ loc: path.node.loc, message: formatMessage(arrayParameterDestructuring) });
      this.tree.children.push({ text: path.toString(), node: path.node });
    } else if (
      // skip nested ArrayPatterns like [a] in [[a], b]
      path.listKey !== 'elements' &&
      path.findParent((p) => t.isVariableDeclarator(p) || t.isAssignmentExpression(p))
    ) {
      // const [a] = foo;
      // [x] = bar;
      this.hints.push({ loc: path.node.loc, message: formatMessage(arrayDestructuringAssignment) });
      this.tree.children.push({ text: path.toString(), node: path.node });
    }
  },
};
