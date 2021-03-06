import traverse from '../traverse';
import visitor from './AssignmentPattern';

it('detects function default parameters', () => {
  const code = 'function foo(x = 1) {}';

  const { hints } = traverse(code, visitor);

  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 18,
        "line": 1,
      },
      "start": Position {
        "column": 13,
        "line": 1,
      },
    }
  `);
});

it('detects default values in object destructuring', () => {
  const code = 'const { x = 1 } = {};';

  const { hints } = traverse(code, visitor);

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

it('detects default values in array destructuring', () => {
  const code = 'const [x = 1] = [];';

  const { hints } = traverse(code, visitor);

  expect(hints.length).toBe(1);
  expect(hints[0].loc).toMatchInlineSnapshot(`
    SourceLocation {
      "end": Position {
        "column": 12,
        "line": 1,
      },
      "start": Position {
        "column": 7,
        "line": 1,
      },
    }
  `);
});
