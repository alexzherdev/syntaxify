import traverse from './traverse';

const req = require.context('./visitors/', false, /(?<!test)\.js$/);
const visitors = {};
req.keys().forEach((key) => {
  Object.assign(visitors, req(key).default);
});

export default function syntaxify(code) {
  try {
    return traverse(code, visitors);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return null;
    }
    throw e;
  }
}
