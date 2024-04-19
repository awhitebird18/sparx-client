import { useEffect } from 'react';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

type Props = { initialEditorState: string };

const UpdateContentPlugin = ({ initialEditorState }: Props) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (editor) {
      const newState = editor.parseEditorState(initialEditorState);
      editor.setEditorState(newState);
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
    }
  }, [editor, initialEditorState]);

  return null;
};

export default UpdateContentPlugin;
