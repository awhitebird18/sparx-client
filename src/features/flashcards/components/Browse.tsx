import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CardHeading, CaretDownFill, ChevronLeft, Plus, Search } from 'react-bootstrap-icons';
// import { Column } from 'react-table';
import { useStore } from '@/stores/RootStore';
import { Flashcard } from '../types/card';
import Table from '@/components/ui/Table';
import dayjs from 'dayjs';

import { observer } from 'mobx-react-lite';
import { Checkbox } from '@/components/ui/Checkbox';
import UserAvatar from '@/features/users/components/UserAvatar';
import { useNavigate } from 'react-router-dom';

// type FlashcardColumn = Column<Flashcard>;

const Browse: React.FC = () => {
  const { fetchFlashcard, getChannelCards } = useStore('flashcardStore');
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { findUserByUuid } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleAddFlashcard = () => {
    setActiveModal({ type: 'AddFlashcardModal', payload: null });
  };

  useEffect(() => {
    if (!currentChannelId) return;
    const fn = async () => {
      const cards = await getChannelCards(currentChannelId);

      const convertedCardContent = cards.map((card: any) => ({
        ...card,
        content: extractTextFromLexicalState(card.content),
      }));

      setCards(convertedCardContent);
    };

    fn();
  }, [currentChannelId, getChannelCards]);

  const columns: any[] = React.useMemo(
    () => [
      {
        Header: 'Card Field',
        accessor: 'content',
        Cell: ({ value }: { value: string }) => {
          return <p className="whitespace-nowrap overflow-hidden text-ellipsis">{value}</p>;
        },
      },
      {
        Header: 'Created By',
        accessor: 'userId',
        Cell: ({ value }: { value: string }) => {
          const user = findUserByUuid(value);

          return (
            <div className="flex items-center gap-2 text-muted">
              {user ? (
                <>
                  <UserAvatar size={26} profileImage={user?.profileImage} userId={user.uuid} />
                  {value && `${user?.firstName} ${user?.lastName}`}
                </>
              ) : (
                <> Deleted user</>
              )}
            </div>
          );
        },
      },
      {
        Header: 'Created On',
        accessor: 'createdAt',
        Cell: ({ value }: { value: Date }) => <span>{dayjs(value).format('MMM D YYYY')}</span>,
      },
      {
        Header: 'Next Review Date',
        accessor: 'nextReviewDate',
        Cell: ({ value }: { value: Date }) => <span>{dayjs(value).format('MMM D YYYY')}</span>,
      },
      {
        Header: 'Reviews',
        accessor: 'repetitions',
      },
      {
        Header: 'Private',
        accessor: 'private',
        Cell: () => <Checkbox checked />,
      },
    ],
    [],
  );

  const handleClickFlashcard = (row: Flashcard) => {
    fetchFlashcard(row.uuid);
  };

  const handleClickBack = () => {
    navigate(-1);
  };

  const filteredCards = cards.filter((card: any) => card.content.includes(searchValue));

  return (
    <div className="flex-1 flex flex-col h-full prose p-8 relative">
      <div className="flex flex-col gap-8">
        <div className="flex items-start pt-4 gap-6">
          {/* <Button className="card rounded-xl pointer-events-none opacity-70 h-18 w-18 bg-card border border-primary p-2 text-primary shadow-lg">
          <Pencil size={50} />
        </Button> */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2 items-center">
              <Button className="w-fit gap-2 h-8" size="sm" onClick={handleClickBack}>
                <ChevronLeft size={13} /> Go Back
              </Button>
              <h2 className="text-main text-3xl font-medium">Browse Flashcards</h2>
            </div>
            <p className="text-secondary">See all of your notes for workspace and make changes</p>
          </div>
        </div>
        {cards.length ? (
          <div className="rounded-xl flex flex-col items-center text-main gap-4">
            <div className="flex justify-between items-center w-full py-0">
              {/* <p className="">{`${filteredNotes.length} results`}</p> */}
              <div className="flex gap-3 items-center">
                <div className="h-10 border-border rounded-lg border overflow-hidden flex items-center gap-0 px-3 text-secondary ml-auto bg-background">
                  <Search className="thick-icon" />
                  <Input
                    placeholder="Search"
                    className="max-w-sm w-full ml-auto border-none text-main"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Button variant="secondary" className="flex gap-3 w-fit items-center" size="sm">
                  Tags
                  <CaretDownFill size={11} className="mt-0.5 text-secondary" />
                </Button>
                <Button variant="secondary" className="flex gap-3 w-fit items-center" size="sm">
                  Review Count
                  <CaretDownFill size={11} className="mt-0.5 text-secondary" />
                </Button>
              </div>
              <Button className="gap-2 ml-auto" onClick={handleAddFlashcard}>
                <CardHeading size={18} /> Add Flashcard
              </Button>
            </div>

            <Table
              columns={columns}
              data={filteredCards}
              onRowClick={(row: any) => handleClickFlashcard(row.uuid)}
            />
          </div>
        ) : (
          <EmptyFallback channelName={currentChannel?.name} onCreateNote={handleAddFlashcard} />
        )}
      </div>
    </div>
  );
};

export default observer(Browse);

function extractTextFromLexicalState(lexicalState: string) {
  try {
    const parsedState = JSON.parse(lexicalState);
    const root = parsedState.root;
    if (root && root.children && root.children.length > 0) {
      for (const child of root.children) {
        if (child.children && child.children.length > 0) {
          for (const subChild of child.children) {
            if (subChild.type === 'text') {
              return subChild.text || '';
            }
          }
        }
      }
    }
    return ''; // Return empty string if no text is found
  } catch (error) {
    console.error('Error parsing Lexical state:', error);
    return '';
  }
}

const EmptyFallback = ({
  channelName,
  onCreateNote,
}: {
  channelName?: string;
  onCreateNote: () => void;
}) => (
  <div className="flex flex-col gap-5 max-w-sm h-full pt-12 items-center prose">
    {/* <div className="gap-2 flex flex-col items-center text-main ">
  </div> */}

    <div className="flex flex-col gap-2 items-center">
      <h3 className="text-center text-main text-xl">No Flashcards Found.</h3>
      <p className="text-center text-secondary">{`All of your ${channelName} flashcards will appear here.`}</p>
    </div>

    <Button size="sm" className=" items-center gap-1" onClick={onCreateNote}>
      <Plus size={18} className="thick-icon" />
      Create a new flashcard
    </Button>
  </div>
);
