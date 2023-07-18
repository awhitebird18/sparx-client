import { useTheme } from '@/providers/theme';
import Picker from '@emoji-mart/react';

type EmojiPickerProps = {
  messageId: string;
  onClickAway: () => void;
  position: { top: number; left: number };
};

const EmojiPicker = ({ messageId, onClickAway, position }: EmojiPickerProps) => {
  const { theme } = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEmojiClick = (value: any) => {
    onClickAway();
    console.log(value);
  };

  return (
    <>
      <div className="flex fixed z-30" style={position}>
        <Picker
          onEmojiSelect={handleEmojiClick}
          set="apple"
          theme={theme}
          emojiButtonRadius="5px"
          emojiButtonColors={['rgba(67, 56, 202,0.5)']}
        />
      </div>

      <div className="fixed top-0 left-0 w-screen h-screen z-10" onClick={onClickAway} />
    </>
  );
};

export default EmojiPicker;
