/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';

type Reaction = {
  reactionId: string;
  messageId: string;
};

type ReactionsDisplayProps = { messageId: string };

const ReactionsDisplay = ({ messageId }: ReactionsDisplayProps) => {
  const reactions =
    messageId === 'b7dc58ac-d8cc-4d43-ab98-195157af478e'
      ? [
          { emojiId: '+1', messageId: 'd' },
          { emojiId: 'heart_eyes', messageId: 'd' },
        ]
      : [];
  console.log(messageId);
  return (
    <div className="flex gap-1">
      {reactions.map((reaction: Reaction) => {
        return (
          <div className="flex items-center justify-center w-11 rounded-full border border-border pb-0.5 pl-0.5 gap-0.5">
            <em-emoji id={reaction.emojiId} set="twitter"></em-emoji>
            <span className="text-muted-foreground text-xs self-end">1</span>
          </div>
        );
      })}
    </div>
  );
};

export default ReactionsDisplay;
