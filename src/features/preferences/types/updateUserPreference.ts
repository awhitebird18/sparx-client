import { NotificationType, PrimaryColors, Theme } from '../enums';

export interface UpdateUserPreferences {
  primaryColor?: PrimaryColors;
  theme?: Theme;
  notificationType?: NotificationType;
}
