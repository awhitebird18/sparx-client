import { useState } from 'react';
import { Clock } from 'react-bootstrap-icons';

import { Button } from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (val: string) => {
    setSearchValue(val);
  };

  return (
    <div className="w-full max-w-xl relative">
      <SearchInput value={searchValue} setValue={handleSearch} placeholder="Search" />

      {searchValue ? (
        <div className="w-full max-h-72 border border-border rounded-md absolute top-11 left-0 bg-background z-10 p-3 space-y-3">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-muted-foreground">Recent Searchs</div>
            {['Channel name 1', 'Channel name 2'].map((name: string) => (
              <Button className="w-full justify-start flex gap-2" variant="ghost">
                <Clock />
                {name}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
