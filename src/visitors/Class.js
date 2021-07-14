const klass = {
  title: 'Classes',
  body: "Classes are primarily syntactical sugar over JavaScript's existing prototype-based inheritance",
  resources: ['[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)'],
};

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

      const { loc } = path.node;
      this.addHint(
        path,
        klass,
        {
          start: loc.start,
          end: { line: loc.start.line, column: loc.start.column + 'class'.length },
        },
        true
      );
    },
    exit(path) {
      this.tree = this.tree.parent;
    },
  },
};
