import { Theme } from '@/features/preferences/enums';

export function getValidTheme(theme: string | null): Theme {
  if (theme && Object.values(Theme).includes(theme as Theme)) {
    return theme as Theme;
  }
  return Theme.DARK;
}
