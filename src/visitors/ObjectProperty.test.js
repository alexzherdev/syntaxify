import traverse from '../traverse';
import visitor from './ObjectProperty';

it('detects computed object properties', () => {
  const code = 'const x = { [foo]: 1 };';

  const { hints } = traverse(code, visitor);

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
