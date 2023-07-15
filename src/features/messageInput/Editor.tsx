import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import TopToolbarPlugin from './plugins/TopToolbarPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import SubmitButtonPlugin from './plugins/SubmitButtonPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import BottomToolbarPLugin from './plugins/BottomToolbarPlugin';

function Placeholder({ value }: { value?: string }) {
  return <div className="editor-placeholder text-muted-foreground">{value}</div>;
}

type EditorProps = {
  placeholder?: string;
  config: InitialConfigType;
  onSubmit: (val: string) => void;
};

export default function Editor({ placeholder, config, onSubmit }: EditorProps) {
  return (
    <LexicalComposer initialConfig={config}>
      <div className="editor-container border border-border rounded-md">
        <TopToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder value={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ClearEditorPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
        <SubmitButtonPlugin onSubmit={onSubmit} />
        <BottomToolbarPLugin />
      </div>
    </LexicalComposer>
  );
}
