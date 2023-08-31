import { Base } from '@/types/base';
import { NotificationType } from '../enums/NotificationType';
import { PrimaryColors } from '../enums/PrimaryColor';
import { Theme } from '../enums/Theme';

export interface UserPreferences extends Base {
  primaryColor: PrimaryColors;
  theme: Theme;
  notificationType: NotificationType;
}
