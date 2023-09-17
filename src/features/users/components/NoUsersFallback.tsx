import { Person } from 'react-bootstrap-icons';

const NoUsersFallback = () => {
  return (
    <div className="relative w-full flex flex-col justify-center items-center h-full">
      <Person size={550} className="text-muted opacity-5 absolute mb-28" />
      <p className="text-4xl font-bold mb-4">No Users Found</p>
      <p className="text-muted mb-36">You may want to try adjusting your filters.</p>
    </div>
  );
};

export default NoUsersFallback;
