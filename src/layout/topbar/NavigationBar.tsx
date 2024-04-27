import UserDropdown from './UserDropdown';
import { Button } from '@/components/ui/Button';
import { X } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { observer } from 'mobx-react-lite';
import TooltippedButton from './TooltippedButton';
import navItems from './navItems';

const NavigationBar = observer(() => {
  const { sidePanelComponent, closeSidePanelComponent } = useStore('sidePanelStore');

  return (
    <div
      className={`card-base top-2 right-2 p-1 ${
        sidePanelComponent ? 'w-1/3 4xl:w-1/4' : 'w-fit'
      }  absolute z-30 overflow-hidden justify-end items-center gap-2 flex p-1 px-1.5`}
    >
      {/* Close icon */}
      {sidePanelComponent ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="h-10 w-10 p-0 mr-auto"
              size="icon"
              onClick={closeSidePanelComponent}
            >
              <X size={24} />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={10}>Close</TooltipContent>
        </Tooltip>
      ) : null}

      {navItems.map((navItem) => (
        <TooltippedButton
          type={navItem.type}
          tooltipText={navItem.tooltip}
          icon={sidePanelComponent?.type === navItem.type ? navItem.iconFilled : navItem.icon}
        />
      ))}

      <UserDropdown />
    </div>
  );
});

export default NavigationBar;
