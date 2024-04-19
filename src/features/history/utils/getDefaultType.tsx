import { At, Pencil, Person, Tv } from 'react-bootstrap-icons';

export const getDefaultType = (id: string) => {
  switch (id) {
    case 'users':
      return { title: 'Users', icon: <Person size={18} /> };
    case 'channels':
      return { title: 'Channels', icon: <Tv size={18} /> };

    case 'mentions':
      return { title: 'Mentions', icon: <At size={18} /> };

    case 'drafts':
      return { title: 'Drafts', icon: <Pencil size={18} /> };

    default:
      return undefined;
  }
};
