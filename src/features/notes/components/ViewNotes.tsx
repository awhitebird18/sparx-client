import React, { useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import {
  ArrowReturnRight,
  Eye,
  FileEarmarkTextFill,
  Lock,
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
import { UpdateNote } from '../types/updateNote';
import dayjs from 'dayjs';
import NoteMetaData from './NoteMetaData';
import EmptyFallback from '@/components/EmptyFallback';
import SearchInput from '@/components/ui/SearchInput';

const ViewNotes: React.FC = observer(() => {
  const {
    createNote,
    selectNote,
    updateNoteApi,
    isLoading,
    setIsLoading,
    fetchNotes,
    setSelectedNoteId,
    searchValue,
    setSearchValue,
    filteredNotes,
  } = useStore('noteStore');
  const { currentChannelId, currentChannel } = useStore('channelStore');
  const { currentUser } = useStore('userStore');
  const { setActiveModal } = useStore('modalStore');
  const { setMainPanel, activeComponent } = useStore('mainPanelStore');

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

  useEffect(() => {
    if (!currentChannelId) return;
    fetchNotes(currentChannelId);
    return () => {
      setIsLoading(true);
    };
  }, [fetchNotes, currentChannelId, setSelectedNoteId, setIsLoading]);

  return (
    <>
      {activeComponent?.type === 'note' ? (
        <NoteMetaData />
      ) : (
        <div className="flex-1 flex flex-col h-full">
          <div className="flex flex-col">
            <div className="overflow-hidden h-full prose dark:prose-invert">
              <div className="flex justify-between items-center p-5 mb-3">
                <h3>Notes</h3>

                <div className="flex items-center gap-3">
                  <div className="w-52">
                    <SearchInput
                      placeholder="Search"
                      value={searchValue}
                      setValue={setSearchValue}
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    className="gap-3 ml-auto whitespace-nowrap"
                    onClick={handleCreateNote}
                    disabled={isLoading}
                    size="sm"
                  >
                    Add Note
                  </Button>
                </div>
              </div>

              {isLoading || (!isLoading && filteredNotes.length) ? (
                <div className="w-full grid grid-cols-2 gap-4 px-5">
                  {filteredNotes.map((note) => {
                    return (
                      <Button
                        variant="outline"
                        key={note.uuid}
                        onClick={() => handleViewNote(note.uuid)}
                        className="card-base flex-col p-5 px-6 border border-border rounded-lg space-y-1 prose dark:prose-invert relative h-fit items-start"
                      >
                        <div className="flex-shrink-0 -ml-2 mb-2">
                          <FileEarmarkTextFill className="text-blue-400" size={50} />
                        </div>

                        <div className="flex items-center gap-3 p-0.5 text-main font-medium overflow-hidden flex-shrink-0 truncate w-full">
                          <p className="truncate">{note.title ?? 'Untitled'}</p>
                        </div>

                        <p className="text-muted text-xs">{`Last viewed on ${dayjs(
                          note.createdAt,
                        ).format('MMM DD, YYYY')}`}</p>

                        <DropdownMenu modal={false}>
                          <DropdownMenuTrigger
                            className="p-1"
                            onClick={(e) => e.stopPropagation()}
                            asChild
                          >
                            <Button variant="ghost" size="icon" className="top-2 right-2 absolute">
                              <ThreeDotsVertical size={20} />
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
                      </Button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {!isLoading && !filteredNotes.length ? (
              <EmptyFallback
                title="No Notes Found."
                description={
                  <>
                    All of your <span className="text-primary px-0.5">{currentChannel?.name}</span>{' '}
                    notes will appear here.
                  </>
                }
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
});

export default ViewNotes;
