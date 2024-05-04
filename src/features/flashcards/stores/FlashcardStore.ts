import { makeAutoObservable, reaction } from 'mobx';
import { Flashcard } from '../types/card';
import flashcardsApi from '../api';
import { Field } from '../types/field';
import { Template } from '../types/template';
import { Variant } from '../types/variant';
import { CreateVariant } from '../types/createVariant';
import { StatCardsDuePerChannelCount } from '../types/statCardsDuePerChannelCount';
import { CardReview } from '../types/cardReview';
import { FieldValue } from '../types/fieldValue';
import { CardMetaData } from '../types/cardMetaData';
import { extractTextFromLexicalState } from '@/utils/extractTextFromLexicalState';

export class FlashcardStore {
  flashcards: Flashcard[] = [];
  cardsDue = 0;
  selectedFlashcard?: Flashcard = undefined;
  flashcardsDueCounts: StatCardsDuePerChannelCount[] = [];
  isLoading = false;
  templates: Template[] = [];
  selectedTemplate?: Template = undefined;
  fields: Field[] = [];
  variants: Variant[] = [];
  selectedVariant?: Variant = undefined;
  browseFlashcards: CardMetaData[] = [];
  browseSearchValue = '';

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
    reaction(
      () => this.selectedTemplate,
      (current, prev) => {
        if (current && current.uuid !== prev?.uuid) {
          this.fetchFieldsApi(current.uuid);
          this.fetchVariantsApi(current.uuid);

          if (this.variants.length) {
            this.selectedVariant = this.variants[0];
          } else {
            this.selectedVariant = undefined;
          }
        }
      },
    );

    reaction(
      () => this.templates,
      (templates) => {
        if (templates?.length) {
          const localStorageTemplate = window.localStorage.getItem('selectedTemplate');
          const template = templates.find((template: Template) => {
            return localStorageTemplate
              ? template.uuid === localStorageTemplate
              : template.isDefault;
          });

          this.selectedTemplate = template;
        }
      },
    );

    reaction(
      () => this.variants,
      (variants) => {
        if (variants?.length) {
          this.selectedVariant = variants[0];
        } else {
          this.selectedVariant = undefined;
        }
      },
    );
  }

  get channelCardDetails() {
    const cards = this.browseFlashcards
      .filter((card) => card.content.includes(this.browseSearchValue))
      .map((card) => ({
        ...card,
        content: extractTextFromLexicalState(card.content),
      }));

    return cards;
  }

  // Setters
  setSelectedFlashcard = (flashcard: Flashcard | undefined) => {
    this.selectedFlashcard = flashcard;
  };

  handleSelectVariant = (uuid: string) => {
    const variant = this.variants.find((variant) => variant.uuid === uuid);
    this.selectedVariant = variant;
  };

  setFlashcards(flashcards: Flashcard[]) {
    this.flashcards = flashcards;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

  setBrowseFlashcards(cards: CardMetaData[]) {
    this.browseFlashcards = cards;
  }

  setBrowseSearchValue(value: string) {
    this.browseSearchValue = value;
  }

  // Create
  createFlashcard = async () => {
    try {
      this.setIsLoading(true);
      const flashcard = await flashcardsApi.createFlashcard();
      this.setSelectedFlashcard(flashcard);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Update
  updateFlashcard = async (uuid: string, updatedFields: Partial<Flashcard>) => {
    try {
      this.setIsLoading(true);
      const updatedFlashcard = await flashcardsApi.updateFlashcard({ uuid, updatedFields });
      this.setSelectedFlashcard(updatedFlashcard);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  updateVariant = (updatedVariant: Variant) => {
    const variantFound = this.variants.find((variant) => variant.uuid === updatedVariant.uuid);
    if (!variantFound) return;
    Object.assign(variantFound, updatedVariant);
  };

  // Remove
  async removeFlashcard(uuid: string) {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeFlashcard(uuid);
      this.flashcards = this.flashcards.filter((flashcard) => flashcard.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  // Api Operations
  async fetchFlashcard(uuid: string) {
    try {
      this.setIsLoading(true);
      const flashcard = await flashcardsApi.getFlashcard(uuid);
      this.setSelectedFlashcard(flashcard);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchFlashcardsApi(channelId: string) {
    try {
      this.setIsLoading(true);
      const flashcards = await flashcardsApi.getFlashcards(channelId);
      this.setFlashcards(flashcards);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async createFieldApi(createField: { title: string; templateId: string }) {
    try {
      this.setIsLoading(true);
      const field = await flashcardsApi.createField(createField);
      this.fields.push(field);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async updateFieldApi(uuid: string, updateField: Partial<Field>) {
    try {
      this.setIsLoading(true);
      const updatedField = await flashcardsApi.updateField(uuid, updateField);
      const fieldIndex = this.fields.findIndex((field) => field.uuid === uuid);
      if (fieldIndex > -1) {
        this.fields.splice(fieldIndex, 1, {
          ...this.fields[fieldIndex],
          ...updatedField,
        });
      } else {
        console.error(`Field with UUID ${uuid} not found.`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async removeFieldApi(uuid: string) {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeField(uuid);
      this.fields = this.fields.filter((field) => field.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchFieldsApi(templateId: string) {
    try {
      this.setIsLoading(true);
      const fields = await flashcardsApi.getFields(templateId);
      this.fields = fields;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchTemplatesApi(workspaceId: string) {
    try {
      this.setIsLoading(true);
      const templates = await flashcardsApi.getTemplates(workspaceId);
      this.templates = templates;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async handleSelectTemplate(templateId: string) {
    const template = this.templates.find((template) => template.uuid === templateId);
    window.localStorage.setItem('selectedTemplate', templateId);
    this.selectedTemplate = template;
  }

  async createTemplateApi(title: string, workspaceId: string) {
    const template = await flashcardsApi.createTemplate(title, workspaceId);
    this.templates?.push(template);
    return template;
  }

  async updateTemplateApi(uuid: string, updateField: Partial<Field>) {
    try {
      this.setIsLoading(true);
      const updatedTemplate = await flashcardsApi.updateTemplate(uuid, updateField);
      const templateFound = this.templates.find(
        (template) => template.uuid === updatedTemplate.uuid,
      );
      if (!templateFound) return;
      Object.assign(templateFound, updatedTemplate);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async removeTemplateApi(uuid: string) {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeTemplate(uuid);
      this.templates = this.templates.filter((field) => field.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async fetchVariantsApi(templateId: string) {
    try {
      this.setIsLoading(true);
      const variants = await flashcardsApi.getVariants(templateId);
      this.variants = variants;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async createVariantApi(createVariant: CreateVariant) {
    const variant = await flashcardsApi.createVariant(createVariant);
    this.variants.push(variant);
  }

  async addVariantField(variantId: string, data: { fieldId: string; cardSide: 'front' | 'back' }) {
    const variant = await flashcardsApi.createVariantField(variantId, data);
    this.updateVariant(variant);
  }

  async removeVariantFieldApi(
    variantId: string,
    data: { fieldId: string; cardSide: 'front' | 'back' },
  ) {
    const variant = await flashcardsApi.removeVariantField(variantId, data);
    this.updateVariant(variant);
  }

  async updateVariantApi(uuid: string, updateField: Partial<Variant>) {
    try {
      this.setIsLoading(true);
      const updatedVariant = await flashcardsApi.updateVariant(uuid, updateField);
      this.updateVariant(updatedVariant);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async removeVariantApi(uuid: string) {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeVariant(uuid);
      this.variants = this.variants.filter((field) => field.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  }

  async createCardNoteApi(
    templateId: string,
    fieldValues: FieldValue[],
    currentChannelId: string,
    workspaceId: string,
  ) {
    await flashcardsApi.createNote({ templateId, fieldValues, currentChannelId, workspaceId });
    await this.getCardCountDueForChannel(currentChannelId);
  }

  async submitReviewsApi(reviewData: CardReview[]) {
    await flashcardsApi.createReviewEntry(reviewData);
  }

  async getCardCountDueForChannel(channelId: string) {
    const channelCount = await flashcardsApi.getCardCountDueForChannel(channelId);
    this.cardsDue = channelCount.count;
  }

  async getReviewHistoryApi() {
    return await flashcardsApi.getReviewHistory();
  }

  async getFutureDue() {
    return await flashcardsApi.getFutureDue();
  }

  async getCardsAddedStats() {
    return await flashcardsApi.getCardsAddedStats();
  }

  async getFlashcardsDueToday(workspaceId: string) {
    const data = await flashcardsApi.getDueToday({ workspaceId });
    this.flashcardsDueCounts = data;
  }

  async getCardMaturityStats() {
    return await flashcardsApi.getCardMaturityStats();
  }

  async getYearlyStats() {
    return await flashcardsApi.getYearlyStats();
  }

  async createDefaultTemplate() {
    return await flashcardsApi.createDefaultTemplate();
  }

  async getCardCountReviewedToday() {
    return await flashcardsApi.getCardCountReviewedToday();
  }

  async getChannelCardDetails(channelId: string) {
    const cards = await flashcardsApi.getChannelCardDetails(channelId);

    this.setBrowseFlashcards(cards);
  }
}
