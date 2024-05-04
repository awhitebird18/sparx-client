import { Button } from '@/components/ui/Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { Icon } from 'react-bootstrap-icons';
import { SidePanelComponent } from '../sidePanel/componentList';

type Props = {
  type: SidePanelComponent;
  icon: Icon | (({ size }: { size?: number }) => JSX.Element);
  tooltipText: string;
};

const TooltippedButton = observer(({ type, icon: IconComponent, tooltipText }: Props) => {
  const { toggleSidePanelComponent, sidePanelComponent } = useStore('sidePanelStore');

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={sidePanelComponent?.type === type ? 'outline-primary' : 'ghost'}
          className="h-10 w-10 p-1"
          size="icon"
          onClick={() => toggleSidePanelComponent({ type })}
        >
          {sidePanelComponent?.type === type ? (
            <IconComponent className="text-primary-light" />
          ) : (
            <IconComponent className="text-secondary" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>{tooltipText}</TooltipContent>
    </Tooltip>
  );
});

export default TooltippedButton;
