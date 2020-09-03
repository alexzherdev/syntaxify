import * as monaco from 'monaco-editor';
import InspireTree from 'inspire-tree';
import InspireTreeDOM from 'inspire-tree-dom';
import syntaxify from './syntaxify';
import './styles.css';

const editor = monaco.editor.create(document.getElementById('editor'), {
  value: `class Class {
  method([ item ], ...rest) {
    const { renamed: tag } = item;
    const [one, two] = rest;
    function innerFunction() {
      tag\`asd\`;
    }
  }

  anotherMethod(foo) {
    const spread = [...foo];
  }
}`,
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
  const inspireTree = new InspireTree({
    data: tree.children,
  });
  inspireTree.expandDeep();

  new InspireTreeDOM(inspireTree, {
    target: '#tree',
  });

  inspireTree.on('node.click', function (event, node) {
    // event.preventTreeDefault(); // Cancels default listener
    editor.setPosition({ column: 1, lineNumber: 1 });
  });
}

editor.getModel().onDidChangeContent(onChange);
onChange();
