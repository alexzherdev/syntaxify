import * as t from '@babel/types';
import arrayDestructuringAssignment from '../md/arrayDestructuringAssignment.md';
import arrayParameterDestructuring from '../md/arrayParameterDestructuring.md';

export default {
  ArrayPattern(path) {
    if (path.listKey === 'params') {
      // function foo([a]) {}
      this.hints.push({ loc: path.node.loc, message: arrayParameterDestructuring });
    } else if (
      // skip nested ArrayPatterns like [a] in [[a], b]
      path.listKey !== 'elements' &&
      path.findParent((p) => t.isVariableDeclarator(p) || t.isAssignmentExpression(p))
    ) {
      // const [a] = foo;
      // [x] = bar;
      this.hints.push({ loc: path.node.loc, message: arrayDestructuringAssignment });
    }
  },
};
