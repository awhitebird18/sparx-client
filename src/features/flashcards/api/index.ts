// Card
import { updateFlashcard } from './updateFlashcard';
import { removeFlashcard } from './removeFlashcard';
import { getFlashcard } from './getFlashcard';
import { getFlashcards } from './getFlashcards';
import { createFlashcard } from './createFlashcard';

// Notes
import { createNote } from './createNote';

// Fields
import { getFields } from './getFields';
import { updateField } from './updateField';
import { removeField } from './removeField';
import { createField } from './createField';

// Templates
import { getTemplates } from './getTemplates';
import { createTemplate } from './createTemplate';
import { removeTemplate } from './removeTemplate';
import { updateTemplate } from './updateTemplate';
import { createDefaultTemplate } from './createDefaultTemplate';

// Variants
import { getVariants } from './getVariants';
import { updateVariant } from './updateVariant';
import { removeVariant } from './removeVariant';
import { createVariant } from './createVariant';
import { createVariantField } from './createVariantField';
import { removeVariantField } from './removeVariantField';

// Reviews
import { createReviewEntry } from './createReviewEntry';
import { getCardCountDueForChannel } from './getCardCountDueForChannel';

// Stats
import { getReviewHistory } from './getReviewHistory';
import { getFutureDue } from './getFutureDue';
import { getCardsAddedStats } from './getCardsAddedStat';
import { getCardMaturityStats } from './getCardMaturityStats';
import { getYearlyStats } from './getYearlyStats';
import { getCardCountReviewedToday } from './getCardCountReviewedToday';
import { getDueToday } from './getDueToday';

// Browse
import { getChannelCardDetails } from './getChannelCardDetails';

export default {
  createFlashcard,
  updateFlashcard,
  removeFlashcard,
  getFlashcard,
  getFlashcards,
  createNote,
  getTemplates,
  createTemplate,
  removeTemplate,
  updateTemplate,
  getFields,
  updateField,
  removeField,
  createField,
  getVariants,
  getDueToday,
  createVariant,
  updateVariant,
  removeVariant,
  createVariantField,
  removeVariantField,
  createReviewEntry,
  getReviewHistory,
  getFutureDue,
  getCardsAddedStats,
  getCardMaturityStats,
  getYearlyStats,
  getCardCountDueForChannel,
  createDefaultTemplate,
  getCardCountReviewedToday,
  getChannelCardDetails,
};
