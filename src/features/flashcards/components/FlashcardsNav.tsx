import { MainPanelComponent } from '@/layout/mainPanel/componentList';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { navOptions } from '../utils/flashcardNavigationOptions';
import SidePanelContainer from '@/layout/sidePanel/SidePanelContainer';
import HeaderContainer from '@/layout/sidePanel/HeaderContainer';
import SidePanelBody from '@/layout/sidePanel/SidePanelBody';

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
    <SidePanelContainer>
      <HeaderContainer title="Quick links" />

      <SidePanelBody className="grid gap-6 h-fit grid-cols-3">
        {navOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Button
              key={option.id}
              variant="ghost"
              className="card-base flex flex-col h-fit items-center justify-start gap-4 p-6 rounded-3xl prose dark:prose-invert"
              onClick={() => handleOpenMainPanel(option.id)}
            >
              <Icon size={28} className={option.color} />
              <h4>{option.title}</h4>
            </Button>
          );
        })}
      </SidePanelBody>
    </SidePanelContainer>
  );
});

export default FlashcardsNav;
