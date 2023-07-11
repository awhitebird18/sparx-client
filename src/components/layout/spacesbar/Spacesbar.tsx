import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const Spacesbar = () => {
  const { spaces, fetchSpaces } = useStore('spacesStore');

  useEffect(() => {
    fetchSpaces();
  }, [fetchSpaces]);

  const onClick = () => {
    console.log('changing space');
  };

  const addSpace = () => {
    console.log('adding a new space');
  };

  return (
    <div className="border-r border-border flex flex-col items-center p-2 h-full">
      {spaces.map((space) => (
        <Tooltip key={space.uuid}>
          <TooltipTrigger>
            <Avatar
              className="w-10 mb-2 h-10 cursor-pointer hover:bg-accent dark:hover:bg-accent"
              onClick={onClick}
            >
              <AvatarImage src={space.image} />
              <AvatarFallback
                children={space.name.substring(0, 2).toLowerCase()}
                className="w-10 h-10 rounded-md dark:bg-transparent border border-border dark:hover:bg-accent "
              />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{space.name}</TooltipContent>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipTrigger>
          <Avatar className="w-10 mb-1 h-10 cursor-pointer" onClick={addSpace}>
            <AvatarFallback
              children="+"
              className="w-10 h-10 rounded-md dark:bg-transparent border border-border dark:hover:bg-accent hover:bg-accent"
            />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Add a new space</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default observer(Spacesbar);
