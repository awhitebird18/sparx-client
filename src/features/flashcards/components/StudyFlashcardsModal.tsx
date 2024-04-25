import { Button } from '@/components/ui/Button';
import DisplayEditor from '@/features/textEditor/DisplayEditor';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { EmojiSmile } from 'react-bootstrap-icons';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { PerformanceRating } from '../enums/performanceRating';
import { calculateCurrentInterval } from '../utils/calculateCurrentInterval';
import { formatReviewInterval } from '../utils/formatReviewInterval';
import { getNextInterval } from '../utils/getNextInterval';
import { ReviewData } from '../types/reviewData';
import { Flashcard } from '../types/card';

const StudyFlashcardsModal = observer(() => {
  const { fetchFlashcardsApi, flashcards, submitReviewsApi } = useStore('flashcardStore');
  const { currentChannelId } = useStore('channelStore');
  const [isFront, setIsFront] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);

  useEffect(() => {
    if (currentChannelId) {
      fetchFlashcardsApi(currentChannelId);
    }
  }, [fetchFlashcardsApi, currentChannelId]);

  const handleClickNext = () => {
    setCurrentCardIndex((prev) => {
      if (prev < flashcards.length - 1) {
        prev++;
      }

      return prev;
    });

    if (currentCardIndex === flashcards.length - 1) {
      setIsEnd(true);
    }
    setIsFront(true);
    setIsFlipped(false);
  };

  const handlePerformanceRating = async (rating: PerformanceRating, currentCard: Flashcard) => {
    const newReview = {
      uuid: currentCard.uuid,
      performanceRating: rating,
    };

    setReviewData((reviewData) => [...reviewData, newReview]);

    if (currentCardIndex === flashcards.length - 1) {
      setIsEnd(true);
      await submitReviewsApi([...reviewData, newReview]);
    } else {
      handleClickNext();
    }
  };

  const toggleFlip = () => {
    setIsFront((prev) => !prev);
    setIsFlipped(!isFlipped);
  };

  const handleClickComplete = () => {
    navigate('/app/flashcards');
  };

  const cardsLeft = flashcards.length - reviewData.length - 1;

  const currentCard = flashcards[currentCardIndex];
  if (!currentCard) return null;

  const currentInterval = calculateCurrentInterval(currentCard.nextReviewDate);
  const easeFactor = +currentCard.easeFactor;

  const againInterval = formatReviewInterval(
    getNextInterval(currentInterval, easeFactor, PerformanceRating.AGAIN),
  );
  const easyInterval = formatReviewInterval(
    getNextInterval(currentInterval, easeFactor, PerformanceRating.EASY),
  );

  return (
    <div
      className={`gap-6 flex justify-center h-full relative pt-20 flip-card ${
        isFlipped ? 'flipped' : ''
      }`}
      id="card"
    >
      {isEnd ? (
        <div className="flex justify-center">
          <Confetti className="top-0" />
          <div className="message space-y-16 h-fit mt-32 flex flex-col items-center">
            <h1 className="text-5xl">
              Congratulations, you studied {flashcards.length} card
              {flashcards.length > 1 ? 's' : ''}!
            </h1>
            <Button
              className="celebration-btn text-2xl font-semibold py-8 px-12 rounded-full"
              size="lg"
              onClick={handleClickComplete}
            >
              Go back
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="card flex flex-col items-center w-3/4 h-[32rem] flip-card-inner rounded-2xl bg-hover border border-border shadow-lg">
            <div className="text-xl text-center flex flex-col items-center prose">
              <h2
                className={`flex w-min items-center m-0 h-16 mt-2 text-main ${
                  !isFront ? 'rotate-back' : ''
                }`}
              >{`${isFront ? 'Question' : 'Answer'}`}</h2>
            </div>
            {isFront ? (
              <div className="flip-card-front h-full overflow-hidden pt-16 p-8 flex flex-col items-center">
                {currentCard?.frontValues?.map((field: string, index: number) => (
                  <DisplayEditor key={index} content={field} />
                ))}

                <div className="space-y-4">
                  <p className="leading-none m-0 text-muted">{`${cardsLeft} card${
                    cardsLeft > 1 ? 's' : ''
                  } left`}</p>
                  <Button onClick={toggleFlip}>Show answer</Button>
                </div>
              </div>
            ) : (
              <div className="flip-card-back flex flex-col items-center h-full overflow-hidden pt-16 p-8">
                {currentCard?.backValues?.map((fieldValue: string, index: number) => (
                  <DisplayEditor key={index} content={fieldValue} />
                ))}
                <div className="flex justify-between gap-10 w-min">
                  <Button
                    className="text-2xl flex flex-col items-center h-fit p-5 w-28 rounded-xl bg-card shadow"
                    variant="outline"
                    onClick={() => handlePerformanceRating(PerformanceRating.AGAIN, currentCard)}
                  >
                    <EmojiSmile size={22} />
                    Again
                    <span className="text-sm text-muted">{`< ${againInterval}`}</span>
                  </Button>
                  <Button
                    className="text-2xl flex flex-col items-center h-fit p-5 w-28 rounded-xl bg-card shadow"
                    variant="outline"
                    onClick={() => handlePerformanceRating(PerformanceRating.HARD, currentCard)}
                  >
                    <EmojiSmile size={22} /> Hard
                    <span className="text-sm text-muted">{`< ${againInterval}`}</span>
                  </Button>
                  <Button
                    className="text-2xl flex flex-col items-center h-fit p-5 w-28 rounded-xl bg-card shadow"
                    variant="outline"
                    onClick={() => handlePerformanceRating(PerformanceRating.GOOD, currentCard)}
                  >
                    <EmojiSmile size={22} /> Good
                    <span className="text-sm text-muted">{againInterval}</span>
                  </Button>
                  <Button
                    className="text-2xl flex flex-col items-center h-fit p-5 w-28 rounded-xl bg-card shadow"
                    variant="outline"
                    onClick={() => handlePerformanceRating(PerformanceRating.EASY, currentCard)}
                  >
                    <EmojiSmile size={22} /> Easy
                    <span className="text-sm text-muted">{easyInterval}</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
});

export default StudyFlashcardsModal;
