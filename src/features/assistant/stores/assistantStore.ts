import { makeAutoObservable, reaction } from 'mobx';
import { FlashcardIdea } from '../types/flashcardIdea';
import assistantApi from '@/features/assistant/api';

export class AssistantStore {
  screen?: string;
  isLoading = false;
  flashcardIdeas: FlashcardIdea[] = [];

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });

    reaction(
      () => this.screen,
      () => {
        if (this.flashcardIdeas.length > 0) {
          this.setFlashcardIdeas([]);
        }
        this.setIsLoading(false);
      },
    );
  }

  // Setters
  setFlashcardIdeas = (flashcardIdeas: FlashcardIdea[]) => {
    this.flashcardIdeas = flashcardIdeas;
  };

  // Api Operations
  async getFlashcardIdeasFromNote(noteId: string, channelId: string) {
    try {
      this.setIsLoading(true);
      const flashcardIdeas = await assistantApi.generateFlashcardIdeas(noteId, channelId);
      this.setFlashcardIdeas(flashcardIdeas);
    } catch (err) {
      console.error(err);
    } finally {
      this.setIsLoading(false);
    }
  }

  async getSubtopics(channelId: string, workspaceId: string) {
    try {
      this.setIsLoading(true);
      const subtopics = await assistantApi.generateSubtopics(channelId, workspaceId);
      return subtopics;
    } catch (err) {
      console.error(err);
    } finally {
      this.setIsLoading(false);
    }
  }

  async getSummarizedArticle(article: string, channelId: string) {
    try {
      this.setIsLoading(true);
      const note = await assistantApi.summarizeArticle(article, channelId);
      this.setScreen(undefined);
      return note;
    } catch (err) {
      console.error(err);
    } finally {
      this.setIsLoading(false);
    }
  }

  // Ui operations
  setScreen = (val: string | undefined) => {
    this.screen = val;
  };

  setIsLoading = (val: boolean) => {
    this.isLoading = val;
  };
}
