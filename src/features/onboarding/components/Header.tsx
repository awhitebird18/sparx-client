type Props = {
  title: string;
  description?: string;
};

const Header = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col items-center gap-1 prose dark:prose-invert">
      <h2 className="font-medium">{title}</h2>
      <p className="text-center text-secondary">{description}</p>
    </div>
  );
};

export default Header;
