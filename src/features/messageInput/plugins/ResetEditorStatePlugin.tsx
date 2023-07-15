import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_HISTORY_COMMAND } from 'lexical';

type props = { editorState: string };

export function ResetEditorStatePlugin({ editorState }: props) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (editor) {
      const newState = editor.parseEditorState(editorState);
      editor.setEditorState(newState);
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }
  }, [editor, editorState]);

  return null;
}
