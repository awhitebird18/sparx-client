import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, X } from 'react-bootstrap-icons';

const SearchInput = ({
  value,
  setValue,
  placeholder,
  onFocus,
  dark,
}: {
  value: string | undefined;
  setValue: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  dark?: boolean;
}) => {
  const handleClearSearch = () => {
    setValue('');
  };

  return (
    <div className={`relative flex items-center h-9 rounded-md w-full`}>
      <Input
        placeholder={placeholder}
        className={`pl-10 h-9`}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={onFocus}
      />

      <div className="absolute left-3.5 top-auto text-base text-neutral">
        <Search />
      </div>
      {value ? (
        <Button
          className={`h-6 w-6 absolute right-2 top-auto text-base rounded-full p-0 ${
            dark ? 'bg-neutral-800 text-white' : ''
          }`}
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
