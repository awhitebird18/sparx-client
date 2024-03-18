import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

import Nodes from './nodes/Nodes';
import editorTheme from './theme/theme';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';

const Editor = ({ content }: { content: string | undefined }) => {
  const lexicalConfig: InitialConfigType = {
    editable: false,
    namespace: 'My Display Only Editor',
    onError: (e) => {
      console.error('ERROR:', e);
    },
    theme: editorTheme,
    nodes: Nodes,
    editorState: content,
  };

  return (
    <LexicalComposer initialConfig={lexicalConfig}>
      <div className="flex gap-8 overflow-hidden editor-shell relative h-full w-full">
        <RichTextPlugin
          contentEditable={
            <div className="editor-scroller h-full relative w-full flex flex-col">
              <div className="editor relative flex flex-col h-full">
                <ContentEditable
                  className="p-4 px-8 rounded-lg overflow-hidden outline-none h-full flex-1"
                  readOnly={true} // Ensure content is not editable
                />
              </div>
            </div>
          }
          placeholder={<div className="Placeholder__root">Display-only mode</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <CodeHighlightPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
