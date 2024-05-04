import { LexicalComposer } from '@lexical/react/LexicalComposer';
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
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import SubmitButtonPlugin from './plugins/SubmitButtonPlugin';
import CancelButtonPlugin from './plugins/CancelButtonPlugin';
import { editorConfig } from '@/features/messageInput/configs/editorConfig';
import { Message } from '@/features/messages/types';
import { Send } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';

type Props = {
  message: Message;
  setIsEditing: (messageId?: string) => void;
};

export default function MessageEditor({ message, setIsEditing }: Props) {
  const { updateMessageApi } = useStore('messageStore');

  const handleSubmit = async (messageContent: string) => {
    await updateMessageApi(message.uuid, { content: messageContent });
    setIsEditing(undefined);
  };

  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: message.content }}>
      <div
        id="focus-ring"
        className="transition-colors border border-border shadow-sm mt-2 pb-2 rounded-md relative"
      >
        <div id="editor-container">
          <TopToolbarPlugin />
          <div className="editor-inner mb-6">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<></>}
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
          <div className="absolute right-1.5 bottom-1.5 gap-2 flex">
            <CancelButtonPlugin setIsEditing={setIsEditing} />
            <SubmitButtonPlugin
              onSubmit={handleSubmit}
              label={<Send size={10} className="mt-0.5" />}
            />
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
