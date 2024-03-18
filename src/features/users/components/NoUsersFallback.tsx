const NoUsersFallback = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-3 max-w-sm h-full pt-12 items-center">
        <div className="flex flex-col items-center gap-6">
          <span className="font-semibold text-xl text-main">{`No users found.`}</span>
        </div>
        <span className="text-secondary">You may want to try adjusting your filters.</span>
      </div>
    </div>
  );
};

export default NoUsersFallback;
