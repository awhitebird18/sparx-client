import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BLUR_COMMAND } from 'lexical';
import { COMMAND_PRIORITY_LOW } from 'lexical';

const OnBlurPlugin = ({ onBlur }: { onBlur?: (val: any) => void }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onBlur) return;
    const unregisterBlur = editor.registerCommand(
      BLUR_COMMAND,
      () => {
        onBlur(JSON.stringify(editor.getEditorState().toJSON()));

        return false;
      },
      COMMAND_PRIORITY_LOW,
    );

    return () => {
      unregisterBlur();
    };
  }, [editor, onBlur]);

  return null;
};

export default OnBlurPlugin;
