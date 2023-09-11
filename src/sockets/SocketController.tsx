import useUserSocket from './useUserSocket';
import useChannelSocket from './useChannelSocket';
import useSectionSocket from './useSectionSocket';
import useMessageSocket from './useMessageSocket';
import useWorkspaceChannelSocket from './useWorkspaceChannelSocket';
import useChatroomSocket from './useChatroomSocket';
import { observer } from 'mobx-react-lite';

const SocketController = () => {
  useUserSocket();
  useChannelSocket();
  useSectionSocket();
  useMessageSocket();
  useWorkspaceChannelSocket();
  useChatroomSocket();

  return null;
};

export default observer(SocketController);
