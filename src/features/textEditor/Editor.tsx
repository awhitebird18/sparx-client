import { useState } from 'react';
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import Nodes from './nodes/Nodes';
import editorTheme from './theme/theme';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin';
import AutoLinkPlugin from './plugins/AutolinkPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import ComponentPickerMenuPlugin from './plugins/ComponentPickerPlugin';
import ContextMenuPlugin from './plugins/ContextMenuPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import DragDropPastePlugin from './plugins/DragDropPastPlugin';
import DraggableBlockPlugin from './plugins/DraggableBlockPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import ImagePlugin from './plugins/ImagePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MentionsPlugin from './plugins/MentionsPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import YouTubePlugin from './plugins/YoutubePlugin';
import OnChangePlugin from './plugins/OnChangePlugin';
import OnBlurPlugin from './plugins/OnBlurPlugin';

type Props = {
  content: string | undefined;
  onChange?: (state: string) => void;
  onBlur?: (state: string) => void;
};

const Editor = ({ content, onChange, onBlur }: Props) => {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const lexicalConfig: InitialConfigType = {
    namespace: 'My Rich Text Editor',
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
              <div className="editor relative flex flex-col h-full" ref={onRef}>
                <ContentEditable className="p-4 px-8 rounded-lg overflow-hidden outline-none h-full flex-1" />
              </div>
            </div>
          }
          placeholder={<div className="Placeholder__root">Press "/" for commands...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />

        <AutoFocusPlugin />
        <AutoLinkPlugin />
        <AutoEmbedPlugin />
        <CodeHighlightPlugin />
        <ContextMenuPlugin />
        <ComponentPickerMenuPlugin />
        <DragDropPastePlugin />
        <HistoryPlugin />
        <ImagePlugin />
        <OnBlurPlugin onBlur={onBlur} />
        <ListPlugin />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <MentionsPlugin />
        <OnChangePlugin onChange={onChange} />
        <TabIndentationPlugin />
        <TabFocusPlugin />
        <YouTubePlugin />
        <FloatingTextFormatToolbarPlugin />
        {floatingAnchorElem && <DraggableBlockPlugin anchorElem={floatingAnchorElem} />}
      </div>
    </LexicalComposer>
  );
};

export default Editor;
