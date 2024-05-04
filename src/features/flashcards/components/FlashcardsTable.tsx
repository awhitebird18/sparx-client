import React from 'react';
import Table from '@/components/ui/Table';
import { Checkbox } from '@/components/ui/Checkbox';
import UserAvatar from '@/features/users/components/UserAvatar';
import dayjs from 'dayjs';
import { useStore } from '@/stores/RootStore';
import { CardMetaData } from '../types/cardMetaData';
import { Column } from 'react-table';
import { observer } from 'mobx-react-lite';

const FlashcardsTable = observer(() => {
  const { fetchFlashcard, channelCardDetails } = useStore('flashcardStore');
  const { findUserByUuid } = useStore('userStore');

  const columns: Column<CardMetaData>[] = React.useMemo(
    () => [
      {
        Header: 'Uuid',
        accessor: 'uuid',
        Cell: ({ value }: { value: string }) => {
          return <p className="whitespace-nowrap overflow-hidden text-ellipsis">{value}</p>;
        },
      },
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
                <>Deleted user</>
              )}
            </div>
          );
        },
      },
      {
        Header: 'Created On',
        accessor: 'createdAt',
        Cell: ({ value }: { value: string }) => <span>{dayjs(value).format('MMM D YYYY')}</span>,
      },
      {
        Header: 'Next Review Date',
        accessor: 'nextReviewDate',
        Cell: ({ value }: { value: string }) => <span>{dayjs(value).format('MMM D YYYY')}</span>,
      },
      {
        Header: 'Reviews',
        accessor: 'repetitions',
        Cell: ({ value }: { value: number }) => <span>{value}</span>,
      },
      {
        Header: 'Private',
        accessor: 'private',
        Cell: () => <Checkbox checked />,
      },
    ],
    [findUserByUuid],
  );

  const handleClickFlashcard = (row: CardMetaData) => {
    fetchFlashcard(row.uuid);
  };

  return (
    <Table<CardMetaData, CardMetaData>
      columns={columns}
      data={channelCardDetails}
      onRowClick={(row: CardMetaData) => handleClickFlashcard(row)}
    />
  );
});

export default FlashcardsTable;
