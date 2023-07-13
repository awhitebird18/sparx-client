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
    console.info('changing space');
  };

  const addSpace = () => {
    console.info('adding a new space');
  };

  return (
    <div className="border-r border-border flex flex-col items-center p-2 h-full">
      {spaces.map((space) => (
        <Tooltip key={space.uuid}>
          <TooltipTrigger>
            <Avatar
              className="w-10 mb-2 h-10 cursor-pointer hover:bg-accent dark:hover:bg-accent relative border border-border "
              onClick={onClick}
            >
              <AvatarImage src={space.image} />

              <p className="absolute leading-9 justify-center items-center w-full h-full hover:bg-opacity-60 hover:bg-slate-800">
                {space.name.substring(0, 2).toLowerCase()}
              </p>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent side="right" align="start">
            {space.name}
          </TooltipContent>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipTrigger>
          <Avatar
            className="w-10 mb-1 h-10 cursor-pointer flex justify-center items-center"
            onClick={addSpace}
          >
            <AvatarFallback
              children={<span className="leading-8">+</span>}
              className="w-10 h-10 rounded-md dark:bg-transparent border border-border dark:hover:bg-accent hover:bg-accent"
            />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="right" align="start">
          Add a new space
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default observer(Spacesbar);
