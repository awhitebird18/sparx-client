import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { ChatDots, ChevronRight, EmojiLaughing } from 'react-bootstrap-icons';

import { useStore } from '@/stores/RootStore';

import MessageDisplay from '@/features/messageInput/MessageDisplay';
import OptionsPanel from './OptionsPanel';
import MessageEditor from '@/features/messageInput/MessageEditor';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import ReactionsDisplay from '@/features/reactions/components/ReactionsDisplay';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { Button } from '@/components/ui/Button';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';

import { Message } from '../types';
import OnlineStatusIndicator from '@/features/users/components/OnlineStatusIndicator';

const Message = ({
  message,
  showUser,
  disabled,
  isThread,
}: {
  message: Message;
  showUser: boolean;
  disabled?: boolean;
  setThread?: (message: Message | null) => void;
  isThread?: boolean;
}) => {
  const { fetchThreadMessagesApi, addReactionApi } = useStore('messageStore');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { setActiveModal } = useStore('modalStore');
  const { findUserByUuid } = useStore('userStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emojiButtonRef = useRef<any>(null);

  const handleViewUserProfile = () => {
    setActiveModal({ type: 'ProfileModal', payload: { userId: message.userId } });
  };

  const user = findUserByUuid(message.userId);

  if (!user) return;

  const handleShowEmojiPicker = () => {
    if (emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();

      setShowEmojiPicker({ top: rect.top - 435, left: rect.left - 315 });
    }
  };

  const handleReplyToMessage = (message: Message) => {
    fetchThreadMessagesApi(message);
  };

  const handleEditMessage = () => {
    setIsEditing(true);
  };

  const handleDeleteMessage = () => {
    setActiveModal({ type: 'DeleteMessageModal', payload: { message } });
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(null);
  };

  const handleAddReaction = async (emojiId: string) => {
    await addReactionApi({
      emojiId,
      userId: message.userId,
      messageId: message.uuid,
    });
    handleCloseEmojiPicker();
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger disabled={disabled}>
          <div
            className={`message ${showEmojiPicker ? 'hovered' : ''} rounded-lg ${
              !disabled ? 'hover:bg-hover hover:dark:hover' : ''
            } relative`}
          >
            <div className="flex gap-3 p-1.5 h-min">
              {showUser ? (
                <HoverCard>
                  <HoverCardTrigger>
                    <UserAvatar
                      size={38}
                      userId={message.userId}
                      profileImage={user.profileImage}
                    />
                  </HoverCardTrigger>

                  <HoverCardContent align="start" side="top" className="w-fit">
                    <div className="flex flex-col gap-4 w-64 p-2">
                      <div className="flex gap-3">
                        <UserAvatar
                          size={80}
                          userId={message.userId}
                          profileImage={user.profileImage}
                        />
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-1">
                            <Username firstName={user.firstName} lastName={user.lastName} />
                            <OnlineStatusIndicator userId={user.uuid} />
                          </div>
                          <p className="text-muted">Software Developer</p>
                        </div>
                      </div>
                      <Button className="w-full" onClick={handleViewUserProfile}>
                        View Profile
                      </Button>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <div className="w-11" />
              )}

              <div className={`flex flex-col ${showUser ? 'h-fit' : 'h-fit'} w-full`}>
                {showUser ? (
                  <div className="flex gap-3 items-center h-5">
                    <h2 className="font-semibold dark:text-gray-100 h-5 leading-4">
                      <Username firstName={user.firstName} lastName={user.lastName} />
                    </h2>
                    <p className="text-xs text-neutral mb-1">
                      {dayjs(message.createdAt).format('h:mm a')}
                    </p>
                  </div>
                ) : null}

                {isEditing ? (
                  <MessageEditor message={message} setIsEditing={setIsEditing} />
                ) : (
                  <MessageDisplay content={message.content} id={message.uuid} />
                )}

                {!showUser ? (
                  <span className="timestamp absolute top-0.5 left-5 text-xs leading-6 text-muted-foreground w-12">
                    {dayjs(message.createdAt).format('h:mm')}
                  </span>
                ) : null}

                <ReactionsDisplay message={message} />

                {message.threadCount && !isThread ? (
                  <Button
                    className="p-0 justify-between px-2 h-7 w-28"
                    size="sm"
                    variant="link"
                    onClick={() => handleReplyToMessage(message)}
                  >
                    <span className="text-userMedium">{`${message.threadCount} replies`}</span>
                    <ChevronRight />
                  </Button>
                ) : null}
              </div>
              {!disabled && !isEditing ? (
                <OptionsPanel message={message} setIsEditing={setIsEditing} isThread={isThread} />
              ) : null}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuItem
              className="gap-3 py-2 px-4"
              onClick={handleShowEmojiPicker}
              ref={emojiButtonRef}
            >
              <EmojiLaughing /> Add Reaction
            </ContextMenuItem>
            <ContextMenuItem
              className="gap-3 py-2 px-4"
              onClick={() => handleReplyToMessage(message)}
            >
              <ChatDots />
              Reply in thread
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem className="py-2 px-4" onClick={handleEditMessage}>
              Edit Message
            </ContextMenuItem>
            <ContextMenuItem className="text-rose-500 py-2 px-4" onClick={handleDeleteMessage}>
              Delete Message
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>

      {showEmojiPicker && (
        <EmojiPicker
          onEmojiClick={handleAddReaction}
          position={showEmojiPicker}
          onClickAway={handleCloseEmojiPicker}
        />
      )}
    </>
  );
};

export default observer(Message);
