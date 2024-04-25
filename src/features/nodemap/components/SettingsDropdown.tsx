import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Switch } from '@/components/ui/Switch';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { ChatLeftDots, People, Stack } from 'react-bootstrap-icons';

type Props = { children: ReactNode };

const SettingsDropdown = observer(({ children }: Props) => {
  const { nodemapSettings, updateNodemapSettingsApi } = useStore('nodemapStore');

  const handleChangeFilter = async (field: string, value: boolean) => {
    if (!nodemapSettings.uuid) return;
    await updateNodemapSettingsApi(nodemapSettings.uuid, { [field]: value });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left" className="space-y-2">
        <DropdownMenuLabel className="text-muted">Nodemap settings</DropdownMenuLabel>
        <div className="h-9 text-sm px-2 flex items-center justify-between gap-4 dark:bg-transparent dark:hover:bg-transparent">
          <div className="flex gap-4 items-center">
            <People /> Show usercount
          </div>

          <Switch
            id="userCountVisible"
            checked={nodemapSettings.userCountVisible}
            onCheckedChange={(value: boolean) => handleChangeFilter('userCountVisible', value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="h-9 text-sm px-2 flex items-center justify-between gap-4 dark:bg-transparent dark:hover:bg-transparent">
          <div className="flex gap-4 items-center">
            <Stack /> Show flashcards due
          </div>

          <Switch
            id="flashcardsDueVisible"
            checked={nodemapSettings.flashcardsDueVisible}
            onCheckedChange={(value: boolean) => handleChangeFilter('flashcardsDueVisible', value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="h-9 text-sm px-2 flex items-center justify-between gap-4 dark:bg-transparent dark:hover:bg-transparent">
          <div className="flex gap-4 items-center">
            <ChatLeftDots /> Show unread messages
          </div>

          <Switch
            id="unreadMessageCountVisible"
            checked={nodemapSettings.unreadMessageCountVisible}
            onCheckedChange={(value: boolean) =>
              handleChangeFilter('unreadMessageCountVisible', value)
            }
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default SettingsDropdown;
