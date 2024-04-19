type OverviewCardProps = { className?: string; cardCount: number };

const OverviewCard = ({ className, cardCount }: OverviewCardProps) => {
  return (
    <div
      className={`flex items-center justify-center h-full min-h-[30rem] p-6 ${className} rounded-xl bg-hover shadow card`}
    >
      <div className="flex flex-col items-center">
        <h2 className="text-5xl leading-8 text-center font-black bg-gradient-to-b from-indigo-600 to-fuchsia-500 bg-clip-text text-transparent">
          {`Studied ${cardCount} cards`}
          <span className="leading-normal block">today</span>
        </h2>
      </div>
    </div>
  );
};

export default OverviewCard;
