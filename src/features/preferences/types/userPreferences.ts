import { Base } from '@/types/base';
import { PrimaryColors } from '../enums/PrimaryColor';
import { Theme } from '../enums/Theme';

export interface UserPreferences extends Base {
  primaryColor: PrimaryColors;
  theme: Theme;
}
