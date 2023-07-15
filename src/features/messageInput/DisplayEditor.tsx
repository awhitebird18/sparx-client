import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import { editorConfig } from './configs/editorConfig';

type EditorProps = {
  content: string;
};

export default function DisplayEditor({ content }: EditorProps) {
  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editable: false }}>
      <RichTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<></>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <CodeHighlightPlugin />
      <ListPlugin />
      <LinkPlugin />
    </LexicalComposer>
  );
}
