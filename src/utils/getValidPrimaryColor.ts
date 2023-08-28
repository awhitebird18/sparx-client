import { PrimaryColors } from '@/features/preferences/enums';

export function getValidPrimaryColor(color: string | null): PrimaryColors {
  if (color && Object.values(PrimaryColors).includes(color as PrimaryColors)) {
    return color as PrimaryColors;
  }
  return PrimaryColors.BLUE;
}
