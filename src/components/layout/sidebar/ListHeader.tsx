import { Link } from "react-router-dom";

interface ListHeaderProps {
  id: string;
  icon?: JSX.Element;
  title: string;
}

const ListHeader = ({ id, icon, title }: ListHeaderProps) => {
  const onClick = () => {
    console.log(id);
  };
  return (
    <Link to={id}>
      <div
        onClick={onClick}
        className="h-7 m-1 w-100 flex items-center gap-2 px-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden"
      >
        <div className="w-6 h-6 flex items-center justify-center">{icon}</div>
        <div className="font-semibold">{title}</div>
      </div>
    </Link>
  );
};

export default ListHeader;
