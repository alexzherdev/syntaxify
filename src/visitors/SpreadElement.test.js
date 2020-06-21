import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import SpreadElement from './SpreadElement';

it('detects spread element in function calls', () => {
  const code = 'fn(x, ...rest);';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, SpreadElement, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 13,
        "line": 1,
      },
      "start": Position {
        "column": 6,
        "line": 1,
      },
    }
  `);
});

it('detects spread element in arrays', () => {
  const code = 'const x = [y, ...foo];';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, SpreadElement, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 20,
        "line": 1,
      },
      "start": Position {
        "column": 14,
        "line": 1,
      },
    }
  `);
});
