export function formatMessage({ title, body, resources }) {
  return `
  ### ${title}

  ${body}

  **Resources:**
  
  ${resources.join('\n')}
  `;
}
