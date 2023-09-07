import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { EmojiSmile, X } from 'react-bootstrap-icons';

import { Input } from '@/components/ui/Input';

import '@/features/userStatus/styles/userStatusModal.css';
import { useStore } from '@/stores/RootStore';
import { StatusDuration } from '../enums';
import { UserStatus } from '../types/userStatus';

import Modal from '@/components/modal/Modal';
import { Button } from '@/components/ui/Button';

const UserStatusModal = () => {
  const {
    removeUserStatusApi,
    createUserStatusApi,
    userStatuses,
    activeUserStatus,
    updateUserStatusApi,
    findUserStatusByUuid,
  } = useStore('userStatusStore');
  const { setActiveModal } = useStore('modalStore');
  // const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
  //   null,
  // );
  const [currentUserStatus, setCurrentUserStatus] = useState<UserStatus | undefined>(
    activeUserStatus,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emojiButtonRef = useRef<any>(null);

  const handleRemoveUserStatus = async (userStatusUuid: string) => {
    await removeUserStatusApi(userStatusUuid);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // const handleShowEmojiPicker = () => {
  //   if (emojiButtonRef.current) {
  //     const rect = emojiButtonRef.current.getBoundingClientRect();

  //     setShowEmojiPicker({ top: rect.top - 435, left: rect.left - 315 });
  //   }
  // };

  // const handleCloseEmojiPicker = () => {
  //   setShowEmojiPicker(null);
  // };

  const handleSubmit = async () => {
    if (!currentUserStatus?.text) return;

    if (!currentUserStatus.uuid || !findUserStatusByUuid(currentUserStatus.uuid)) {
      await createUserStatusApi({
        text: currentUserStatus.text,
        emoji: 'banana',
        duration: StatusDuration.TODAY,
        dateExpire: new Date(),
      });
    } else {
      await updateUserStatusApi(currentUserStatus.uuid, {
        text: currentUserStatus.text,
        emoji: 'banana',
        duration: StatusDuration.TODAY,
        dateExpire: new Date(),
        isActive: true,
      });
    }

    handleCloseModal();
  };

  const handleClickPreviousStatus = (userStatus: UserStatus) => {
    setCurrentUserStatus(userStatus);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClearCurrentUserStatus = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentUserStatus(undefined);
  };

  const handleSetCurrentStatusInactive = async (uuid: string) => {
    await updateUserStatusApi(uuid, { isActive: false });
    setCurrentUserStatus(undefined);
  };

  return (
    <Modal title="Set a status">
      <div className="flex flex-col w-96 space-y-8">
        <div className="relative flex items-center w-full">
          <div className="absolute left-0 top-0">
            <Button
              ref={emojiButtonRef}
              size="icon"
              variant="ghost"
              className="p-0 w-12 h-12 relative"
              // onClick={handleShowEmojiPicker}
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
          <Input
            placeholder="What's your status?"
            className="pl-14 h-12 bg-card border-border"
            onChange={(e) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              setCurrentUserStatus((prev: any) => ({
                ...prev,
                text: e.target.value,
              }))
            }
            value={currentUserStatus?.text}
          />
          {currentUserStatus ? (
            <Button
              ref={emojiButtonRef}
              size="icon"
              variant="ghost"
              className="w-8 h-8 absolute right-2 top-2 rounded-full"
              onClick={handleClearCurrentUserStatus}
            >
              <X />
            </Button>
          ) : null}
        </div>
        {!currentUserStatus ? (
          <div className="p-1 space-y-1">
            <p className="">Recent</p>
            <div className="w-full">
              {userStatuses.map((u: UserStatus) => (
                <li
                  className="flex gap-2 p-2 w-full text-left justify-start hover:bg-secondary rounded-sm cursor-pointer"
                  onClick={() => handleClickPreviousStatus(u)}
                >
                  {/* <em-emoji
                    id={u.emoji}
                    set="apple"
                    style={{ fontSize: '1.3rem', lineHeight: '1.1rem' }}
                  ></em-emoji> */}
                  <p className="flex-1">{u.text}</p>
                  <Button
                    className="close-icon p-0.5 h-6 w-6"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveUserStatus(u.uuid)}
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
              className="ml-auto w-28"
              onClick={() => handleSetCurrentStatusInactive(currentUserStatus.uuid)}
            >
              Clear Status
            </Button>
          ) : (
            <>
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
              <Button className="ml-auto w-28" onClick={handleSubmit} disabled={!currentUserStatus}>
                Submit
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default observer(UserStatusModal);
