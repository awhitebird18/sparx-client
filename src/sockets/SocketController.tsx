import useUserSocket from './useUserSocket';
import useChannelSocket from './useChannelSocket';
import useSectionSocket from './useSectionSocket';
import useMessageSocket from './useMessageSocket';
import useWorkspaceChannelSocket from './useWorkspaceChannelSocket';
import useChatroomSocket from './useChatroomSocket';
import { observer } from 'mobx-react-lite';
import useUserStatusSocket from './useUserStatusSocket';
import useChannelConnectorSocket from './useChannelConnectorSocket';

const SocketController = () => {
  useUserSocket();
  useChannelSocket();
  useSectionSocket();
  useMessageSocket();
  useWorkspaceChannelSocket();
  useChatroomSocket();
  useUserStatusSocket();
  useChannelConnectorSocket();

  return null;
};

export default observer(SocketController);
