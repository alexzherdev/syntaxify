import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import visitor from './ArrayPattern';

it('detects array destructuring assignment with variable declaration', () => {
  const code = 'const [x] = foo;';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 9,
        "line": 1,
      },
      "start": Position {
        "column": 6,
        "line": 1,
      },
    }
  `);
});

it('detects array destructuring assignment without variable declaration', () => {
  const code = 'let x; [x] = foo;';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 10,
        "line": 1,
      },
      "start": Position {
        "column": 7,
        "line": 1,
      },
    }
  `);
});

it('detects array parameter destructuring', () => {
  const code = 'function x([a]) {}';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 14,
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
  const code = 'function x([a, [b]]) {}';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
});

it('correctly handles parameter destructuring nested under assignment', () => {
  const code = 'const x = function x([a]) {}';
  const hints = [];
  const tree = { children: [] };
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree });
  expect(tree.children.length).toBe(1);
  // TODO:
});
