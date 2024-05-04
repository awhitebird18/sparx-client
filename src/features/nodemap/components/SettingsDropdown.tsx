import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Switch } from '@/components/ui/Switch';
import { observer } from 'mobx-react-lite';
import { ReactNode } from 'react';
import { ChatLeftDots, People, Stack } from 'react-bootstrap-icons';

type Props = { children: ReactNode };

const SettingsDropdown = observer(({ children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left" className="space-y-2">
        <DropdownMenuLabel className="text-muted">Nodemap settings</DropdownMenuLabel>

        <SettingsDropdownItem id="userCountVisible" icon={<People />} label="Show usercount" />
        <SettingsDropdownItem
          id="flashcardsDueVisible"
          icon={<Stack />}
          label="Show flashcards due"
        />
        <SettingsDropdownItem
          id="unreadMessageCountVisible"
          icon={<ChatLeftDots />}
          label="Show unread messages"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default SettingsDropdown;

type SettingsDropdownItemProps = {
  id: 'userCountVisible' | 'flashcardsDueVisible' | 'unreadMessageCountVisible';
  icon: ReactNode;
  label: string;
};

const SettingsDropdownItem = observer(({ icon, label, id }: SettingsDropdownItemProps) => {
  const handleChangeFilter = async (bool: boolean) => {
    const nodemapSettingsId = `${bool} todo`;
    if (!nodemapSettingsId) return;
  };

  return (
    <div className="h-9 text-sm px-2 flex items-center justify-between gap-4 dark:bg-transparent dark:hover:bg-transparent">
      <div className="flex gap-4 items-center">
        {icon} {label}
      </div>

      <Switch
        id={id}
        checked={true}
        onCheckedChange={(bool) => handleChangeFilter(bool)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
});
