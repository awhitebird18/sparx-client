import { useCallback, useEffect } from 'react';
import { CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_HIGH, KEY_ENTER_COMMAND, $getRoot } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { Button } from '@/components/ui/Button';

type props = { onSubmit: (val: string) => void; label: React.ReactNode };

const SubmitButtonPlugin = ({ onSubmit, label }: props) => {
  const [editor] = useLexicalComposerContext();

  const handleSubmit = useCallback(() => {
    const editorState = editor.getEditorState();

    editorState.read(() => {
      const textContent = $getRoot().getTextContent();
      if (!textContent) return;
      onSubmit(JSON.stringify(editorState));
      editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
    });
  }, [editor, onSubmit]);

  const onEnterPress = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit();
      }
      return true;
    },
    [handleSubmit],
  );

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(KEY_ENTER_COMMAND, onEnterPress, COMMAND_PRIORITY_HIGH),
    );
  }, [editor, onEnterPress]);

  return (
    <Button
      id="submit-button"
      onClick={handleSubmit}
      variant="outline"
      size="sm"
      className="w-20 bg-userMedium hover:bg-userDark text-white hover:text-white"
    >
      {label}
    </Button>
  );
};

export default SubmitButtonPlugin;
