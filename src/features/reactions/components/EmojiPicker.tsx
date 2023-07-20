import { useTheme } from '@/providers/theme';
import Picker from '@emoji-mart/react';
import { addMessageReactionApi } from '../api/addReaction';
import { Message } from '@/features/messages';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

type EmojiPickerProps = {
  message: Message;
  onClickAway: () => void;
  position: { top: number; left: number };
};

const EmojiPicker = ({ message, onClickAway, position }: EmojiPickerProps) => {
  const { updateMessage } = useStore('messageStore');
  const { theme } = useTheme();

  const handleAddReaction = async (emojiId: string) => {
    const updatedMessage = await addMessageReactionApi({
      emojiId,
      userId: message.userId,
      messageId: message.uuid,
    });

    updateMessage(message.uuid, { reactions: updatedMessage.reactions });
  };

  return (
    <>
      <div className="flex fixed z-30" style={position}>
        <Picker
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onEmojiSelect={(emojiObj: any) => handleAddReaction(emojiObj.id)}
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

export default observer(EmojiPicker);
