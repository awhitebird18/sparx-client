import { ChatSquareDots } from 'react-bootstrap-icons';

const NoThreadsFallback = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16 ">
      <ChatSquareDots size={96} className="mb-2" />
      <p className="text-xl font-bold mb-4">No Threads Found</p>
      <p className="text-sm mb-4">Any message threads you're a part of will appear here.</p>
      <p className="text-sm mb-6">
        If you're expecting threads, you may want to try adjusting your filters or check back later.
      </p>
    </div>
  );
};

export default NoThreadsFallback;
