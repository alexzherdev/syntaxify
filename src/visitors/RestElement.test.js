import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import visitor from './RestElement';

it('detects rest parameters', () => {
  const code = 'function x(a, ...rest) {}';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 21,
        "line": 1,
      },
      "start": Position {
        "column": 14,
        "line": 1,
      },
    }
  `);
});

it('detects rest object destructuring', () => {
  const code = 'const { x, ...rest } = foo;';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 18,
        "line": 1,
      },
      "start": Position {
        "column": 11,
        "line": 1,
      },
    }
  `);
});

it('detects rest array destructuring', () => {
  const code = 'const [x, ...rest] = foo;';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 17,
        "line": 1,
      },
      "start": Position {
        "column": 10,
        "line": 1,
      },
    }
  `);
});
