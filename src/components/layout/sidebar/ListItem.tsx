import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';

interface ListitemProps {
  uuid: string;
  src?: string | JSX.Element;
  title: string;
}

const ListItem = ({ uuid, src, title }: ListitemProps) => {
  const onClick = () => {
    console.log(uuid);
  };
  return (
    <Link to={uuid}>
      <div
        onClick={onClick}
        className="h-8 mx-1 w-100 flex items-center gap-2 px-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden dark:hover:bg-accent hover:bg-accent"
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

        <div className="font-semibold text-muted-foreground">{title}</div>
      </div>
    </Link>
  );
};

export default ListItem;
