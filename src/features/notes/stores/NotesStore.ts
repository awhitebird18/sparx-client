import { makeAutoObservable } from 'mobx';
import { Note } from '@/features/notes/types/note';
import notesApi from '../api';
import { UpdateNote } from '../types/updateNote';

export class NotesStore {
  notes: Note[] = [];
  selectedNoteId: string | undefined = undefined;
  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  get selectedNote(): Note | undefined {
    const channel = this.notes.find((note) => note.uuid === this.selectedNoteId);

    return channel;
  }

  setSelectedNoteId = (noteId: string | undefined) => {
    this.selectedNoteId = noteId;
  };

  setNotes(notes: Note[]) {
    this.notes = notes;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  addNote = (note: Note) => {
    this.notes.push(note);
  };

  createNote = async (channelUuid: string) => {
    try {
      this.setIsLoading(true);

      const note = await notesApi.createNote(channelUuid);

      this.addNote(note);
      this.setSelectedNoteId(note.uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Action to update an existing note
  updateNote = async (noteId: string, updateFields: Partial<Note>) => {
    try {
      this.setIsLoading(true);

      const noteFound = this.notes.find((note) => note.uuid === noteId);

      if (!noteFound) return;

      Object.assign(noteFound, updateFields);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  updateNoteApi = async (noteId: string, updateFields: Partial<UpdateNote>) => {
    try {
      this.setIsLoading(true);

      const updatedNote = await notesApi.updateNote(noteId, updateFields);

      this.updateNote(noteId, updatedNote);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Action to delete a note by ID
  removeNote = async (uuid: string) => {
    try {
      this.setIsLoading(true);

      await notesApi.removeNote(uuid);
      this.notes = this.notes.filter((note) => note.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchNote = async (uuid: string) => {
    try {
      this.setIsLoading(true);

      const note = await notesApi.getNote(uuid);

      this.setSelectedNoteId(note.uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  selectNote = async (uuid: string) => {
    try {
      this.setIsLoading(true);

      const note = await notesApi.getNote(uuid);

      this.updateNote(note.uuid, { content: note.content });

      this.setSelectedNoteId(note.uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  moveNote = async (uuid: string, nodeId: string) => {
    try {
      this.setIsLoading(true);

      await notesApi.moveNote(uuid, nodeId);

      this.notes = this.notes.filter((note) => note.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchNotes = async (nodeId: string) => {
    try {
      this.setIsLoading(true);
      const minimumLoadingTimePromise = new Promise((resolve) => setTimeout(resolve, 400));

      const [notes] = await Promise.all([
        notesApi.getChannelNotes(nodeId),
        minimumLoadingTimePromise,
      ]);

      this.setNotes(notes);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };
}
