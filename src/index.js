import * as monaco from 'monaco-editor';
import syntaxify from './syntaxify';

const editor = monaco.editor.create(document.getElementById('editor'), {
  value: ['function x([bar, baz]) {', '\tconst [x, y] = [1, 2];', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
});

let previousDecorations = [];

function onChange() {
  const results = syntaxify(editor.getValue());
  if (!results) {
    return;
  }
  const { hints, tree } = results;
  const decorations = hints.map(({ loc, message }) => ({
    range: new monaco.Range(loc.start.line, loc.start.column + 1, loc.end.line, loc.end.column + 1),
    options: { className: 'syntaxify-hint', hoverMessage: { value: message } },
  }));
  previousDecorations = editor.deltaDecorations(previousDecorations, decorations);

  renderTree(tree);
}

function renderTree(tree) {
  const container = document.getElementById('tree');
  container.innerHTML = '';

  function printNode(node, depth) {
    if (node) {
      const el = document.createElement('div');
      el.innerHTML = node.label;
      el.style.paddingLeft = `${depth * 8}px`;
      container.appendChild(el);
      if (node.children) {
        node.children.forEach((child) => {
          printNode(child, depth + 1);
        });
      }
    }
  }

  tree.children.forEach((child) => {
    printNode(child, 0);
  });
}

editor.getModel().onDidChangeContent(onChange);
onChange();
