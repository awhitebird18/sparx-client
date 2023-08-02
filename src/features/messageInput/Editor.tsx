import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from './plugins/AutoFocusPlugin';
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
import { Send } from 'react-bootstrap-icons';
import { OnChangePlugin } from './plugins/OnChangePlugin';

function Placeholder({ value }: { value?: string }) {
  return <div className="editor-placeholder text-muted-foreground">{value}</div>;
}

type EditorProps = {
  placeholder?: string;
  config: InitialConfigType;
  onSubmit: (val: string) => void;
  onChange?: (val: string) => void;
};

export default function Editor({ placeholder, config, onSubmit, onChange }: EditorProps) {
  return (
    <LexicalComposer initialConfig={config}>
      <div
        id="focus-ring"
        className="transition-colors border border-border shadow-sm mx-1 my-3 p-2 rounded-lg bg-popover/50"
      >
        <div id="editor-container" className="editor-container rounded-md">
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
            {onChange && <OnChangePlugin onChange={onChange} />}
            <AutoLinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          </div>
          <div className="absolute right-1.5 bottom-1.5 gap-2 flex">
            <SubmitButtonPlugin
              onSubmit={onSubmit}
              label={
                <>
                  <Send className="mr-2 text-xs" /> Send
                </>
              }
            />
          </div>
          <BottomToolbarPLugin />
        </div>
      </div>
    </LexicalComposer>
  );
}
