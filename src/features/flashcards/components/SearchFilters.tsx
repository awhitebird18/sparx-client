import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Search, CaretDownFill } from 'react-bootstrap-icons';

const SearchFilters = observer(() => {
  const { setBrowseSearchValue, browseSearchValue } = useStore('flashcardStore');

  return (
    <div className="flex gap-3 items-center">
      <div className="h-9 border-border rounded-lg border overflow-hidden flex items-center gap-0 px-3 text-secondary ml-auto bg-card">
        <Search className="thick-icon" />
        <Input
          placeholder="Search"
          className="max-w-sm w-full ml-auto border-none text-main"
          value={browseSearchValue}
          onChange={(e) => setBrowseSearchValue(e.target.value)}
        />
      </div>
      <Button
        variant="secondary"
        className="flex gap-3 w-fit items-center h-9 rounded-lg"
        size="sm"
      >
        Tags
        <CaretDownFill size={11} className="mt-0.5 text-secondary" />
      </Button>
      <Button
        variant="secondary"
        className="flex gap-3 w-fit items-center h-9 rounded-lg"
        size="sm"
      >
        Review Count
        <CaretDownFill size={11} className="mt-0.5 text-secondary" />
      </Button>
    </div>
  );
});

export default SearchFilters;
