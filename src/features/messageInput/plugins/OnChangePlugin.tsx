import { useLayoutEffect, useState } from 'react';
import { $getRoot } from 'lexical';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export function OnChangePlugin({
  ignoreHistoryMergeTagChange = true,
  ignoreSelectionChange = false,
  onChange,
}: {
  ignoreHistoryMergeTagChange?: boolean;
  ignoreSelectionChange?: boolean;
  onChange: (editorState: string, editorText: string) => void;
}): null {
  const [editor] = useLexicalComposerContext();
  const [initialRender, setInitalRender] = useState<boolean>(true);

  useLayoutEffect(() => {
    return editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves, prevEditorState, tags }) => {
        if (
          (ignoreSelectionChange && dirtyElements.size === 0 && dirtyLeaves.size === 0) ||
          (ignoreHistoryMergeTagChange && tags.has('history-merge')) ||
          prevEditorState.isEmpty()
        ) {
          return;
        }

        editorState.read(() => {
          const root = $getRoot();

          if (!initialRender) {
            onChange(JSON.stringify(editorState), root.getTextContent());
          } else {
            setInitalRender(false);
          }
        });
      },
    );
  }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, initialRender, onChange]);

  return null;
}
