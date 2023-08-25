import { NotificationType } from '../enums/NotificationType';
import { PrimaryColors } from '../enums/PrimaryColor';
import { Theme } from '../enums/Theme';

export type UserPreferences = {
  primaryColor: PrimaryColors;
  theme: Theme;
  notificationType: NotificationType;
};
