export default {
  Class: {
    enter(path) {
      let label;
      if (path.get('id').node) {
        label = path.get('id').get('name').node;
      } else {
        label = 'class';
      }
      const newTreeNode = {
        text: label,
        node: path.node,
        parent: this.tree,
        children: [],
        itree: {
          icon: 'class',
        },
      };
      this.tree.children.push(newTreeNode);
      this.tree = newTreeNode;
    },
    exit(path) {
      this.tree = this.tree.parent;
    },
  },
};
