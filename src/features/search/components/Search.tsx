import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full p-8">
      <div className="flex items-start pt-4 gap-6">
        {/* <Button className="card rounded-xl pointer-events-none opacity-70 h-18 w-18 bg-card border border-primary p-2 text-primary shadow-lg">
            <Pencil size={50} />
          </Button> */}
        {/* <div className="flex flex-col gap-1.5">
          <h2 className="text-main text-3xl font-medium">Search</h2>
          <p className="text-secondary">See all of your notes for workspace and make changes</p>
        </div> */}
      </div>
      {/* Main */}
      <div className="h-full w-full flex justify-center">
        <div className="flex flex-col gap-5 max-w-sm h-full pt-12 items-center mt-0">
          <div className="flex flex-col gap-1.5 items-center pt-8 prose">
            <h3 className="text-center text-main">Coming Soon.</h3>
            <p className="text-center text-secondary">
              Search to be implemented in a future release.
            </p>
          </div>
          <Button
            className="gap-4 px-3 py-2 w-fit h-9 rounded-lg border border-primary-lighter"
            onClick={handleClickBack}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Search;
