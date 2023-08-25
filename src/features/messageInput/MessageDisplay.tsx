import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { UpdateContentPlugin } from './plugins/UpdateContentPlugin';

import { editorConfig } from '@/features/messageInput/configs/editorConfig';

function MessageDisplay({ content, id }: { content: string; id: string }) {
  return (
    <LexicalComposer
      initialConfig={{ ...editorConfig, editable: false, editorState: content, namespace: id }}
    >
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
      <UpdateContentPlugin initialEditorState={content} />
    </LexicalComposer>
  );
}

export default MessageDisplay;
