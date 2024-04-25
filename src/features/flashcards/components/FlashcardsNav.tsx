import { MainPanelComponent } from '@/layout/mainPanel/componentList';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { navOptions } from '../utils/flashcardNavigationOptions';

const FlashcardsNav = observer(() => {
  const { getCardCountDueForChannel, setIsLoading, getFlashcardsDueToday } =
    useStore('flashcardStore');
  const { currentChannelId } = useStore('channelStore');
  const { setMainPanel } = useStore('mainPanelStore');
  const { currentWorkspaceId } = useStore('workspaceStore');

  const handleOpenMainPanel = (mainPanelComponent: MainPanelComponent) => {
    setMainPanel({ type: mainPanelComponent });
  };

  useEffect(() => {
    if (!currentChannelId || !currentWorkspaceId) return;
    const fn = async () => {
      setIsLoading(true);
      await getCardCountDueForChannel(currentChannelId);
      await getFlashcardsDueToday(currentWorkspaceId);
      setIsLoading(false);
    };

    fn();
  }, [
    currentChannelId,
    getCardCountDueForChannel,
    setIsLoading,
    currentWorkspaceId,
    getFlashcardsDueToday,
  ]);

  return (
    <div className="w-full overflow-auto flex flex-col gap-5 prose dark:prose-invert">
      <h3>Quick links</h3>
      {navOptions.map((option) => {
        const Icon = option.icon;

        return (
          <Button
            variant="ghost"
            className="card flex items-center justify-between card p-2 flex-1 w-full h-min"
            onClick={() => handleOpenMainPanel(option.id)}
          >
            <div className="flex gap-3 items-center text-left prose dark:prose-invert text-main">
              {<Icon />}
              <p className="text-main leading-none !m-0">{option.title}</p>
            </div>
          </Button>
        );
      })}
    </div>
  );
});

export default FlashcardsNav;
