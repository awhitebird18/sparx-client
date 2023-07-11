import { useState, useEffect, ReactNode, useCallback } from 'react';

import { ThemeContext } from '@/hooks/useTheme';
import { useAuth } from './auth';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { currentUser } = useAuth();
  const [theme, setTheme] = useState<string>(currentUser?.theme || 'light');

  const toggleTheme = useCallback(() => {
    const toggleTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(toggleTheme);
    window.localStorage.setItem('theme', toggleTheme);
  }, [theme]);

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

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
