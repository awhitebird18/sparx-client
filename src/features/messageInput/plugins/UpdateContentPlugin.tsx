import { useEffect } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

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
