import * as parser from '@babel/parser';
import babelTraverse from '@babel/traverse';

function formatMessage({ title, body, resources }) {
  return `
  ### ${title}

  ${body}

  **Resources:**
  
  ${resources.join('\n')}
  `;
}

function addHint(path, messageDetails) {
  this.hints.push({ loc: path.node.loc, message: formatMessage(messageDetails) });
  this.tree.children.push({ text: path.toString(), node: path.node });
}

export default function traverse(code, visitors) {
  const hints = [];
  const ast = parser.parse(code, { sourceType: 'unambiguous' });
  const tree = { type: 'program', text: 'Program', children: [] };
  babelTraverse(ast, visitors, {}, { hints, tree, addHint });
  return { hints, tree };
}
