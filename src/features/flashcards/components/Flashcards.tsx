import { Tabs, TabsContent } from '@/components/ui/Tabs';
import Overview from './Overview';
import Browse from './Browse';
import Stats from './Stats';
import Templates from './Templates';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useStore } from '@/stores/RootStore';
import Spinner from '@/components/ui/Spinner';

const Flashcards = () => {
  const { isLoading } = useStore('flashcardStore');

  if (isLoading)
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <Tabs defaultValue="study" className="flex flex-col w-full h-full relative ">
      <div className="w-full h-full overflow-auto flex flex-col p-8">
        <TabsContent value="study">
          <Overview />
        </TabsContent>
        <TabsContent value="template">
          <DndProvider backend={HTML5Backend}>
            <Templates />
          </DndProvider>
        </TabsContent>

        <Browse />

        <Stats />
      </div>
    </Tabs>
  );
};

export default Flashcards;
