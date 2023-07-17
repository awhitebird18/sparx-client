import { Button } from '@/components/ui/Button';
import { Search as SearchIcon } from 'react-bootstrap-icons';

const Search = () => {
  const onClick = () => {
    console.info('open search component');
  };
  return (
    <Button
      className="w-full border border-border rounded-md px-3 h-8 justify-start flex-grow-3 max-w-xl overflow-hidden relative text-muted-foreground"
      variant="ghost"
      onClick={onClick}
    >
      <span className="text-ellipsis overflow-hidden whitespace-nowrap pl-6">
        Search Chat Application
      </span>

      <SearchIcon className="absolute top-auto mt-0.5 left-3" />
    </Button>
  );
};

export default Search;
