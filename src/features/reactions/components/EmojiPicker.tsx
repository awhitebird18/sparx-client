import Picker from '@emoji-mart/react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/RootStore';

type Props = {
  onClickAway: () => void;
  position: { top: number; left: number };
  onEmojiClick: (id: string) => void;
};

const EmojiPicker = observer(({ onClickAway, position, onEmojiClick }: Props) => {
  const { theme } = useStore('userPreferencesStore');

  return (
    <>
      <div className="flex fixed z-30" style={position}>
        <Picker
          onEmojiSelect={(emojiObj: any) => {
            onEmojiClick(emojiObj.id);
          }}
          set="apple"
          theme={theme}
          emojiButtonRadius="5px"
          emojiButtonColors={['rgba(67, 56, 202,0.5)']}
        />
      </div>

      <div
        id="hohoho"
        className="fixed top-0 left-0 w-screen h-screen z-20"
        onClick={onClickAway}
      />
    </>
  );
});

export default EmojiPicker;
