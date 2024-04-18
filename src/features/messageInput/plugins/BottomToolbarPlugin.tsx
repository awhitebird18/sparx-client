import { useRef } from 'react';
import { At, EmojiSmile, Plus, Type } from 'react-bootstrap-icons';

import { Button } from '@/components/ui/Button';

const BottomToolbarPLugin = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hiddenFileInput = useRef<any>(null);

  const handleClickFileUpload = () => {
    if (!hiddenFileInput.current) return;

    hiddenFileInput.current.click();
  };

  const buttonClasses = 'p-0 toolbar-item text-muted-foreground w-9 h-9';
  return (
    <div className="toolbar mt-8">
      {/* <>
        <Button
          className={buttonClasses}
          onClick={handleClickFileUpload}
          aria-label="Upload file"
          variant="secondary"
          size="icon"
          disabled
        >
          <Plus className="text-xl" />
        </Button>
        <input type="file" ref={hiddenFileInput} style={{ display: 'none' }} />
      </>

      <Button
        className={buttonClasses}
        aria-label="Toggle top richtext toolbar"
        variant="ghost"
        size="icon"
        disabled
      >
        <Type className="text-xl" />
      </Button>
      <Button
        className={buttonClasses}
        aria-label="Show Emoji"
        variant="ghost"
        size="icon"
        disabled
      >
        <EmojiSmile className="text-base" />
      </Button>
      <Button
        className={buttonClasses}
        aria-label="Show Emoji"
        variant="ghost"
        size="icon"
        disabled
      >
        <At className="text-xl" />
      </Button> */}
    </div>
  );
};

export default BottomToolbarPLugin;
