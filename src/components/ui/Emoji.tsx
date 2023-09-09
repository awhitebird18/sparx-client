import { createElement } from 'react';

type EmojiProps = {
  id: string;
  size?: number;
};

const Emoji = ({ id, size = 18 }: EmojiProps) =>
  createElement('em-emoji', {
    id,
    set: 'apple',
    style: { fontSize: size, lineHeight: '1.1rem' },
  });

export default Emoji;
