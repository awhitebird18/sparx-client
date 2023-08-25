import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BLUR_COMMAND, COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from 'lexical';

type Props = {
  defaultSelection?: 'rootStart' | 'rootEnd';
};

export function AutoFocusPlugin({ defaultSelection }: Props): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.focus(
      () => {
        const activeElement = document.activeElement;
        const rootElement = editor.getRootElement() as HTMLDivElement;
        rootElement.style.backgroundColor = 'red !important';
        if (
          rootElement !== null &&
          (activeElement === null || !rootElement.contains(activeElement))
        ) {
          rootElement.focus({ preventScroll: true });
        }
      },
      { defaultSelection },
    );
  }, [defaultSelection, editor]);

  useEffect(
    () =>
      editor.registerCommand(
        BLUR_COMMAND,
        () => {
          const container = document.getElementById('focus-ring');
          const editorContainer = document.getElementById('editor-container');

          container?.classList.remove(
            'border-userLight',
            'dark:border-userMedium',
            'dark:shadow-userMedium',
          );
          editorContainer?.classList.add('opacity-60');
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    [editor],
  );

  useEffect(
    () =>
      editor.registerCommand(
        FOCUS_COMMAND,
        () => {
          const container = document.getElementById('focus-ring');
          const editorContainer = document.getElementById('editor-container');

          container?.classList.add(
            'border-userLight',
            'dark:border-userMedium',
            'dark:shadow-userMedium',
          );
          editorContainer?.classList.remove('opacity-60');
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
    [editor],
  );

  return null;
}
