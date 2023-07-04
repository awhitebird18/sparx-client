// src/components/MessageInput.tsx

import React, { useState, KeyboardEvent } from 'react';
import { useStore } from '@/stores/stores';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/providers/auth';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

const Editor: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage } = useStore('messageStore');
  const { currentChannel } = useStore('channelStore');
  const { currentUser } = useAuth();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && message.trim() !== '') {
      // Here you can replace "userId" with the actual user id and "timezone" with actual user timezone
      addMessage({
        uuid: uuid(), // you should replace this with a real uuid in production code
        userId: currentUser.uuid,
        content: message,
        createdAt: dayjs(),
        timezone: 'America/New_York', // replace with the user's actual timezone
      });
      setMessage('');
    }
  };

  return (
    <Input
      type="text"
      value={message}
      multiple
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={`${currentChannel?.name}...`}
      className="w-full border rounded-lg focus:outline-none"
    />
  );
};

export default Editor;
