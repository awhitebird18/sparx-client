import SearchInput from '@/components/ui/SearchInput';
import { Alarm, ChevronDoubleRight, PlayCircle, StarFill } from 'react-bootstrap-icons';
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

const UserFilters = () => {
  const { setSearchValue, searchValue, setCompletionFilter, setPrivilegesFilter } =
    useStore('userStore');

  return (
    <div className="flex gap-2 items-center">
      <Select onValueChange={setCompletionFilter}>
        <SelectTrigger className="w-32 h-8 rounded-lg text-muted">
          <SelectValue placeholder="Completion" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">
            <div className="flex gap-3 items-center">
              <ChevronDoubleRight /> All statuses
            </div>
          </SelectItem>
          <SelectItem value={CompletionStatus.Skip}>
            <div className="flex gap-3 items-center">
              <ChevronDoubleRight /> Skip
            </div>
          </SelectItem>
          <SelectItem value={CompletionStatus.InProgress}>
            <div className="flex gap-3 items-center">
              <PlayCircle /> In progress
            </div>
          </SelectItem>
          <SelectItem value={CompletionStatus.OnHold}>
            <div className="flex gap-3 items-center">
              <Alarm /> On hold
            </div>
          </SelectItem>
          <SelectItem value={CompletionStatus.Complete}>
            <div className="flex gap-3 items-center">
              <StarFill className="text-yellow-400" />
              Complete
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setPrivilegesFilter}>
        <SelectTrigger className="w-28 h-8 rounded-lg text-muted">
          <SelectValue placeholder="Privileges" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={Privileges.ALL}>All users</SelectItem>
          <SelectItem value={Privileges.ADMIN}>Admin</SelectItem>
          <SelectItem value={Privileges.MEMBER}>Member</SelectItem>
        </SelectContent>
      </Select>
      <div className="w-40">
        <SearchInput placeholder="Search users" value={searchValue} setValue={setSearchValue} />
      </div>
    </div>
  );
};

export default UserFilters;
