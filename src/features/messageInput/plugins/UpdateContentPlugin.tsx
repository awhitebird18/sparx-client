import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_HISTORY_COMMAND } from 'lexical';

export function UpdateContentPlugin({ initialEditorState }: { initialEditorState: string }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (editor) {
      const newState = editor.parseEditorState(initialEditorState);
      editor.setEditorState(newState);
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }
  }, [editor, initialEditorState]);

  return null;
}
