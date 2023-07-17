import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, X } from 'react-bootstrap-icons';

const SearchInput = ({
  value,
  setValue,
  placeholder,
}: {
  value: string | undefined;
  setValue: (value: string) => void;
  placeholder?: string;
}) => {
  const handleClearSearch = () => {
    setValue('');
  };

  return (
    <div className="relative flex items-center">
      <Input
        placeholder={placeholder}
        className="pl-12"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Search className="absolute left-3.5 top-auto text-base" />
      {value ? (
        <Button
          className="h-6 w-6 absolute right-2 top-auto text-base rounded-full p-0"
          variant="secondary"
          onClick={handleClearSearch}
        >
          <X />
        </Button>
      ) : null}
    </div>
  );
};

export default SearchInput;
