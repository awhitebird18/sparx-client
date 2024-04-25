import { Base } from '@/types/base';

export interface NodemapSettings extends Base {
  userCountVisible: boolean;
  flashcardsDueVisible: boolean;
  unreadMessageCountVisible: boolean;
  zoomLevel: number;
  xPosition: number;
  yPosition: number;
}
