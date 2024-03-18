import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useEffect } from 'react';

const OnChangePlugin = ({
  onChange,
}: {
  onChange?: (state: string) => void;
}): JSX.Element | null => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!onChange) return;
    const unregister = editor.registerUpdateListener(() => {
      onChange(JSON.stringify(editor.getEditorState().toJSON()));
    });

    return () => {
      unregister();
    };
  }, [editor, onChange]);

  return null;
};

export default OnChangePlugin;
