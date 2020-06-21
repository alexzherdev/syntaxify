export function formatMessage({ title, body, resources }) {
  return `
  ### ${title}

  ${body}

  **Resources:**
  
  ${resources.join('\n')}
  `;
}

export function addHint(state, path, messageDetails) {
  state.hints.push({ loc: path.node.loc, message: formatMessage(messageDetails) });
  state.tree.children.push({ text: path.toString(), node: path.node });
}
