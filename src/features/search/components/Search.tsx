import { Button } from '@/components/ui/Button';

const Search = () => {
  const onClick = () => {
    console.log('open search component');
  };
  return (
    <Button
      className="w-full border border-border rounded-md px-3 h-8 justify-start flex-grow-3 max-w-xl overflow-hidden"
      variant="ghost"
      onClick={onClick}
    >
      <span className="text-ellipsis overflow-hidden whitespace-nowrap">
        Search Chat Application
      </span>
    </Button>
  );
};

export default Search;
