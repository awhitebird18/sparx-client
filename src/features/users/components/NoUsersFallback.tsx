const NoUsersFallback = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16">
      <p className="text-xl font-bold mb-4">No results</p>
      <p className="text-sm mb-10">You may want to try adjusting your filters. </p>
    </div>
  );
};

export default NoUsersFallback;
