import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  ArrowReturnRight,
  CaretDownFill,
  Eye,
  FileEarmarkTextFill,
  Lock,
  PencilSquare,
  ThreeDotsVertical,
  Unlock,
} from 'react-bootstrap-icons';
import { useStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import {
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import UserAvatar from '@/features/users/components/UserAvatar';
import { UpdateNote } from '../types/UpdateNote';
import dayjs from 'dayjs';
import NoteMetaData from './NoteMetaData';
import EmptyFallback from './EmptyFallback';
import SearchInput from '@/components/ui/SearchInput';

const ViewNotes: React.FC = observer(() => {
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
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { findUserByUuid, currentUser } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');
  const [searchValue, setSearchValue] = useState('');
  const { setMainPanel, activeComponent } = useStore('mainPanelStore');

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
    setMainPanel({ type: 'note' });
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

      setMainPanel({ type: 'note' });
    },
    [selectNote, setMainPanel],
  );

  const handleMoveNote = useCallback(
    (uuid: string) => {
      setActiveModal({ type: 'MoveNote', payload: { noteId: uuid, channelId: currentChannelId } });
    },
    [currentChannelId, setActiveModal],
  );

  const handleClickDelete = (uuid: string) => {
    setActiveModal({ type: 'DeleteNote', payload: { noteId: uuid } });
  };

  const filteredNotes = notes.filter((note) =>
    searchValue ? note.title?.toLowerCase().includes(searchValue) : note,
  );

  return (
    <>
      {activeComponent?.type === 'note' ? (
        <NoteMetaData />
      ) : (
        <div className="flex-1 flex flex-col h-full prose">
          <div className="flex flex-col gap-8">
            {isLoading || (!isLoading && filteredNotes.length) ? (
              <div className="rounded-xl flex flex-col items-center text-main gap-6">
                <div className="flex justify-between items-center w-full py-0">
                  <div className="flex gap-3 items-center w-full">
                    <div className="w-52">
                      <SearchInput
                        placeholder="Search"
                        value={searchValue}
                        setValue={setSearchValue}
                        disabled={isLoading}
                      />
                    </div>
                    <Button
                      variant="secondary"
                      className="flex gap-3 w-fit items-center rounded-lg h-8"
                      size="sm"
                      disabled={isLoading}
                    >
                      Owner
                      <CaretDownFill size={11} className="mt-0.5 text-secondary" />
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex gap-3 w-fit items-center rounded-lg h-8"
                      size="sm"
                      disabled={isLoading}
                    >
                      People
                      <CaretDownFill size={11} className="mt-0.5 text-secondary" />
                    </Button>
                    <Button
                      className="gap-3 ml-auto h-8 rounded-lg"
                      onClick={handleCreateNote}
                      disabled={isLoading}
                      size="sm"
                    >
                      <PencilSquare /> Add Note
                    </Button>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-4">
                  {notes.map((note) => {
                    const user = findUserByUuid(note.createdBy);
                    return (
                      <div
                        key={note.uuid}
                        onClick={() => handleViewNote(note.uuid)}
                        className="p-4 bg-hover card border border-border rounded-lg space-y-4 prose dark:prose-invert"
                      >
                        <div className="flex relative">
                          <div className="flex items-center gap-3 text-main font-medium overflow-hidden flex-shrink-0 truncate w-full pr-6">
                            <div className="flex-shrink-0">
                              <FileEarmarkTextFill className="text-blue-500" size={16} />
                            </div>

                            <p className="truncate">{note.title ?? 'Untitled'}</p>
                          </div>
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger
                              className="p-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                variant="ghost"
                                size="icon"
                                className="top-1/2 -translate-y-1/2 -right-2 absolute"
                              >
                                <ThreeDotsVertical size={16} />
                              </Button>
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
                                onClick={() => handleViewNote(note.uuid)}
                              >
                                <Eye /> View
                              </DropdownMenuItem>
                              {note.createdBy === currentUser?.uuid && (
                                <DropdownMenuItem
                                  className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                                  onClick={async () =>
                                    await handleUpdateNote(note.uuid, {
                                      isPrivate: !note.isPrivate,
                                    })
                                  }
                                >
                                  {note.isPrivate ? <Unlock /> : <Lock />}
                                  {note.isPrivate ? 'Set public' : 'Set private'}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer"
                                onClick={() => handleMoveNote(note.uuid)}
                              >
                                <ArrowReturnRight /> Move to
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="flex items-center gap-3 h-8 hover:bg-white/10 cursor-pointer text-rose-500 hover:text-rose-500"
                                onClick={() => handleClickDelete(note.uuid)}
                              >
                                <ArrowReturnRight /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="bg-card w-full h-28 rounded-sm" />
                        <div className="flex items-center gap-2">
                          <UserAvatar
                            userId={note.createdBy}
                            size={24}
                            profileImage={user?.profileImage}
                          />

                          <p className="text-secondary text-sm">{`Last viewed: ${dayjs(
                            note.createdAt,
                          ).format('MMM DD, YYYY')}`}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            <div className="flex items-start gap-6"></div>

            {!isLoading && !filteredNotes.length ? (
              <div className="pt-12">
                <EmptyFallback channelName={currentChannel?.name} onCreateNote={handleCreateNote} />
              </div>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
});

export default ViewNotes;
