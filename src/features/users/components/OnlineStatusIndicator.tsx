import { UserStatus } from '../types/enums';

const OnlineStatusIndicator = ({ status }: { status: UserStatus }) => {
  let color = 'bg-slate-500';

  switch (status) {
    case 'online':
      color = 'bg-green-500';
      break;
    case 'offline':
      color = 'bg-slate-500';
      break;
    case 'away':
      color = 'bg-transparent';
      break;
    default:
      color = 'bg-transparent';
      break;
  }

  return <div className={`rounded-full ${color} w-2 h-2`} />;
};

export default OnlineStatusIndicator;
