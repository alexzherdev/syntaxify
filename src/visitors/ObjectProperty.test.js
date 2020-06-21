import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import ObjectProperty from './ObjectProperty';

it('detects computed object properties', () => {
  const code = 'const x = { [foo]: 1 };';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, ObjectProperty, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 20,
        "line": 1,
      },
      "start": Position {
        "column": 12,
        "line": 1,
      },
    }
  `);
});
