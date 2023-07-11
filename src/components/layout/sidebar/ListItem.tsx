interface ListitemProps {
  title: string;
  icon?: JSX.Element;
  onClick?: () => void;
  primary?: boolean;
}

const ListItem = ({ title, icon, onClick, primary }: ListitemProps) => {
  return (
    <div
      onClick={onClick}
      className={`h-8  w-100 flex items-center ${
        !primary && 'text-muted-foreground'
      } gap-2 px-2 hover:bg-hover cursor-pointer rounded-sm overflow-hidden dark:hover:bg-accent hover:bg-accent`}
    >
      <div className="w-6 h-6 rounded-sm flex justify-center items-center">{icon}</div>

      <div className="font-semibold ">{title}</div>
    </div>
  );
};

export default ListItem;
