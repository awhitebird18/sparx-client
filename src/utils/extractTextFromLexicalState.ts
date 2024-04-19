export function extractTextFromLexicalState(lexicalState: string) {
  try {
    const parsedState = JSON.parse(lexicalState);
    const root = parsedState.root;
    if (root && root.children && root.children.length > 0) {
      for (const child of root.children) {
        if (child.children && child.children.length > 0) {
          for (const subChild of child.children) {
            if (subChild.type === 'text') {
              return subChild.text || '';
            }
          }
        }
      }
    }
    return '';
  } catch (error) {
    console.error('Error parsing Lexical state:', error);
    return '';
  }
}
