import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search, X } from 'react-bootstrap-icons';

const SearchInput = ({
  value,
  setValue,
  placeholder,
  onFocus,
  disabled,
}: {
  value: string | undefined;
  setValue: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  dark?: boolean;
  disabled?: boolean;
}) => {
  const handleClearSearch = () => {
    setValue('');
  };

  return (
    <div className={`relative flex items-center h-8 rounded-lg w-full`}>
      <Input
        placeholder={placeholder}
        className={`pl-8 h-full rounded-lg`}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onFocus={onFocus}
        disabled={disabled}
      />

      <div className="absolute left-3 top-auto text-base text-secondary">
        <Search size={12} className="text-muted mt-0.5" />
      </div>
      {value ? (
        <Button
          className={`h-6 w-6 absolute right-1.5 top-auto text-base rounded-md p-0`}
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
