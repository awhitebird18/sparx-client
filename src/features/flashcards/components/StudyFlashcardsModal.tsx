import { Button } from '@/components/ui/Button';
import DisplayEditor from '@/features/textEditor/DisplayEditor';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ChevronLeft, EmojiSmile } from 'react-bootstrap-icons';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';
import { PerformanceRating } from '../enums/performanceRating';

type ReviewData = {
  uuid: string;
  peroformnanceRating: PerformanceRating;
};

const getNextInterval = (currentInterval: any, easeFactor: any, rating: any) => {
  let newInterval;
  switch (rating) {
    case 'again':
      newInterval = 1; // Reset interval if the card was forgotten
      break;
    case 'hard':
      newInterval = Math.max(currentInterval * (easeFactor - 0.2), 1);
      break;
    case 'good':
      newInterval = currentInterval * easeFactor;
      break;
    case 'easy':
      newInterval = currentInterval * (easeFactor + 0.1);
      break;
    default:
      throw new Error('Invalid rating');
  }
  return Math.ceil(newInterval);
};

const formatReviewInterval = (interval: number) => {
  // Adjust the logic here if you want to show "minutes" for small intervals
  if (interval === 1) {
    return '1 day';
  } else {
    return `${interval} days`;
  }
};

const calculateCurrentInterval = (nextReviewDate: any) => {
  const today: any = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours to start of day
  const reviewDate: any = new Date(nextReviewDate);
  const diffTime = Math.abs(reviewDate - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// const formatDate = (date: any) => {
//   return date.toISOString().split('T')[0];
// };

// function getNextReviewDate(interval: number, easeFactor: number, rating: string) {
//   let newInterval;
//   let newEaseFactor = easeFactor;

//   switch (rating) {
//     case 'easy':
//       newInterval = Math.round(interval * (easeFactor + 0.1));
//       break;
//     case 'good':
//       newInterval = Math.round(interval * easeFactor);
//       break;
//     case 'hard':
//       newInterval = Math.round(interval * Math.max(easeFactor - 0.2, 1.3));
//       newEaseFactor = Math.max(easeFactor - 0.2, 1.3);
//       break;
//     case 'again':
//       newInterval = 1;
//       break;
//     default:
//       newInterval = interval;
//   }

//   const nextReviewDate = new Date();
//   nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

//   return {
//     nextReviewDate: nextReviewDate.toISOString().split('T')[0],
//     newInterval,
//     newEaseFactor,
//   };
// }

const StudyFlashcardsModal = () => {
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

  const handlePerformanceRating = async (rating: PerformanceRating, currentCard: any) => {
    const newReview = {
      uuid: currentCard.uuid, // Assuming your card has a uuid field
      performanceRating: rating,
    };

    // Add the new review to the reviewData array
    setReviewData((reviewData: any[]) => [...reviewData, newReview]);

    // Check if this is the last card
    if (currentCardIndex === flashcards.length - 1) {
      setIsEnd(true);
      await submitReviewsApi([...reviewData, newReview]);
    } else {
      handleClickNext(); // Move to the next card
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

  const currentCard: any = flashcards[currentCardIndex];
  if (!currentCard) return null;

  const currentInterval = calculateCurrentInterval(currentCard.nextReviewDate);
  const easeFactor = currentCard.easeFactor;

  const againInterval = formatReviewInterval(getNextInterval(currentInterval, easeFactor, 'again'));
  // const hardInterval = formatReviewInterval(getNextInterval(currentInterval, easeFactor, 'hard'));
  // const goodInterval = formatReviewInterval(getNextInterval(currentInterval, easeFactor, 'good'));
  const easyInterval = formatReviewInterval(getNextInterval(currentInterval, easeFactor, 'easy'));

  // Calculate the next review date based on the performance rating
  // const displayNextReviewDate = (performanceRating: string) => {
  //   const { newInterval } = getNextReviewDate(
  //     currentInterval,
  //     currentCard.easeFactor,
  //     performanceRating,
  //   );
  //   const nextDate = new Date();
  //   nextDate.setDate(nextDate.getDate() + newInterval);
  //   return nextDate.toISOString().split('T')[0];
  // };

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={`fixed w-screen h-screen top-0 left-0 bg-background gap-6 pt-2 flex justify-center items-center flip-card ${
        isFlipped ? 'flipped' : ''
      }`}
      id="card"
    >
      {isEnd ? (
        <div className="celebration-screen">
          <Confetti />
          <div className="message space-y-10">
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
          <Button
            className="absolute top-8 left-8 gap-2"
            variant="outline"
            size="lg"
            onClick={handleClickBack}
          >
            <ChevronLeft className="thick-icon mt-0.5" size={12} />
            Go Back
          </Button>
          <div className="card flex flex-col items-center w-1/2 h-[32rem] flip-card-inner rounded-2xl bg-card border border-border shadow-lg">
            <div className="text-xl text-center flex flex-col items-center prose">
              <h2
                className={`flex w-min items-center m-0 h-16 mt-2 text-main ${
                  !isFront ? 'rotate-back' : ''
                }`}
              >{`${isFront ? 'Question' : 'Answer'}`}</h2>
            </div>
            {isFront ? (
              <div className="flip-card-front h-full overflow-hidden pt-16 p-8 flex flex-col items-center">
                {currentCard?.front?.map((field: string, index: number) => (
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
                {currentCard?.back?.map((fieldValue: string, index: number) => (
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
};

export default observer(StudyFlashcardsModal);
