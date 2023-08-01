import { Message } from '..';
import MessageDisplay from '@/features/messageInput/MessageDisplay';
import OptionsPanel from './OptionsPanel';
import { useRef, useState } from 'react';
import MessageEditor from '@/features/messageInput/MessageEditor';
import UserAvatar from '@/features/users/components/UserAvatar';
import Username from '@/features/users/components/Username';
import ReactionsDisplay from '@/features/reactions/components/ReactionsDisplay';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard';
import { ChatDots, ChevronRight, EmojiLaughing } from 'react-bootstrap-icons';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/ContextMenu';
import EmojiPicker from '@/features/reactions/components/EmojiPicker';

const Message = ({
  message,
  showUser,
  disabled,
  setThread,
  isThread,
}: {
  message: Message;
  showUser: boolean;
  disabled?: boolean;
  setThread?: (message: Message | null) => void;
  isThread?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { setActiveModal } = useStore('modalStore');
  const { findUser } = useStore('userStore');
  const [showEmojiPicker, setShowEmojiPicker] = useState<{ top: number; left: number } | null>(
    null,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emojiButtonRef = useRef<any>(null);

  const handleViewUserProfile = () => {
    setActiveModal({ type: 'ProfileModal', payload: { userId: message.userId } });
  };

  const user = findUser(message.userId);

  if (!user) return;

  const handleShowEmojiPicker = () => {
    if (emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();

      setShowEmojiPicker({ top: rect.top - 435, left: rect.left - 315 });
    }
  };

  const handleReplyToMessage = () => {
    setThread?.(message);
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

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`message ${showEmojiPicker ? 'hovered' : ''} rounded-lg ${
              !disabled ? 'hover:bg-secondary hover:dark:bg-secondary' : ''
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
                      showStatus
                    />
                  </HoverCardTrigger>

                  <HoverCardContent align="start" side="top" className="p-4 flex gap-4">
                    <Button
                      variant="ghost"
                      onClick={handleViewUserProfile}
                      className="w-fit h-fit p-0"
                    >
                      <UserAvatar size={80} userId={message.userId} />
                    </Button>
                  </HoverCardContent>
                </HoverCard>
              ) : (
                <div className="w-11" />
              )}

              <div className={`flex flex-col space-y-1 ${showUser ? 'h-fit' : 'h-fit'} w-full`}>
                {showUser ? (
                  <div className="flex gap-2 items-center h-5">
                    <h2 className="font-semibold dark:text-gray-100 h-5 leading-4">
                      <Username firstName={user.firstName} lastName={user.lastName} />
                    </h2>
                    <p className="text-xs text-muted-foreground mb-2">
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
                {!isThread && message.childMessages?.length ? (
                  <Button
                    className="p-0 justify-between px-2 h-7 w-44 hover:border border-background"
                    size="sm"
                    variant="ghost"
                    onClick={() => setThread?.(message)}
                  >
                    <span className="text-blue-500">{`${message.childMessages.length} replies`}</span>
                    <ChevronRight />
                  </Button>
                ) : null}
              </div>
              {!disabled && !isEditing ? (
                <OptionsPanel
                  message={message}
                  setIsEditing={setIsEditing}
                  setThread={setThread}
                  isThread={isThread}
                />
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
            <ContextMenuItem className="gap-3 py-2 px-4" onClick={handleReplyToMessage}>
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
          message={message}
          onClickAway={handleCloseEmojiPicker}
          position={showEmojiPicker}
        />
      )}
    </>
  );
};

export default observer(Message);
