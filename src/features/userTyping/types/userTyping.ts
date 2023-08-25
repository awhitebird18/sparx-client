export interface UserTyping {
  userId: string;
  username: string;
  timerId?: NodeJS.Timeout;
}
