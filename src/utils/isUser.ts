// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUser(user: any) {
  return user.uuid && user.email && user.firstName && user.lastName;
}
