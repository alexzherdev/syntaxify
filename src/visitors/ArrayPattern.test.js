import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import ArrayPattern from './ArrayPattern';

it('detects array destructuring assignment', () => {
  const code = 'const [x] = foo;';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, ArrayPattern, {}, { hints });
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
