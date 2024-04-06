// stores/FlashcardStore.ts
import { autorun, makeAutoObservable, reaction } from 'mobx';
import { Flashcard } from '../types/card';
import flashcardsApi from '../api';

import { Field } from '../types/Field';
import { Template } from '../types/template';
import { Variant } from '../types/variant';
import { CreateVariant } from '../types/CreateVariant';

export class FlashcardStore {
  flashcards: Flashcard[] = [];
  cardsDue = 0;
  selectedFlashcard?: Flashcard = undefined;
  flashcardsDueCounts: { channelId: string; count: number }[] = [];
  isLoading = false;

  templates: Template[] = [];
  selectedTemplate?: Template = undefined;

  fields: Field[] = [];

  variants: Variant[] = [];

  selectedVariant?: Variant = undefined;

  constructor() {
    makeAutoObservable(this);
    reaction(
      () => this.selectedTemplate, // This is the data function - what to react to
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
      () => this.templates, // This is the data function - what to react to
      (templates) => {
        if (templates?.length) {
          const localStorageTemplate = window.localStorage.getItem('selectedTemplate');
          const template = templates.find((template: any) => {
            return localStorageTemplate
              ? template.uuid === localStorageTemplate
              : template.isDefault;
          });

          this.selectedTemplate = template;
        }
      },
    );

    reaction(
      () => this.variants, // This is the data function - what to react to
      (variants) => {
        if (variants?.length) {
          this.selectedVariant = variants[0];
        } else {
          this.selectedVariant = undefined;
        }
      },
    );

    autorun(() => {
      this.fetchTemplatesApi();
    });
  }

  setSelectedFlashcard = (flashcard: Flashcard | undefined) => {
    this.selectedFlashcard = flashcard;
  };

  setFlashcards(flashcards: Flashcard[]) {
    this.flashcards = flashcards;
  }

  setIsLoading = (bool: boolean) => {
    this.isLoading = bool;
  };

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

  removeFlashcard = async (uuid: string) => {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeFlashcard(uuid);
      this.flashcards = this.flashcards.filter((flashcard) => flashcard.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchFlashcard = async (uuid: string) => {
    try {
      this.setIsLoading(true);
      const flashcard = await flashcardsApi.getFlashcard(uuid);

      this.setSelectedFlashcard(flashcard);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchFlashcardsApi = async (channelId: string) => {
    try {
      this.setIsLoading(true);
      const flashcards = await flashcardsApi.getFlashcards(channelId);

      this.setFlashcards(flashcards);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Fields
  createFieldApi = async (createField: { title: string; templateId: string }) => {
    try {
      this.setIsLoading(true);
      const field = await flashcardsApi.createField(createField);

      this.fields.push(field);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  updateFieldApi = async (uuid: string, updateField: Partial<Field>) => {
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
  };

  removeFieldApi = async (uuid: string) => {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeField(uuid);
      this.fields = this.fields.filter((field) => field.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  fetchFieldsApi = async (templateId: string) => {
    try {
      this.setIsLoading(true);
      const fields = await flashcardsApi.getFields(templateId);

      this.fields = fields;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Templates
  fetchTemplatesApi = async () => {
    try {
      this.setIsLoading(true);
      const templates = await flashcardsApi.getTemplates();

      this.templates = templates;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  handleSelectTemplate = async (templateId: string) => {
    const template = this.templates.find((template) => template.uuid === templateId);

    window.localStorage.setItem('selectedTemplate', templateId);

    this.selectedTemplate = template;
  };

  createTemplateApi = async (title: string) => {
    const template = await flashcardsApi.createTemplate(title);
    this.templates?.push(template);

    return template;
  };

  updateTemplateApi = async (uuid: string, updateField: Partial<Field>) => {
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
  };

  removeTemplateApi = async (uuid: string) => {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeTemplate(uuid);
      this.templates = this.templates.filter((field) => field.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Variants
  fetchVariantsApi = async (templateId: string) => {
    try {
      this.setIsLoading(true);
      const variants = await flashcardsApi.getVariants(templateId);

      this.variants = variants;
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  handleSelectVariant = (uuid: string) => {
    const variant = this.variants.find((variant) => variant.uuid === uuid);
    this.selectedVariant = variant;
  };

  updateVariant = (updatedVariant: Variant) => {
    const variantFound = this.variants.find((variant) => variant.uuid === updatedVariant.uuid);

    if (!variantFound) return;

    Object.assign(variantFound, updatedVariant);
  };

  createVariantApi = async (createVariant: CreateVariant) => {
    const variant = await flashcardsApi.createVariant(createVariant);
    this.variants.push(variant);
  };

  addVariantField = async (
    variantId: string,
    data: { fieldId: string; cardSide: 'front' | 'back' },
  ) => {
    const variant = await flashcardsApi.addVariantField(variantId, data);

    this.updateVariant(variant);
  };

  removeVariantFieldApi = async (
    variantId: string,
    data: { fieldId: string; cardSide: 'front' | 'back' },
  ) => {
    const variant = await flashcardsApi.removeVariantField(variantId, data);

    this.updateVariant(variant);
  };

  updateVariantApi = async (uuid: string, updateField: Partial<Variant>) => {
    try {
      this.setIsLoading(true);
      const updatedVariant = await flashcardsApi.updateVariant(uuid, updateField);

      this.updateVariant(updatedVariant);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  removeVariantApi = async (uuid: string) => {
    try {
      this.setIsLoading(true);
      await flashcardsApi.removeVariant(uuid);
      this.variants = this.variants.filter((field) => field.uuid !== uuid);
    } catch (error) {
      console.error(error);
    } finally {
      this.setIsLoading(false);
    }
  };

  // Flashcards
  createCardNoteApi = async (
    templateId: string,
    fieldValues: any,
    currentChannelId: string,
    workspaceId: string,
  ) => {
    await flashcardsApi.createCardNote(templateId, fieldValues, currentChannelId, workspaceId);

    await this.getCardCountDueForChannel(currentChannelId);
  };

  // Review
  submitReviewsApi = async (reviewData: any) => {
    await flashcardsApi.submitReviewData(reviewData);
  };

  getCardCountDueForChannel = async (channelId: string) => {
    const count = await flashcardsApi.getCardCountDueForChannel(channelId);

    this.cardsDue = count;
  };

  // Stats
  getReviewHistoryApi = async () => {
    return await flashcardsApi.getReviewHistory();
  };

  getFutureDue = async () => {
    return await flashcardsApi.getFutureDue();
  };

  getCardsAddedStats = async () => {
    return await flashcardsApi.getCardsAddedStats();
  };

  getFlashcardsDueToday = async ({ workspaceId }: { workspaceId: string }) => {
    const data = await flashcardsApi.getDueToday({ workspaceId });
    this.flashcardsDueCounts = data;
  };

  getCardMaturityStats = async () => {
    return await flashcardsApi.getCardMaturityStats();
  };

  getYearlyStats = async () => {
    return await flashcardsApi.getYearlyStats();
  };

  createDefaultTemplate = async () => {
    return await flashcardsApi.createDefaultTemplate();
  };

  getCardCountReviewedToday = async () => {
    return await flashcardsApi.getCardCountReviewedToday();
  };

  getChannelCards = async (channelId: string) => {
    return await flashcardsApi.browseChannelCards(channelId);
  };
}
