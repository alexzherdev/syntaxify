import traverse from '../traverse';
import visitor from './TaggedTemplateExpression';

it('detects tagged templates', () => {
  const code = 'tag`asd`';

  const { hints } = traverse(code, visitor);

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
