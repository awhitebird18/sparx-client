import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import SearchInput from '@/components/ui/SearchInput';
import {
  ArrowReturnRight,
  CaretDownFill,
  Eye,
  FileEarmarkTextFill,
  GlobeAmericas,
  Lock,
  PencilSquare,
  ThreeDots,
  Unlock,
} from 'react-bootstrap-icons';
import { Column } from 'react-table';
import { useStore } from '@/stores/RootStore';
import { Note } from '../types/Note';
import Table from '@/components/ui/Table';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import UserAvatar from '@/features/users/components/UserAvatar';
import { UpdateNote } from '../types/UpdateNote';

type NoteColumn = Column<Note>;

const ViewNotes: React.FC = () => {
  const {
    notes,
    createNote,
    selectNote,
    updateNoteApi,
    isLoading,
    setIsLoading,
    fetchNotes,
    setSelectedNoteId,
  } = useStore('noteStore');
  const { currentChannelId } = useStore('channelStore');
  const { findUserByUuid, currentUser } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    if (!currentChannelId) return;

    fetchNotes(currentChannelId);

    return () => {
      setIsLoading(true);
    };
  }, [fetchNotes, currentChannelId, setSelectedNoteId, setIsLoading]);

  const handleCreateNote = async () => {
    if (!currentChannelId) return;
    await createNote(currentChannelId);
  };

  const handleUpdateNote = useCallback(
    async (noteId: string, data: Partial<UpdateNote>) => {
      await updateNoteApi(noteId, data);
    },
    [updateNoteApi],
  );

  const handleViewNote = useCallback(
    (uuid: string) => {
      selectNote(uuid);
    },
    [selectNote],
  );

  const handleMoveNote = useCallback(
    (uuid: string) => {
      setActiveModal({ type: 'MoveNote', payload: { noteId: uuid, channelId: currentChannelId } });
    },
    [currentChannelId, setActiveModal],
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickDelete = (uuid: string) => {
    setActiveModal({ type: 'DeleteNote', payload: { noteId: uuid } });
  };

  const columns: NoteColumn[] | any = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value }: { value: string }) => (
          <span className="flex items-center gap-3 text-main font-medium">
            <div className="w-7 h-7 rounded flex items-center justify-center ">
              <FileEarmarkTextFill className="text-blue-500" size={18} />
            </div>
            {value ?? 'Untitled'}
          </span>
        ),
      },
      {
        Header: 'Created On',
        accessor: 'createdAt',
        Cell: ({ value }: { value: Date }) => (
          <span className="">{dayjs(value).format('MMM D, YYYY hh:mm a')}</span>
        ),
      },
      {
        Header: 'Updated on',
        accessor: 'updatedAt',
        Cell: ({ value, row }: { value: Date; row: any }) => {
          return (
            <span className="">
              {dayjs(value ?? row.values.createdAt).format('MMM D, YYYY hh:mm a')}
            </span>
          );
        },
      },
      {
        Header: 'Owner',
        accessor: 'createdBy',
        Cell: ({ value }: { value: string }) => {
          const user = findUserByUuid(value);

          return (
            <div className="flex items-center gap-2">
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
        Header: 'Visibility',
        accessor: 'isPrivate',
        Cell: ({ value }: { value: boolean }) => (
          <span className="flex items-center gap-2">
            {value ? (
              <>
                <Lock className="mt-0.5" /> Private
              </>
            ) : (
              <>
                <GlobeAmericas className="mt-0.5" /> Public
              </>
            )}
          </span>
        ),
      },

      {
        Header: 'Actions', // Name it as per your choice
        id: 'actions', // It's a good practice to give an ID for reference
        Cell: ({ row }: { row: any }) => {
          const { uuid, createdBy, isPrivate } = row.original;

          return (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="p-2" onClick={(e) => e.stopPropagation()}>
                <ThreeDots size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="p-1.5 border border-border rounded-md text-sm bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DropdownMenuItem
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                  onClick={() => handleViewNote(uuid)}
                >
                  <Eye /> View
                </DropdownMenuItem>
                {createdBy === currentUser?.uuid && (
                  <DropdownMenuItem
                    className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                    onClick={async () => await handleUpdateNote(uuid, { isPrivate: !isPrivate })}
                  >
                    {isPrivate ? <Unlock /> : <Lock />}
                    {isPrivate ? 'Set public' : 'Set private'}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                  onClick={() => handleMoveNote(uuid)}
                >
                  <ArrowReturnRight /> Move to
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer text-rose-500 hover:text-rose-500"
                  onClick={() => handleClickDelete(uuid)}
                >
                  <ArrowReturnRight /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [findUserByUuid, handleClickDelete, handleMoveNote, handleUpdateNote, handleViewNote],
  );

  const filteredNotes = notes.filter((note) =>
    searchValue ? note.title?.toLowerCase().includes(searchValue) : note,
  );

  return (
    <div className="flex-1 flex flex-col h-full prose">
      <div className="flex flex-col gap-8">
        <div className="flex items-start pt-4 gap-6">
          {/* <Button className="card rounded-xl pointer-events-none opacity-70 h-18 w-18 bg-card border border-primary p-2 text-primary shadow-lg">
            <Pencil size={50} />
          </Button> */}
          <div className="flex flex-col gap-1.5">
            <h2 className="text-main text-3xl font-medium">Notes</h2>
            <p className="text-secondary">See all of your notes for workspace and make changes</p>
          </div>
        </div>

        <div className="rounded-xl flex flex-col items-center text-main gap-4">
          <div className="flex justify-between items-center w-full py-0">
            {/* <p className="">{`${filteredNotes.length} results`}</p> */}
            <div className="flex gap-3 items-center">
              <div className="w-72">
                <SearchInput
                  placeholder="Search users"
                  value={searchValue}
                  setValue={setSearchValue}
                  disabled={isLoading}
                />
              </div>
              <Button
                variant="secondary"
                className="flex gap-3 w-fit items-center"
                size="sm"
                disabled={isLoading}
              >
                People
                <CaretDownFill size={11} className="mt-0.5 text-secondary" />
              </Button>
              <Button
                variant="secondary"
                className="flex gap-3 w-fit items-center"
                size="sm"
                disabled={isLoading}
              >
                Modified
                <CaretDownFill size={11} className="mt-0.5 text-secondary" />
              </Button>
            </div>
            <Button className="gap-3 ml-auto" onClick={handleCreateNote} disabled={isLoading}>
              <PencilSquare /> Add Note
            </Button>
          </div>

          <Table
            columns={columns}
            data={filteredNotes}
            onRowClick={(row) => handleViewNote(row.uuid)}
            isLoading={isLoading}
          />
        </div>

        {/* <EmptyFallback channelName={currentChannel?.name ?? ''} onCreateNote={handleCreateNote} /> */}
      </div>
    </div>
  );
};

export default observer(ViewNotes);

// const EmptyFallback = ({
//   channelName,
//   onCreateNote,
// }: {
//   channelName?: string;
//   onCreateNote: () => void;
// }) => (
//   <div className="flex flex-col gap-5 max-w-sm h-full pt-12 items-center prose">
//     <div className="flex flex-col gap-2 items-center">
//       <h3 className="text-center text-main text-xl">No Notes Found.</h3>
//       <p className="text-center text-secondary flex-items-center">
//         All of your <span className="text-primary px-0.5">{channelName}</span> notes will appear
//         here.
//       </p>
//     </div>

//     <Button className="items-center gap-1" onClick={onCreateNote}>
//       <Plus size={20} />
//       Start a new note
//     </Button>
//   </div>
// );
