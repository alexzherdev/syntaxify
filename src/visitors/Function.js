import * as t from '@babel/types';

export default {
  Function: {
    enter(path) {
      let label;
      if (t.isArrowFunctionExpression(path)) {
        label = 'arrow';
      } else if (path.get('key').node) {
        label = path.get('key').get('name').node;
      } else if (path.get('id').node) {
        label = path.get('id').get('name').node;
      } else {
        label = 'function';
      }
      const newTreeNode = { type: 'function', label, node: path.node, parent: this.tree, children: [] };
      this.tree.children.push(newTreeNode);
      this.tree = newTreeNode;
    },
    exit(path) {
      this.tree = this.tree.parent;
    },
  },
};
