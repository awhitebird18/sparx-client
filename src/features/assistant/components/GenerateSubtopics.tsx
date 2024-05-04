import { observer } from 'mobx-react-lite';
import Header from './Header';
import SubtopicList from './SubtopicList';

const GenerateSubtopics = observer(() => {
  return (
    <div className="space-y-6 h-full overflow-auto pr-2">
      <Header />
      <SubtopicList />
    </div>
  );
});

export default GenerateSubtopics;
