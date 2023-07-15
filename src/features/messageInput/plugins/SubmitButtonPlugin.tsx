import { Button } from '@/components/ui/Button';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CLEAR_EDITOR_COMMAND, COMMAND_PRIORITY_HIGH } from 'lexical';
import { useCallback, useEffect } from 'react';
import { KEY_ENTER_COMMAND } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { $getRoot } from 'lexical';

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
    <Button onClick={handleSubmit} variant="outline" size="sm" className="w-20 bg-emerald-500">
      {label}
    </Button>
  );
};

export default SubmitButtonPlugin;
