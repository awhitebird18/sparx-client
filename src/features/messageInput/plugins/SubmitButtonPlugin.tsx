import { Button } from '@/components/ui/Button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Send } from 'react-bootstrap-icons';
import { CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { useCallback, useEffect } from 'react';
import { KEY_ENTER_COMMAND } from 'lexical';
import { mergeRegister } from '@lexical/utils';

type props = { onSubmit: (val: string) => void };

const SubmitButtonPlugin = ({ onSubmit }: props) => {
  const [editor] = useLexicalComposerContext();

  const handleSubmit = useCallback(() => {
    const editorState = editor.getEditorState();

    onSubmit(JSON.stringify(editorState));

    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
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
      onClick={handleSubmit}
      className="absolute right-1.5 bottom-1.5"
      variant="outline"
      size="sm"
    >
      <Send className="mr-2 text-xs mt-0.5" /> Send
    </Button>
  );
};

export default SubmitButtonPlugin;
