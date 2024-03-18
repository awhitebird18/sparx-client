import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $INTERNAL_isPointSelection,
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  TextFormatType,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createCodeNode } from '@lexical/code';

export const Toolbar = () => {
  const [editor] = useLexicalComposerContext();
  const { setActiveModal } = useStore('modalStore');

  const handleOnClick = (formatType: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, formatType);
  };

  const handleUploadImage = () => {
    setActiveModal({
      type: 'InsertImageModal',
      payload: { activeEditor: editor, onClose: () => setActiveModal(null) },
    });
  };

  const handleFormatCode = () => {
    editor.update(() => {
      let selection = $getSelection();

      if (selection && $INTERNAL_isPointSelection(selection)) {
        if (selection.isCollapsed()) {
          $setBlocksType(selection, () => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);
          selection = $getSelection();
          if ($isRangeSelection(selection)) selection.insertRawText(textContent);
        }
      }
    });
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <span style={{ fontWeight: 'bold' }}>Text actions</span>
      <div className="flex gap-2">
        {['Bold', 'Italic', 'Underline', 'Code', 'Highlight', 'Strikethrough'].map((value) => {
          return (
            <Button
              key={value}
              onClick={() => handleOnClick(value.toLowerCase() as TextFormatType)}
              variant="outline"
            >
              {value[0]}
            </Button>
          );
        })}
        <Button key="imageUpload" onClick={handleUploadImage} variant="outline">
          Upload image
        </Button>
        <Button key="codeBlock" onClick={handleFormatCode} variant="outline">
          Code Block
        </Button>
      </div>
    </div>
  );
};
