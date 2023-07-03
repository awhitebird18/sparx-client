import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';

const Spacesbar = () => {
  const spaces = [
    {
      id: 1,
      name: 'Research and Development',
      backgroundColor: '#3f51b5',
      image: '/',
    },
    { id: 2, name: 'Customer Service', backgroundColor: '#e91e63', image: '/' },
    { id: 3, name: 'Office', backgroundColor: '#673ab7', image: '/' },
  ];

  const onClick = () => {
    console.log('changing space');
  };

  const addSpace = () => {
    console.log('adding a new space');
  };

  return (
    <div className="border-r border-border flex flex-col items-center p-2 h-full">
      {spaces.map((space) => (
        <Tooltip>
          <TooltipTrigger>
            <Avatar className="w-10 mb-1 h-10 cursor-pointer" onClick={onClick}>
              {<AvatarImage src={space.image} />}
              <AvatarFallback
                children={space.name.substring(0, 2).toLowerCase()}
                className="w-10 h-10 rounded-md"
              />
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>{space.name}</TooltipContent>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipTrigger>
          <Avatar className="w-10 mb-1 h-10 cursor-pointer" onClick={addSpace}>
            <AvatarFallback children="+" className="w-10 h-10 rounded-md" />
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>Add a new space</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default Spacesbar;
