import SearchInput from '@/components/ui/SearchInput';
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/Select';
import { CompletionStatus } from '@/features/channels/enums/completionStatus';
import { Privileges } from '../enums/privileges';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const UserFilters = observer(() => {
  const {
    setSearchValue,
    searchValue,
    setCompletionFilter,
    completionFilter,
    setPrivilegesFilter,
    privilegesFilter,
  } = useStore('userStore');

  return (
    <div className="flex gap-2 items-center">
      <Select onValueChange={setCompletionFilter} value={completionFilter}>
        <SelectTrigger className="w-32 h-8 rounded-lg">
          <SelectValue placeholder="Completion" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All statuses</SelectItem>
          <SelectItem value={CompletionStatus.Skip}>Skip</SelectItem>
          <SelectItem value={CompletionStatus.InProgress}>In progress</SelectItem>
          <SelectItem value={CompletionStatus.OnHold}>On hold</SelectItem>
          <SelectItem value={CompletionStatus.Complete}>Complete</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setPrivilegesFilter} value={privilegesFilter}>
        <SelectTrigger className="w-28 h-8 rounded-lg">
          <SelectValue placeholder="Privileges" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All users</SelectItem>
          <SelectItem value={Privileges.ADMIN}>Admin</SelectItem>
          <SelectItem value={Privileges.MEMBER}>Member</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-40">
        <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />
      </div>
    </div>
  );
});

export default UserFilters;
