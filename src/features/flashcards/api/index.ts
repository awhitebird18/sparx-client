import { createFlashcard } from './createFlashcard';
import { updateFlashcard } from './udpateFlashcard';
import { removeFlashcard } from './removeFlashcard';
import { getFlashcard } from './getFlashcard';
import { getFlashcards } from './getFlashcards';

// Notes
import { createCardNote } from './createCardNote';

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

// Variants
import { getVariants } from './getVariants';
import { updateVariant } from './updateVariant';
import { removeVariant } from './removeVariant';
import { createVariant } from './createVariant';
import { addVariantField } from './addVariantField';
import { removeVariantField } from './removeVariantField';

// Reviews
import { submitReviewData } from './submitReviewData';
import { getCardCountDueForChannel } from './getCardCountDueForChannel';

// Stats
import { getReviewHistory } from './getReviewHistory';
import { getFutureDue } from './getFutureDue';
import { getCardsAddedStats } from './getCardsAddedStat';
import { getCardMaturityStats } from './getCardMaturityStats';
import { getYearlyStats } from './getYearlyStats';

import { createDefaultTemplate } from './createDefaultTemplate';
import { getCardCountReviewedToday } from './getCardCountReviewedToday';
import { browseChannelCards } from './browseChannelCards';

export default {
  createFlashcard,
  updateFlashcard,
  removeFlashcard,
  getFlashcard,
  getFlashcards,
  createCardNote,
  getTemplates,
  createTemplate,
  removeTemplate,
  updateTemplate,
  getFields,
  updateField,
  removeField,
  createField,
  getVariants,
  createVariant,
  updateVariant,
  removeVariant,
  addVariantField,
  removeVariantField,
  submitReviewData,
  getReviewHistory,
  getFutureDue,
  getCardsAddedStats,
  getCardMaturityStats,
  getYearlyStats,
  getCardCountDueForChannel,
  createDefaultTemplate,
  getCardCountReviewedToday,
  browseChannelCards,
};
