import { useLayoutEffect } from 'react';
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

  useLayoutEffect(() => {
    if (onChange) {
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
            onChange(JSON.stringify(editorState), root.getTextContent());
          });
        },
      );
    }
  }, [editor, ignoreHistoryMergeTagChange, ignoreSelectionChange, onChange]);

  return null;
}
