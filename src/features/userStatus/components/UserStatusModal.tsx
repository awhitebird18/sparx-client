import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { X } from 'react-bootstrap-icons';
import { Input } from '@/components/ui/Input';
import '@/features/userStatus/styles/userStatusModal.css';
import { useStore } from '@/stores/RootStore';
import { StatusDuration } from '../enums';
import { UserStatus } from '../types/userStatus';
import Modal from '@/layout/modal/Modal';
import { Button } from '@/components/ui/Button';
import Emoji from '@/components/ui/Emoji';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';

const UserStatusModal = observer(() => {
  const {
    createUserStatusApi,
    userStatuses,
    activeUserStatus,
    updateUserStatusApi,
    findUserStatusByUuid,
  } = useStore('userStatusStore');
  const { closeModal } = useStore('modalStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  const [currentUserStatus, setCurrentUserStatus] = useState<UserStatus | undefined>(
    activeUserStatus,
  );
  const emojiButtonRef = useRef<HTMLDivElement>(null);

  const handleShowEmojiPicker = () => {
    if (emojiButtonRef.current) {
      setShowEmojiPicker({ top: 142, left: 40 });
    }
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const handleSubmit = async () => {
    if (!currentUserStatus?.text || !currentUserStatus?.emoji) return;

    if (!currentUserStatus.uuid || !findUserStatusByUuid(currentUserStatus.uuid)) {
      await createUserStatusApi({
        text: currentUserStatus.text,
        emoji: currentUserStatus.emoji,
        duration: StatusDuration.TODAY,
        dateExpire: new Date(),
      });
    } else {
      await updateUserStatusApi(currentUserStatus.uuid, {
        text: currentUserStatus.text,
        emoji: currentUserStatus.emoji,
        duration: StatusDuration.TODAY,
        dateExpire: new Date(),
        isActive: true,
      });
    }

    closeModal();
  };

  const handleClickPreviousStatus = (userStatus: UserStatus) => {
    setCurrentUserStatus(userStatus);
  };

  const handleSetCurrentStatusInactive = async (uuid: string) => {
    if (!currentUserStatus) {
      return;
    }
    await updateUserStatusApi(uuid, { isActive: false });
    setCurrentUserStatus(undefined);
  };

  const handleAddReaction = (emojiId: string) => {
    handleCloseEmojiPicker();

    setCurrentUserStatus((prev: UserStatus | undefined) => {
      if (!prev) return;
      return { ...prev, emoji: emojiId };
    });
  };

  return (
    <Modal title={activeUserStatus ? 'Current status' : 'Set a status'}>
      <div className="flex flex-col w-96 space-y-8 ">
        <div
          className={`relative flex items-center w-full ${
            activeUserStatus && 'pointer-events-none'
          }`}
        >
          <div className="absolute left-0 top-0" ref={emojiButtonRef}>
            <Button
              size="icon"
              variant="ghost"
              className="p-0 w-12 h-12 relative"
              onClick={handleShowEmojiPicker}
            >
              {currentUserStatus ? (
                <Emoji id={currentUserStatus.emoji} size={24} />
              ) : (
                <Emoji id="smile" size={24} />
              )}
            </Button>
          </div>

          <Input
            placeholder="What's your status?"
            className="pl-14 h-12 border-border"
            onChange={(e) =>
              setCurrentUserStatus((prev: UserStatus | undefined) => {
                if (!prev) return undefined;
                return {
                  ...prev,
                  text: e.target.value,
                };
              })
            }
            value={currentUserStatus ? currentUserStatus.text : ''}
          />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={handleAddReaction}
              onClickAway={handleCloseEmojiPicker}
              position={showEmojiPicker}
            />
          )}
          {currentUserStatus?.text && !activeUserStatus ? (
            <Button
              size="icon"
              variant="ghost"
              className="w-8 h-8 absolute right-2 top-2 rounded-full"
              onClick={() => {
                setCurrentUserStatus(undefined);
              }}
            >
              <X size={20} />
            </Button>
          ) : null}
        </div>
        {!currentUserStatus && userStatuses.length ? (
          <div className="p-1 space-y-1 max-h-80 overflow-auto">
            <p className="">Recent</p>
            <div className="w-full">
              {userStatuses.map((u: UserStatus) => (
                <li
                  className="flex gap-2 p-2 w-full text-left justify-start hover:bg-hover rounded-sm cursor-pointer"
                  onClick={() => handleClickPreviousStatus(u)}
                >
                  <Emoji id={u.emoji} />
                  <p className="flex-1">{u.text}</p>
                  <Button
                    className="close-icon p-0.5 h-6 w-6"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      if (currentUserStatus) setCurrentUserStatus(undefined);
                    }}
                  >
                    <X size={20} />
                  </Button>
                </li>
              ))}
            </div>
          </div>
        ) : null}
        <div className="flex ml-auto gap-3 mt-10">
          {currentUserStatus?.isActive ? (
            <Button
              className="ml-auto w-32"
              onClick={() => handleSetCurrentStatusInactive(currentUserStatus.uuid)}
            >
              Clear Status
            </Button>
          ) : (
            <>
              <Button type="button" className="ml-auto w-32" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="ml-auto w-32" onClick={handleSubmit} disabled={!currentUserStatus}>
                Set Status
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
});

export default UserStatusModal;
