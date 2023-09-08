import Picker from '@emoji-mart/react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/stores/RootStore';
import { createPortal } from 'react-dom';

type EmojiPickerProps = {
  onClickAway: () => void;
  position: { top: number; left: number };
  onEmojiClick: (id: string) => void;
};

const EmojiPicker = ({ onClickAway, position, onEmojiClick }: EmojiPickerProps) => {
  const { theme } = useStore('userPreferencesStore');

  return (
    <>
      <div className="flex fixed z-30" style={position}>
        <Picker
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onEmojiSelect={(emojiObj: any) => {
            console.log('derpeeee');
            onEmojiClick(emojiObj.id);
          }}
          set="apple"
          theme={theme}
          emojiButtonRadius="5px"
          emojiButtonColors={['rgba(67, 56, 202,0.5)']}
        />
      </div>

      {createPortal(
        <div
          id="hohoho"
          className="fixed top-0 left-0 w-screen h-screen z-20"
          onClick={() => {
            onClickAway();
            console.log('derp');
          }}
        />,
        document.body,
      )}
    </>
  );
};

export default observer(EmojiPicker);
