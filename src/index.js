import * as monaco from 'monaco-editor';
import syntaxify from './syntaxify';

const editor = monaco.editor.create(document.getElementById('editor'), {
  value: ['function x([bar, baz]) {', '\tconst [x, y] = [1, 2];', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'javascript',
});

let previousDecorations = [];

function onChange() {
  const hints = syntaxify(editor.getValue());
  if (!hints) {
    return;
  }
  const decorations = hints.map(({ loc, message }) => ({
    range: new monaco.Range(loc.start.line, loc.start.column + 1, loc.end.line, loc.end.column + 1),
    options: { className: 'syntaxify-hint', hoverMessage: { value: message } },
  }));
  previousDecorations = editor.deltaDecorations(previousDecorations, decorations);
}

editor.getModel().onDidChangeContent(onChange);
onChange();
