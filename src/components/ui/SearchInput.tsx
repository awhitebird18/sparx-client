import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useState } from 'react';
import { Search, X } from 'react-bootstrap-icons';

const SearchInput = ({
  value,
  setValue,
  placeholder,
  onFocus,
  dark,
  collapsible,
}: {
  value: string | undefined;
  setValue: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  dark?: boolean;
  collapsible?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(collapsible ? false : true);

  const handleClearSearch = () => {
    setValue('');

    if (collapsible) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={`relative flex items-center h-9 overflow-hidden ${
        collapsible && 'border border-border rounded-lg transition-all'
      } ${isOpen ? 'w-96' : 'w-12 cursor-pointer'}`}
    >
      {isOpen && (
        <Input
          placeholder={placeholder}
          className={`text-sm font-medium ${
            dark
              ? 'placeholder:text-neutral text-white bg-foreground border-foreground dark:focus-visible:ring-gray-500'
              : 'placeholder:text-neutral text-neutral'
          } pl-10 h-9 ${isOpen && 'border-0'}`}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          onFocus={onFocus}
        />
      )}
      <div
        className="absolute left-3.5 top-auto text-base text-neutral"
        onClick={() => setIsOpen((prev: boolean) => !prev)}
      >
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
