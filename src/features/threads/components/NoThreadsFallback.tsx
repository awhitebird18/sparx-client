import { ChatSquareDots } from 'react-bootstrap-icons';

const NoThreadsFallback = () => {
  return (
    <div className="relative w-full flex flex-col justify-center items-center h-full">
      <ChatSquareDots size={500} className="text-muted opacity-5 absolute" />
      <p className="text-4xl font-bold mb-4">No Threads Found</p>
      <p className="text-xl font-bold mb-4">
        Any message threads you're a part of will appear here.
      </p>
      <p className="text-muted mb-6">
        If you're expecting threads, you may want to try adjusting your filters or check back later.
      </p>
    </div>
  );
};

export default NoThreadsFallback;
