export interface UserTyping {
  userId: string;
  username: string;
  channelId: string;
  timerId?: NodeJS.Timeout;
}
