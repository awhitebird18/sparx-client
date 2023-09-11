import { Person } from 'react-bootstrap-icons';

const NoUsersFallback = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-16 ">
      <Person size={96} className="mb-2" />
      <p className="text-xl font-bold mb-4">No Users Found</p>
      <p className="text-sm mb-4">You may want to try adjusting your filters.</p>
    </div>
  );
};

export default NoUsersFallback;
