// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useStore } from '@/stores/RootStore';

import Modal from '@/components/modal/Modal';
import { Input } from '@/components/ui/Input';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { EmojiSmile } from 'react-bootstrap-icons';
import { UserStatus } from '../types/userStatus';
import { StatusDuration } from '../enums';
import { observer } from 'mobx-react-lite';

const UserStatusModal = () => {
  const { removeUserStatusApi, createUserStatusApi, userStatuses } = useStore('userStatusStore');
  const { setActiveModal } = useStore('modalStore');
  const [value, setValue] = useState<string>('');
  const [emoji, setEmoji] = useState('polar_bear');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emojiButtonRef = useRef<any>(null);

  const handleRemoveUserStatus = (userStatusUuid: string) => {
    removeUserStatusApi(userStatusUuid);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleShowEmojiPicker = () => {
    if (emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();

      setShowEmojiPicker({ top: rect.top - 435, left: rect.left - 315 });
    }
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const handleCreateUserStatus = async () => {
    await createUserStatusApi({
      text: value,
      emoji,
      duration: StatusDuration.TODAY,
      dateExpire: new Date(),
    });
  };

  console.log(handleCloseEmojiPicker, handleRemoveUserStatus, setEmoji, showEmojiPicker);

  return (
    <Modal title="Set a status">
      <div className="flex flex-col w-96 space-y-8">
        <div className="relative flex items-center w-full">
          <Input
            placeholder="What's your status?"
            className="pl-14 h-12 bg-card border-border"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <div className="absolute left-0 top-0">
            <Button
              ref={emojiButtonRef}
              size="icon"
              variant="ghost"
              className="p-0 w-12 h-12 relative"
              onClick={handleShowEmojiPicker}
            >
              <EmojiSmile size={16} />
            </Button>
            {/* {showEmojiPicker && (
              <EmojiPicker
                message={message}
                onClickAway={handleCloseEmojiPicker}
                position={showEmojiPicker}
              />
            )} */}
          </div>
        </div>
        <div className="p-1 space-y-1">
          <p className="">Recent</p>
          <div className="w-full">
            {userStatuses.map((u: UserStatus) => (
              <Button className="flex gap-2 p-2 w-full text-left justify-start" variant="ghost">
                <em-emoji
                  id={u.emoji}
                  set="apple"
                  style={{ fontSize: '1.3rem', lineHeight: '1.1rem' }}
                ></em-emoji>
                <p>{u.text}</p>
              </Button>
            ))}
          </div>
        </div>
        <div className="flex ml-auto gap-3 mt-10">
          <Button
            type="button"
            className="ml-auto w-28"
            variant="outline"
            onClick={() => {
              handleCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            className="ml-auto w-28 bg-userMedium hover:bg-userDark text-white"
            onClick={handleCreateUserStatus}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default observer(UserStatusModal);
