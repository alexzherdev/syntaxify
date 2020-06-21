import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import ObjectPattern from './ObjectPattern';

it('detects object destructuring assignment with variable declaration', () => {
  const code = 'const { x } = foo;';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, ObjectPattern, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 11,
        "line": 1,
      },
      "start": Position {
        "column": 6,
        "line": 1,
      },
    }
  `);
});

it('detects object destructuring assignment without variable declaration', () => {
  const code = 'let x; ({ x } = foo);';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, ObjectPattern, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 13,
        "line": 1,
      },
      "start": Position {
        "column": 8,
        "line": 1,
      },
    }
  `);
});

it('detects object parameter destructuring', () => {
  const code = 'function x({ a }) {}';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, ObjectPattern, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 16,
        "line": 1,
      },
      "start": Position {
        "column": 11,
        "line": 1,
      },
    }
  `);
});

it('skips nested patterns', () => {
  const code = 'function x({ a: { b }}) {}';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, ObjectPattern, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
});

it('correctly handles parameter destructuring nested under assignment', () => {
  const code = 'const x = function x({ a }) {}';
  const hints = [];
  const tree = { children: [] };
  const ast = parser.parse(code);

  traverse(ast, ObjectPattern, {}, { hints, tree });
  expect(tree.children.length).toBe(1);
  // TODO:
});
