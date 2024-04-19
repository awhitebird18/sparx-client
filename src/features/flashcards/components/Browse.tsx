import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CaretDownFill, Search } from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { Flashcard } from '../types/card';
import Table from '@/components/ui/Table';
import dayjs from 'dayjs';
import { observer } from 'mobx-react-lite';
import { Checkbox } from '@/components/ui/Checkbox';
import UserAvatar from '@/features/users/components/UserAvatar';
import { extractTextFromLexicalState } from '@/utils/extractTextFromLexicalState';
import { EmptyFallback } from './EmptyFallback';

const Browse: React.FC = observer(() => {
  const { fetchFlashcard, getChannelCards } = useStore('flashcardStore');
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { findUserByUuid } = useStore('userStore');
  const [cards, setCards] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { setMainPanel } = useStore('mainPanelStore');

  const handleAddFlashcard = () => {
    setMainPanel({ type: 'addFlashcard', payload: null });
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
    [findUserByUuid],
  );

  const handleClickFlashcard = (row: Flashcard) => {
    fetchFlashcard(row.uuid);
  };

  const filteredCards = cards.filter((card: any) => card.content.includes(searchValue));

  return (
    <div className="flex-1 flex flex-col h-full prose relative">
      <div className="flex flex-col gap-8">
        {cards.length ? (
          <div className="rounded-xl flex flex-col items-center text-main gap-4">
            <div className="flex justify-between items-center w-full py-0">
              {/* <p className="">{`${filteredNotes.length} results`}</p> */}
              <div className="flex gap-3 items-center">
                <div className="h-9 border-border rounded-lg border overflow-hidden flex items-center gap-0 px-3 text-secondary ml-auto bg-card">
                  <Search className="thick-icon" />
                  <Input
                    placeholder="Search"
                    className="max-w-sm w-full ml-auto border-none text-main"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
                <Button
                  variant="secondary"
                  className="flex gap-3 w-fit items-center h-9 rounded-lg"
                  size="sm"
                >
                  Tags
                  <CaretDownFill size={11} className="mt-0.5 text-secondary" />
                </Button>
                <Button
                  variant="secondary"
                  className="flex gap-3 w-fit items-center h-9 rounded-lg"
                  size="sm"
                >
                  Review Count
                  <CaretDownFill size={11} className="mt-0.5 text-secondary" />
                </Button>
              </div>
              <Button className="gap-2 ml-auto h-9 rounded-lg" onClick={handleAddFlashcard}>
                Add Flashcard
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
});

export default Browse;
