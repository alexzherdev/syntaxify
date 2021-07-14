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

function addHint(path, messageDetails, loc = path.node.loc, skipTree = false) {
  this.hints.push({ loc, message: formatMessage(messageDetails) });
  if (!skipTree) {
    this.tree.children.push({ text: path.toString(), node: path.node });
  }
}

export default function traverse(code, visitors) {
  const hints = [];
  const ast = parser.parse(code, { sourceType: 'unambiguous' });
  const tree = { type: 'program', text: 'Program', children: [] };
  babelTraverse(ast, visitors, {}, { hints, tree, addHint });
  return { hints, tree };
}
