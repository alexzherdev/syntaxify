import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

const req = require.context('./visitors/', false, /\.js$/);
const visitors = {};
req.keys().forEach((key) => {
  Object.assign(visitors, req(key).default);
});

export default function syntaxify(code) {
  try {
    const hints = [];
    const ast = parser.parse(code);

    traverse(ast, visitors, {}, { hints });

    return hints;
  } catch (e) {
    if (e instanceof SyntaxError) {
      return null;
    }
    throw e;
  }
}
