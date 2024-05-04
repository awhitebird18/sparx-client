export const Card = ({
  icon,
  title,
  color,
  description,
  className,
  onClick,
}: {
  title: string;
  color: string;
  description: string;
  icon: JSX.Element;
  className: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`card-base hover:bg-hover flex-col items-start h-full text-left p-6 px-10 ${className} break-words cursor-pointer`}
      onClick={onClick}
    >
      <div>{icon}</div>
      <h4 className={`${color} text-xl font-bold mt-4 mb-2 w-full`}>{title}</h4>
      <p className="text-left">{description}</p>
    </div>
  );
};
