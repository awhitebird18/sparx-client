import Header from './Header';
import FlashcardResults from './FlashcardResult';

const GenerateFlashcards = () => {
  return (
    <div className="flex flex-col gap-4 pr-2 prose dark:prose-invert">
      <Header />
      <FlashcardResults />
    </div>
  );
};

export default GenerateFlashcards;
