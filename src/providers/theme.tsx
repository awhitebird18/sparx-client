import {
  useState,
  useEffect,
  ReactNode,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { primaryColors } from '@/utils/primaryColors';

import { useStore } from '@/stores/RootStore';
import { Theme } from '@/features/preferences/enums';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextData {
  theme: string;
  primaryColor: string;
  toggleAppTheme: () => void;
  setAppTheme: (val: string) => void;
  setPrimaryColor: (val: string) => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { userPreferences } = useStore('userPreferencesStore');
  const [theme, setTheme] = useState<string>(userPreferences.theme);
  const [primaryColor, setPrimaryColor] = useState<string>(userPreferences.primaryColor);

  const toggleAppTheme = useCallback(() => {
    const toggleTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(toggleTheme);
    window.localStorage.setItem('theme', toggleTheme);
  }, [theme]);

  const setAppTheme = useCallback(
    (theme: string) => {
      setTheme(theme);
      window.localStorage.setItem('theme', theme);
    },
    [setTheme],
  );

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme');
    const storedPrimaryColor = window.localStorage.getItem('primaryColor');
    storedTheme && setTheme(storedTheme);
    storedPrimaryColor && setPrimaryColor(storedPrimaryColor);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add(Theme.DARK);
      document.body.classList.remove(Theme.LIGHT);
    } else {
      document.body.classList.add(Theme.LIGHT);
      document.body.classList.remove(Theme.DARK);
    }
  }, [theme]);

  useEffect(() => {
    for (let i = 0; i < primaryColors.length; i++) {
      document.body.classList.remove(primaryColors[i]);
    }

    document.body.classList.add(primaryColor);
  }, [primaryColor]);

  const value = useMemo(() => {
    return { theme, toggleAppTheme, setAppTheme, primaryColor, setPrimaryColor };
  }, [theme, toggleAppTheme, setAppTheme, primaryColor, setPrimaryColor]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
