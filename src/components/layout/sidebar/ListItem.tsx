import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';

interface ListitemProps {
  id: string;
  src?: string | JSX.Element;
  title: string;
}

const ListItem = ({ id, src, title }: ListitemProps) => {
  const onClick = () => {
    console.log(id);
  };
  return (
    <Link to={id}>
      <div
        onClick={onClick}
        className="h-8 mx-1 w-100 flex items-center gap-2 px-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden"
      >
        <div className="w-6 h-6 rounded-sm">
          {typeof src === 'string' ? (
            <Avatar className="w-100 h-100">
              {<AvatarImage src={src} />}
              <AvatarFallback
                children={title.substring(0, 2).toUpperCase()}
                className="w-100 h-100 "
              />
            </Avatar>
          ) : (
            <div className="flex justify-center items-center w-6 h-6">{src}</div>
          )}
        </div>

        <div className="font-semibold">{title}</div>
      </div>
    </Link>
  );
};

export default ListItem;
