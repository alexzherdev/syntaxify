import * as t from '@babel/types';
import { formatMessage } from './helpers';

const objectDestructuringAssignment = {
  title: 'Object Destructuring Assignment',
  body: `
  The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays,
  or properties from objects, into distinct variables.
  `,
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)',
  ],
};

const objectParameterDestructuring = {
  title: 'Object Parameter Destructuring',
  body: `
  The **destructuring assignment** syntax is a JavaScript expression that makes it possible to unpack values from arrays,
  or properties from objects, into distinct variables.
  `,
  resources: [
    '[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring)',
  ],
};

export default {
  ObjectPattern(path) {
    if (path.listKey === 'params') {
      // function foo({ a }) {}
      this.hints.push({ loc: path.node.loc, message: formatMessage(objectParameterDestructuring) });
      this.tree.children.push({ text: path.toString(), node: path.node });
    } else if (
      // skip nested ObjectPatterns like { b } in { a: { b }}
      path.parentPath.listKey !== 'properties' &&
      path.findParent((p) => t.isVariableDeclarator(p) || t.isAssignmentExpression(p))
    ) {
      // const { a } = foo;
      // { x } = bar;
      this.hints.push({ loc: path.node.loc, message: formatMessage(objectDestructuringAssignment) });
      this.tree.children.push({ text: path.toString(), node: path.node });
    }
  },
};
