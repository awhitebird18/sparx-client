import useUserSocket from './useUserSocket';
import useChannelSocket from './useChannelSocket';
import useSectionSocket from './useSectionSocket';
import useWorkspaceChannelSocket from './useWorkspaceChannelSocket';
import { observer } from 'mobx-react-lite';
import useUserStatusSocket from './useUserStatusSocket';

const SocketController = observer(() => {
  useUserSocket();
  useChannelSocket();
  useSectionSocket();
  useWorkspaceChannelSocket();
  useUserStatusSocket();

  return null;
});

export default SocketController;
