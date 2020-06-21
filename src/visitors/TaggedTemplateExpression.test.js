import * as parser from '@babel/parser';
import { t } from '@babel/types';
import traverse from '@babel/traverse';
import visitor from './TaggedTemplateExpression';

it('detects tagged templates', () => {
  const code = 'tag`asd`';
  const hints = [];
  const ast = parser.parse(code);

  traverse(ast, visitor, {}, { hints, tree: { children: [] } });
  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 3,
        "line": 1,
      },
      "identifierName": "tag",
      "start": Position {
        "column": 0,
        "line": 1,
      },
    }
  `);
});
