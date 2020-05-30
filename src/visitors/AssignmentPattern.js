import * as t from '@babel/types';

const defaultFunctionParameters = `
### Array Destructuring Assignment

**Default function parameters** allow named parameters to be initialized with default values if no value or undefined is passed.

#### Resources:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
`;

const defaultValuesDestructuring = `
### Default Values in Destructuring Assignment

A variable can be assigned a default, in the case that the value unpacked from the object or array is undefined.

#### Resources:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
`;

export default {
  AssignmentPattern(path) {
    if (path.listKey === 'params') {
      // function foo(a = 1) {}
      this.hints.push({ loc: path.node.loc, message: defaultFunctionParameters });
      this.tree.children.push({ text: path.toString(), node: path.node });
    } else if (t.isArrayPattern(path.parentPath) || t.isObjectProperty(path.parentPath)) {
      // const [a = 1] = [];
      // const { b = 1 } = {};
      this.hints.push({ loc: path.node.loc, message: defaultValuesDestructuring });
      this.tree.children.push({ text: path.toString(), node: path.node });
    }
  },
};
