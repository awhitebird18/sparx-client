import { useState, useEffect, ReactNode, useCallback, createContext, useContext } from 'react';

import { useAuth } from './auth';

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextData {
  theme: string;
  toggleAppTheme: () => void;
  setAppTheme: (val: string) => void;
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
  const { currentUser } = useAuth();
  const [theme, setTheme] = useState<string>(currentUser?.theme || 'light');

  const toggleAppTheme = useCallback(() => {
    const toggleTheme = theme === 'light' ? 'dark' : 'light';
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
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleAppTheme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
