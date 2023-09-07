import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, X } from 'react-bootstrap-icons';

const SearchInput = ({
  value,
  setValue,
  placeholder,
  onFocus,
}: {
  value: string | undefined;
  setValue: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
}) => {
  const handleClearSearch = () => {
    setValue('');
  };

  return (
    <div className="relative flex items-center w-full">
      <Input
        placeholder={placeholder}
        className="pl-11 h-full bg-background border-border"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={onFocus}
      />
      <Search className="absolute left-3.5 top-auto text-base text-muted-foreground" />
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
