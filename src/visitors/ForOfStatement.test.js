import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import visitor from './ForOfStatement';

it('detects for...of', () => {
  const code = 'for (const x of y) {}';
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
        "column": 0,
        "line": 1,
      },
    }
  `);
});
