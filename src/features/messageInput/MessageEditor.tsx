import { useStore } from '@/stores/RootStore';
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

type Props = {
  message: Message;
  setIsEditing: (bool: boolean) => void;
};

export default function MessageEditor({ message, setIsEditing }: Props) {
  const { updateMessageApi } = useStore('messageStore');

  const handleSubmit = async (messageContent: string) => {
    await updateMessageApi(message.uuid, { content: messageContent });
    setIsEditing(false);
  };

  return (
    <LexicalComposer initialConfig={{ ...editorConfig, editorState: message.content }}>
      <div
        id="focus-ring"
        className="transition-colors editor-container border border-border rounded-md bg-card dark:bg-background"
      >
        <div id="editor-container" className="mx-1 my-3 p-2 rounded-lg">
          <TopToolbarPlugin />
          <div className="editor-inner">
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
            <SubmitButtonPlugin onSubmit={handleSubmit} label="Update" />
          </div>
        </div>
      </div>
    </LexicalComposer>
  );
}
